import { getImageProps } from "next/image";
import type { ComponentPropsWithoutRef } from "react";

type Props = Omit<ComponentPropsWithoutRef<"img">, "src" | "srcSet" | "width" | "height"> & {
  src: string;
  alt: string;
  /** How wide the image renders, e.g. "(max-width: 768px) 50vw, 25vw". Picks the file size served. */
  sizes: string;
  /** Load first: above-the-fold hero or main product photo. */
  priority?: boolean;
};

/**
 * A plain <img> whose src/srcSet point at Next's image optimizer, so each device gets a resized
 * AVIF/WebP instead of the multi-MB studio master. Markup, classes and layout stay exactly as a
 * normal <img>: CSS decides the rendered size, `sizes` decides which file is downloaded.
 */
export function Img({ src, alt, sizes, priority, loading, style, ...rest }: Props) {
  // Only our own files go through the optimizer (next.config localPatterns); anything else, e.g. a
  // remote URL for a product added only in BUSY, is shown as-is rather than failing.
  if (!src.startsWith("/") || src.startsWith("//")) {
    return <img src={src} alt={alt} loading={priority ? "eager" : (loading ?? "lazy")} style={style} {...rest} />;
  }
  const { props } = getImageProps({
    src,
    alt,
    sizes,
    // Intrinsic size only feeds the aspect-ratio hint; CSS classes set the real size.
    width: 1600,
    height: 2000,
    quality: 80,
    ...(priority ? { loading: "eager" as const, fetchPriority: "high" as const } : { loading: loading ?? "lazy" }),
  });
  // getImageProps adds `color: transparent` for its own placeholder handling; keep caller styles.
  const { width: _w, height: _h, style: _s, ...imgProps } = props;
  return <img {...imgProps} {...rest} style={style} />;
}
