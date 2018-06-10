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
  font-size: 42px;
  color: #4560e6;
`

const HeaderPrice = styled.h1`
  padding: 0;
  margin: 0;
`

const HeaderSubtitle = styled.h2`
  font-size: 24px;
`

const Header = props => {
  return (
    <HeaderContent>
      <HeaderTitle>Nebulas Spaceship Race</HeaderTitle>
      <HeaderPrice>200 NAS FOR THE WINNING TEAM</HeaderPrice>
      <HeaderSubtitle>First ship to reach 10000 Parsec is the winner</HeaderSubtitle>
      <HeaderSubtitle>Choose your team and help it reach the final frontier</HeaderSubtitle>
    </HeaderContent>
  )
}

export default Header
