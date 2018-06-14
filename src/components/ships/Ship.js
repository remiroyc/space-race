import React from 'react'
import styled from 'styled-components'
import Countdown from 'react-countdown-now'

import fireAnim from '../../images/fire.gif'
import EuropeFlag from '../../images/flags/eu.svg'
import ChinaFlag from '../../images/flags/ch.svg'
import UnitedStatesFlag from '../../images/flags/us.svg'
import RussianFlag from '../../images/flags/ru.svg'

const ShipWrapper = styled.div`
  width: 25%;
  display: inline-block;
  text-align: center;
  position: relative;
  vertical-align: top;
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
  top: 137px;
  left: 66px;
  background: url(${fireAnim});
  transform: rotate(180deg);
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

const ShipTitle = styled.div`
  position: relative;
  top: -10px;
`

const ShipImage = styled.img`
  width: 20px;
`

function getShip(shipId) {
  return [EuropeFlag, ChinaFlag, UnitedStatesFlag, RussianFlag][
    Number(shipId) - 1
  ]
}

const Ship = props => {
  return (
    <ShipWrapper>
      <ShipTitle>
        {`${props.position}. `}
        <ShipImage src={getShip(props.shipId)} alt="" />
      </ShipTitle>
      <ShipContent type={props.type}>
        {props.shipId === 3 ? (
          <React.Fragment>
            <PositionFire left="55px" top="124px" />
            <PositionFire left="78px" top="124px" />
          </React.Fragment>
        ) : (
          <Fire />
        )}
      </ShipContent>
      <Distance>{props.ship.distance}/10000 PARSEC</Distance>
      {props.gas > 0 ? (
        <React.Fragment>
          {props.selectedShip === null ? (
            <React.Fragment>
              <p>select this team</p>
              <Button
                onClick={e => {
                  props.useGas(props.gas, props.shipId)
                }}
              >
                {'Use gas'}
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {props.selectedShip === props.shipId && (
                <React.Fragment>
                  {props.lastTransaction + 600000 <= Date.now() ? (
                    <Button
                      onClick={e => {
                        props.useGas(props.gas, props.shipId)
                      }}
                    >
                      {'Use gas'}
                    </Button>
                  ) : (
                    <p>
                      <Countdown date={props.lastTransaction + 600000} />
                      <br />
                      before next gas spend
                    </p>
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {props.selectedShip === props.shipId && (
            <p>You should buy some gas</p>
          )}
        </React.Fragment>
      )}
    </ShipWrapper>
  )
}

export default Ship
