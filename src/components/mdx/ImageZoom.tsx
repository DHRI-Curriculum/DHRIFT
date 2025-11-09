'use client'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface ImageZoomProps {
  src: string
  alt: string
  width?: number | string
  height?: number | string
}

/**
 * Image with zoom functionality
 * Wraps images with click-to-zoom capability
 */
export function ImageZoom({ src, alt, width, height }: ImageZoomProps) {
  return (
    <Zoom>
      <img
        src={src}
        alt={alt}
        style={{
          width: width || '100%',
          height: height || 'auto',
          display: 'block',
          cursor: 'zoom-in',
        }}
      />
    </Zoom>
  )
}

/**
 * Override default img tag to add zoom
 */
export function img(props: any) {
  return <ImageZoom {...props} />
}
