import React from 'react'
import Ship from './Ship'
import styled from 'styled-components'

const ShipContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 100;
  top: 50%;
`

const Ships = props => {
  return (
    <ShipContainer>
      <Ship color="blue" />
      <Ship color="red" />
    </ShipContainer>
  )
}

export default Ships
