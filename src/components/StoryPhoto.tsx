import Image from "next/image";

export function StoryPhoto({ src, alt, year, caption, width, height }: {
  src: string; alt: string; year: string; caption: string; width: number; height: number;
}) {
  return <figure>
    <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 1023px) 90vw, 600px" />
    <figcaption><span className="font-medium text-foreground">{year}</span> · {caption}</figcaption>
  </figure>;
}
