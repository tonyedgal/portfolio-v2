import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (
  process.env.NODE_ENV === "production" &&
  window.location.hostname === "tony.spaceman.sh" &&
  token &&
  host
) {
  const init = () =>
    posthog.init(token, {
      api_host: host,
      defaults: "2026-08-30",
      capture_pageview: "history_change",
      disable_surveys: true,
      capture_dead_clicks: false,
    });

  // load analytics after the page is interactive so it stays off the critical path
  const schedule = () =>
    typeof requestIdleCallback === "function"
      ? requestIdleCallback(init, { timeout: 4000 })
      : setTimeout(init, 1000);

  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
}
