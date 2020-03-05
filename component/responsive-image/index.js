import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Placeholder from 'components/images/placeholder'
import useComponentSize from 'components/custom-hooks/useComponentSize'
import useIntersection from 'components/custom-hooks/useIntersection'

function calculatePreloaderHeight(width, ratio) {
  return width ? +(width / ratio).toFixed(2) : 0
}

function ResponsiveImage({
  alt,
  bigDesktop,
  children,
  className,
  desktop,
  imgRatio,
  laptop,
  lazy,
  lazyThreshold,
  onClick,
  phone,
  q,
  src,
  style,
  tablet,
}) {
  const ref = useRef()
  const size = useComponentSize(ref)
  const { width } = size
  const [isLoaded, setIsLoaded] = useState(false)
  const [height, setHeight] = useState(100)
  const [showImage, setShowImage] = useState(false)
  const isIntersecting = lazy
    ? useIntersection(ref, { threshold: lazyThreshold })
    : true

  useEffect(() => {
    const h = calculatePreloaderHeight(width, imgRatio)
    setHeight(h)
  }, [width])

  useEffect(() => {
    setShowImage(isIntersecting)
  }, [isIntersecting])

  return (
    <picture
      className={`picture${className ? ` ${className}` : ''}`}
      ref={ref}
      style={style}
      {...(Boolean(onClick) && { onClick })}
    >
      {children}
      {!isLoaded && (
        <div className="picture">
          <Placeholder width={width} height={height} />
        </div>
      )}
      {showImage && (
        <React.Fragment>
          <source
            sizes={`
              (max-width: 767px) ${phone},
              (min-width: 768px) and (max-width: 1023px) ${tablet},
              (min-width: 1024px) and (max-width: 1440px) ${laptop},
              (min-width: 1441px) and (max-width: 1919px) ${desktop},
              (min-width: 1920px) ${bigDesktop},
              100vw,
            `}
            srcSet={`
              ${src}?auto=compress,format&fm=webp,jpg,png&w=200&q=${q} 200w,
              ${src}?auto=compress,format&fm=webp,jpg,png&w=300&q=${q} 300w,
              ${src}?auto=compress,format&fm=webp,jpg,png&w=400&q=${q} 400w,
              ${src}?auto=compress,format&fm=webp,jpg,png&w=500&q=${q} 500w,
              ${src}?auto=compress,format&fm=webp,jpg,png&w=600&q=${q} 600w,
              ${src}?auto=compress,format&fm=webp,jpg,png&w=700&q=${q} 700w,
              ${src}?auto=compress,format&fm=webp,jpg,png&w=800&q=${q} 800w,
              ${src}?auto=compress,format&fm=webp,jpg,png&w=1000&q=${q} 1000w,
              ${src}?auto=compress,format&fm=webp,jpg,png&w=1200&q=${q} 1200w,
              ${src}?auto=compress,format&fm=webp,jpg,png&w=1400&q=${q} 1400w,
              ${src}?auto=compress,format&fm=webp,jpg,png&w=1600&q=${q} 1600w,
              ${src}?auto=compress,format&fm=webp,jpg,png&w=1800&q=${q} 1800w,
              ${src}?auto=compress,format&fm=webp,jpg,png&w=2000&q=${q} 2000w,
            `}
          />
          <img
            className={`image${isLoaded ? '' : ' is-loading'}`}
            src={`${src}?auto=compress,format&fm=webp,jpg,png&w=400&q=${q}`}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
          />
        </React.Fragment>
      )}
    </picture>
  )
}

ResponsiveImage.defaultProps = {
  alt: '',
  className: '',
  bigDesktop: '100vw',
  desktop: '100vw',
  tablet: '100vw',
  laptop: '100vw',
  phone: '100vw',
  imgRatio: 1,
  lazy: true,
  lazyThreshold: 0.1,
  onClick: null,
  q: 75,
  style: null,
}

ResponsiveImage.propTypes = {
  alt: PropTypes.string,
  bigDesktop: PropTypes.string,
  className: PropTypes.string,
  desktop: PropTypes.string,
  imgRatio: PropTypes.number,
  laptop: PropTypes.string,
  lazy: PropTypes.bool,
  lazyThreshold: PropTypes.number,
  onClick: PropTypes.func,
  phone: PropTypes.string,
  q: PropTypes.number,
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  tablet: PropTypes.string,
}

export default ResponsiveImage
