import React from 'react'
import styled from 'styled-components'

import blueShip from './images/blue.png'
import redShip from './images/red.png'
import fireAnim from './images/fire.gif'
import { buyGas } from './services/nebulas';

const ShipContent = styled.div`
  width: 200px;
  height: 200px;
  background: url(${props => (props.color === 'blue' ? blueShip : redShip)});
  background-size: 200px;
  position: absolute;
  top: -100px;
  left: 50%;
  margin-left: ${props => (props.color === 'blue' ? '-420px' : '220px')};
`

const Fire = styled.div`
  width: 21px;
  height: 21px;
  position: absolute;
  top: -9px;
  left: 88px;
  background: url(${fireAnim});
`

const Button = styled.button`
  background: none;
  box-shadow: none;
  color: white;
  border: 3px solid white;
  font-family: 'LomoCopy LT W01 Midi', georgia;
  position: absolute;
  top: 240px;
  left: 38px;
  font-size: 20px;
  text-transform: uppercase;
`

const Distance = styled.div`
  font-family: 'LomoCopy LT W01 Midi', georgia;
  font-size: 18px;
  text-align: center;
  width: 200px;
  top: 300px;
  position: absolute;
`

const Ship = props => {
  return (
    <div>
      <ShipContent color={props.color}>
        <Fire />
        <Distance>{props.ship.distance}/10000 PARSEC</Distance>
         {props.gas <= 0 ? (
          <Button onClick={e => { props.buyGas() }}>{"Buy gas"}</Button>
         ) : (
          <Button onClick={e => { props.useGas(props.gas, props.shipId) }}>{"Use gas"}</Button>
         )}
      </ShipContent>
    </div>
  )
}

export default Ship
