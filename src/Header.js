import React from 'react'
import styled from 'styled-components'

const HeaderContent = styled.div`
  position: absolute;
  width: 100%;
  z-index: 100;
  top: 40px;
  text-align: center;
`

const HeaderTitle = styled.h1`
  padding: 20px;
`

const Header = props => {
  return (
    <HeaderContent>
      <HeaderTitle>Nebulas Spaceship Race</HeaderTitle>
    </HeaderContent>
  )
}

export default Header
