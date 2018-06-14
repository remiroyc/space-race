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
  font-size: 36px;
  color: #4560e6;
`

const HeaderPrice = styled.h1`
  padding: 0;
  margin: 0;
  font-size: 24px;
`

const HeaderSubtitle = styled.h2`
  font-size: 16px;
`

const Form = styled.div`
  margin-top: 20px;
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

const Input = styled.input`
  background: none;
  box-shadow: none;
  color: white;
  border: 3px solid white;
  font-family: 'LomoCopy LT W01 Midi', georgia;
  display: inline-block;
  font-size: 20px;
  height: 27px;
  text-transform: uppercase;
  vertical-align: top;
  width: 100px;
  margin-right: 10px;
`

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 10
    }
    this.updateQuantity = this.updateQuantity.bind(this)
  }

  updateQuantity(e) {
    this.setState({ quantity: e.target.value })
  }

  render() {
    return (
      <HeaderContent>
        <HeaderTitle>Nebulas Spaceship Race</HeaderTitle>
        <HeaderPrice>UP TO 200 NAS FOR THE WINNING TEAM</HeaderPrice>
        <HeaderSubtitle>First ship to reach 10000 Parsec is the winner</HeaderSubtitle>
        {this.props.gas > 0 ? (
          <HeaderSubtitle>You have {this.props.gas} GAS you can spend it</HeaderSubtitle>
        ) : (
          <HeaderSubtitle>Buy gas and choose your team</HeaderSubtitle>
        )}

        <Form>
          <Input onChange={e => this.updateQuantity(e)} value={this.state.quantity} type="text" />
          <Button onClick={() => this.props.buyGas(this.state.quantity)}>{'Buy gas'}</Button>
        </Form>
      </HeaderContent>
    )
  }
}

export default Header
