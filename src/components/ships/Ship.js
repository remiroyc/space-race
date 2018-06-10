import React from 'react'
import styled from 'styled-components'

import fireAnim from '../../images/fire.gif'
import { buyGas } from '../../services/nebulas'

const ShipWrapper = styled.div`
  width: 25%;
  display: inline-block;
  text-align: center;
  position: relative;
`

const ShipContent = styled.div`
  width: 150px;
  height: 150px;
  background: url(${props => props.type});
  background-size: 150px;
  position: relative;
  display: inline-block;
`

const Fire = styled.div`
  width: 21px;
  height: 21px;
  position: absolute;
  top: -6px;
  left: 63px;
  background: url(${fireAnim});
`

const Button = styled.button`
  background: none;
  box-shadow: none;
  color: white;
  border: 3px solid white;
  font-family: 'LomoCopy LT W01 Midi', georgia;
  display: inline-block;
  top: 240px;
  left: 38px;
  font-size: 20px;
  text-transform: uppercase;
`

const Distance = styled.div`
  font-family: 'LomoCopy LT W01 Midi', georgia;
  font-size: 18px;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
  top: 300px;
  display: inline-block;
`

const PositionFire = Fire.extend`
  left: ${props => props.left};
  top: ${props => props.top};
`

const Ship = props => {
  console.log(props)
  return (
    <ShipWrapper>
      <ShipContent type={props.type}>
        {props.shipId === 3 ? (
          <React.Fragment>
            <PositionFire left="51px" top="8px" />
            <PositionFire left="74px" top="8px" />
          </React.Fragment>
        ) : (
          <Fire />
        )}
      </ShipContent>
      <Distance>{props.ship.distance}/10000 PARSEC</Distance>
      {props.gas <= 0 && (
        <Button
          onClick={e => {
            props.buyGas()
          }}
        >
          {'Buy gas'}
        </Button>
      )}

      {props.gas > 0 &&
        (props.selectedShip === null || props.selectedShip === props.shipId) && (
          <Button
            onClick={e => {
              props.useGas(props.gas, props.shipId)
            }}
          >
            {'Use gas'}
          </Button>
        )}

      <Button>Choose team</Button>
    </ShipWrapper>
  )
}

export default Ship
