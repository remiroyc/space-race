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
      <Ship {...props} country="US" color="blue" />
      <Ship {...props} country="CN" color="red" />
    </ShipContainer>
  )
}

export default Ships
