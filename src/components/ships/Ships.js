import React from 'react'
import styled from 'styled-components'
import blueShip from '../../images/blue.png'
import redShip from '../../images/red.png'
import smallShip from '../../images/small.png'
import whiteShip from '../../images/white.png'

import Ship from './Ship'

const ShipContainer = styled.div`
  width: 100%;
  z-index: 100;
  top: 50%;
  position: absolute;
`

const Ships = props => {
  console.log('props', props)
  return (
    <ShipContainer>
      <Ship
        gas={props.gas}
        selectedShip={props.selectedShip}
        useGas={props.useGas}
        buyGas={props.buyGas}
        ship={props.ships[1]}
        shipId={1}
        type={blueShip}
      />
      <Ship
        gas={props.gas}
        selectedShip={props.selectedShip}
        useGas={props.useGas}
        buyGas={props.buyGas}
        ship={props.ships[2]}
        shipId={2}
        type={redShip}
      />
      <Ship
        gas={props.gas}
        selectedShip={props.selectedShip}
        useGas={props.useGas}
        buyGas={props.buyGas}
        ship={props.ships[3]}
        shipId={3}
        type={smallShip}
      />
      <Ship
        gas={props.gas}
        selectedShip={props.selectedShip}
        useGas={props.useGas}
        buyGas={props.buyGas}
        ship={props.ships[4]}
        shipId={4}
        type={whiteShip}
      />
    </ShipContainer>
  )
}

export default Ships
