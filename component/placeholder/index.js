import React from 'react'
import PropTypes from 'prop-types'
import ContentLoader from 'react-content-loader'

function ImagePlaceholder({ height, width }) {
  return (
    <ContentLoader
      height={height}
      width={width}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="0" y="0" width={width} height={height} />
    </ContentLoader>
  )
}

ImagePlaceholder.defaultProps = {
  height: 100,
  width: 100,
}

ImagePlaceholder.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
}

export default ImagePlaceholder
