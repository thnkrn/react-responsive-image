import React from 'react'
import styled from 'styled-components'
import ResponsiveImage from 'components/images/responsive-image'

const Header = styled.h1`
  color: red;
`

const Homepage = () => {
  return (      
    <ResponsiveImage
      alt="alt"
      bigDesktop="10vw"
      desktop="10vw"
      phone="25vw"
      tablet="10vw"
      imgRatio={0.75}
      q={75}
      src="src"
    />
  )
}

export default Homepage
