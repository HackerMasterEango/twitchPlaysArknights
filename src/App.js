import React from 'react'
import styled from 'styled-components'
import nianWaifu from './images/nianBackground.jpg'

import { SocketContext, socket } from './socketContext'
import StageSelect from './components/StageSelect'

const Header = styled.header`
  position: relative;
  font-size: 1.6rem;
  text-align: center;
  background-image: linear-gradient(to left bottom, rgba(27, 38, 59, 0.72), rgba(13, 27, 42, 0.9)), url(${nianWaifu});
  overflow: auto;
  height: 40vh;

  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
    width: 90%;

    p:nth-of-type(1) {
      font-size: 6rem;
      letter-spacing: 2.5rem;
    }

    p:nth-of-type(2) {
      font-size: 2rem;
      letter-spacing: 1rem;
    }
  }
`

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <Header>
        <h1>
          <p> twitch plays arknights</p>
          <p>select a map to play</p>
        </h1>
      </Header>

      <StageSelect />
    </SocketContext.Provider>
  )
}

export default App
