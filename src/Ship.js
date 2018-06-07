import React from 'react'
import styled from 'styled-components'

import blueShip from './images/blue.png'
import redShip from './images/red.png'
import fireAnim from './images/fire.gif'

const ShipContent = styled.div`
  width: 200px;
  height: 200px;
  background: url(${props => (props.color === 'blue' ? blueShip : redShip)});
  background-size: 200px;
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: ${props => (props.color === 'blue' ? '-220px' : '220px')};
`

const Fire = styled.div`
  width: 21px;
  height: 21px;
  position: absolute;
  top: -9px;
  left: 88px;
  background: url(${fireAnim});
`

const Ship = props => {
  return (
    <div>
      <ShipContent color={props.color}>
        <Fire />
      </ShipContent>
    </div>
  )
}

export default Ship
