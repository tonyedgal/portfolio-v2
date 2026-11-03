'use client'

import { useTheme } from '@space-man/react-theme-animation'
import { X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotionConfig } from 'motion/react'
import type * as React from 'react'
import { useCallback, useRef, useState, useSyncExternalStore } from 'react'

import { cn } from '@/lib/utils'
import { colorThemes } from '@/lib/color-themes'

const GAP = 16

const EDGE = 8

const EXIT = { duration: 0.12, ease: [0.23, 1, 0.32, 1] } as const

type Placement = { side: 'top' | 'bottom'; shift: number; tailX: number }

const subscribe = () => () => {}

const label = (name: string) => name.charAt(0).toUpperCase() + name.slice(1)

function getPlacement(trigger: DOMRect, width: number, height: number) {
  const anchored = trigger.left + trigger.width / 2 - width / 2
  const overhangLeft = EDGE - anchored
  const overhangRight = anchored + width - (window.innerWidth - EDGE)

  const shift =
    overhangLeft > 0 ? overhangLeft : overhangRight > 0 ? -overhangRight : 0

  return {
    side: trigger.top - height - GAP < EDGE ? 'bottom' : 'top',
    shift,
    // keeps the tail over the trigger whatever the shift is
    tailX: width / 2 - shift,
  } satisfies Placement
}

function ColorThemePicker({
  themes = colorThemes,
  className,
  ...props
}: React.ComponentProps<'div'> & { themes?: string[] }) {
  const { colorTheme, switchColorTheme } = useTheme()
  // follows the site motion setting as well as the system one
  const reduced = useReducedMotionConfig()

  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )

  const [open, setOpen] = useState(false)

  const [placement, setPlacement] = useState<Placement>({
    side: 'top',
    shift: 0,
    tailX: 0,
  })

  const [activeIndex, setActiveIndex] = useState(0)

  // a fresh key per open, so reopening mid exit mounts a new bar that measures and takes focus
  const [session, setSession] = useState(0)

  const triggerRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const focusOnOpen = useRef(false)

  const close = useCallback(() => setOpen(false), [])

  const show = () => {
    setActiveIndex(Math.max(0, themes.indexOf(colorTheme)))
    setSession((count) => count + 1)
    setOpen(true)
  }

  // a ref callback, not an effect, so measuring cannot cascade an extra render pass
  const placeBar = useCallback((node: HTMLDivElement | null) => {
    const trigger = triggerRef.current

    if (!node || !trigger) return
    setPlacement(
      getPlacement(
        trigger.getBoundingClientRect(),
        node.offsetWidth,
        node.offsetHeight,
      ),
    )

    if (!focusOnOpen.current) return
    focusOnOpen.current = false
    node.querySelector<HTMLElement>('[tabindex="0"]')?.focus()
  }, [])

  // a ref callback, not an effect: it re-attaches whenever open changes
  const listen = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !open) return

      const onPointerDown = (event: PointerEvent) => {
        if (event.target instanceof Node && !node.contains(event.target))
          close()
      }

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key !== 'Escape') return
        close()
        triggerRef.current?.focus()
      }

      document.addEventListener('pointerdown', onPointerDown)
      document.addEventListener('keydown', onKeyDown)

      return () => {
        document.removeEventListener('pointerdown', onPointerDown)
        document.removeEventListener('keydown', onKeyDown)
      }
    },
    [open, close],
  )

  // a pointer toggles on press, so it never waits on a click that may not fire;
  // pressing and dragging along the row, then releasing over a swatch, picks it
  const onTriggerPointerDown = (event: React.PointerEvent) => {
    if (event.button !== 0) return

    if (open) return close()
    show()

    const up = (upEvent: PointerEvent) => {
      document.removeEventListener('pointerup', up)

      // the x under the pointer is an svg element, so this must accept any element, not only html ones
      const target = document.elementFromPoint(upEvent.clientX, upEvent.clientY)

      const picked = target?.closest<HTMLElement>('[data-color-theme]')

      if (picked?.dataset.colorTheme)
        switchColorTheme(picked.dataset.colorTheme)
    }

    document.addEventListener('pointerup', up)
  }

  const onMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const count = themes.length
    let next = activeIndex

    if (event.key === 'ArrowRight') next = (activeIndex + 1) % count
    else if (event.key === 'ArrowLeft') next = (activeIndex - 1 + count) % count
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = count - 1
    else return

    event.preventDefault()
    setActiveIndex(next)
    itemRefs.current[next]?.focus()
  }

  const top = placement.side === 'top'

  return (
    <div
      className={cn('relative flex w-fit items-center', className)}
      data-slot='color-theme-picker'
      ref={listen}
      {...props}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            className={cn(
              'absolute left-1/2 z-30',
              top ? 'bottom-full mb-4' : 'top-full mt-4',
            )}
            exit={{
              opacity: 0,
              pointerEvents: 'none',
              y: reduced ? 0 : top ? 6 : -6,
              scale: reduced ? 1 : 0.95,
              x: '-50%',
              transition: EXIT,
            }}
            initial={{
              opacity: 0,
              y: reduced ? 0 : top ? 10 : -10,
              scale: reduced ? 1 : 0.9,
              x: '-50%',
            }}
            key={session}
            style={{
              marginLeft: placement.shift,
              originX: `${placement.tailX}px`,
              originY: top ? 1 : 0,
            }}
            transition={
              reduced
                ? { duration: 0.15 }
                : { type: 'spring', stiffness: 520, damping: 30 }
            }
          >
            <div
              aria-label='Accent colour'
              aria-orientation='horizontal'
              className='bg-muted flex items-center gap-1 rounded-full p-1.5'
              onKeyDown={onMenuKeyDown}
              ref={placeBar}
              role='menu'
            >
              {themes.map((name, i) => (
                <motion.button
                  animate={{ scale: 1, opacity: 1 }}
                  aria-checked={hydrated ? colorTheme === name : undefined}
                  aria-label={label(name)}
                  className='group/swatch focus-visible:ring-ring relative grid size-9 cursor-pointer place-items-center rounded-full outline-none focus-visible:ring-2'
                  data-color-theme={name}
                  initial={reduced ? false : { scale: 0.5, opacity: 0 }}
                  key={name}
                  onClick={() => switchColorTheme(name)}
                  onFocus={() => setActiveIndex(i)}
                  ref={(node) => {
                    itemRefs.current[i] = node
                  }}
                  role='menuitemradio'
                  tabIndex={i === activeIndex ? 0 : -1}
                  title={name}
                  transition={{
                    type: 'spring',
                    stiffness: 800,
                    damping: 30,
                    delay: reduced ? 0 : 0.03 + i * 0.03,
                  }}
                  type='button'
                  whileHover={reduced ? undefined : { scale: 1.2 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <span
                    className={cn(
                      `theme-${name}`,
                      'bg-primary size-6 rounded-full group-aria-checked/swatch:shadow-[0_0_0_2px_var(--muted),0_0_0_4px_var(--foreground)]',
                    )}
                  />
                </motion.button>
              ))}
            </div>

            <span
              className={cn(
                'bg-muted absolute size-3 -translate-x-1/2 rounded-full',
                top ? '-bottom-1' : '-top-1',
              )}
              style={{ left: placement.tailX }}
            />
            <span
              className={cn(
                'bg-muted absolute size-1.5 -translate-x-1/2 rounded-full',
                top ? '-bottom-4' : '-top-4',
              )}
              style={{ left: placement.tailX + 6 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        aria-expanded={open}
        aria-haspopup='menu'
        aria-label={
          open
            ? 'Close accent colours'
            : hydrated
              ? `Accent colour: ${label(colorTheme)}`
              : 'Accent colour'
        }
        className='bg-muted text-muted-foreground hover:text-foreground focus-visible:ring-ring relative z-10 grid size-8 cursor-pointer place-items-center rounded-full transition-colors duration-150 ease-out focus-visible:ring-2 focus-visible:outline-none'
        onClick={(event) => {
          // detail is 0 only for keyboard and assistive tech; pointers were handled on press
          if (event.detail !== 0) return

          if (open) return close()
          focusOnOpen.current = true
          show()
        }}
        onPointerDown={onTriggerPointerDown}
        ref={triggerRef}
        type='button'
      >
        <AnimatePresence initial={false}>
          <motion.span
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            className='col-start-1 row-start-1 grid place-items-center'
            exit={{ opacity: 0, scale: 0.6, filter: 'blur(2px)' }}
            initial={{ opacity: 0, scale: 0.6, filter: 'blur(2px)' }}
            key={open ? 'close' : 'swatch'}
            transition={reduced ? { duration: 0 } : EXIT}
          >
            {open ? (
              <X aria-hidden='true' className='size-4' strokeWidth={2} />
            ) : (
              <span className='bg-primary size-4 rounded-full' />
            )}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  )
}

export { ColorThemePicker }
