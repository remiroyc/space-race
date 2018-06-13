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

function getShip(shipId) {
  return [blueShip, redShip, smallShip, whiteShip][Number(shipId) - 1]
}

const Ships = props => {
  return (
    <ShipContainer>
      {Object.keys(props.ships)
        .sort((a, b) => {
          return props.ships[b].distance - props.ships[a].distance
        })
        .map((shipId, index) => {
          const ship = props.ships[shipId]
          return (
            <Ship
              key={Number(shipId)}
              gas={props.gas}
              selectedShip={props.selectedShip}
              useGas={props.useGas}
              buyGas={props.buyGas}
              ship={ship}
              shipId={Number(shipId)}
              position={index + 1}
              type={getShip(shipId)}
              lastTransaction={props.lastTransaction}
            />
          )
        })}
    </ShipContainer>
  )
}

export default Ships
