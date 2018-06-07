import React from 'react'
import Particles from 'react-particles-js'
import styled from 'styled-components'

const Content = styled.div`
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100%;
`

const particuleConfig = {
  particles: {
    number: { value: 200, density: { enable: true, value_area: 1000 } },
    color: { value: '#fff' },
    opacity: {
      value: 0.5,
      random: true,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 2,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: false,
      distance: 500,
      color: '#ffffff',
      opacity: 0.4,
      width: 2
    },
    move: {
      enable: true,
      speed: 60,
      direction: 'top',
      random: true,
      straight: true,
      out_mode: 'out',
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  retina_detect: true
}

const Background = props => {
  return (
    <Content>
      <Particles
        style={{
          background: 'black',
          width: '100%',
          height: '100%'
        }}
        height={window.innerHeight}
        params={particuleConfig}
      />
    </Content>
  )
}

export default Background
