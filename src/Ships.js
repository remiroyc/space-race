import React from 'react'
import styled from 'styled-components'

import Ship from './Ship'

const ShipContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 100;
  top: 45%;
`

const Ships = props => {
  console.log('props', props)
  return (
    <ShipContainer>
      <Ship gas={props.gas} selectedShip={props.selectedShip} useGas={props.useGas} buyGas={props.buyGas} ship={props.ships[1]} shipId={1} color="blue" />
      <Ship gas={props.gas} selectedShip={props.selectedShip} useGas={props.useGas} buyGas={props.buyGas} ship={props.ships[2]} shipId={2} color="red" />
    </ShipContainer>
  )
}

export default Ships
