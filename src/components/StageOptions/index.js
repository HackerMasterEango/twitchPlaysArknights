import React, { useState, useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import Modal from '../../ui/Modal'
import useCounter from '../../hooks/useCountdown'

import { SocketContext } from '../../socketContext'
import StageSelectedDetails from '../StageSelectedDetails'

const { ipcRenderer } = window.require('electron')

const moveInFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-10px);

  }

  70% {
    transform: translateX(10px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideAwayLeft = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);

  }

  30% {
    transform: translateX(10px);
  }

  100% {
    opacity: 0;
    transform: translateX(-10px);
  }
`

const moveInFromRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(10px);

  }

  70% {
    transform: translateX(-10px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideAwayRight = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);

  }

  30% {
    transform: translateX(-10px);
  }

  100% {
    opacity: 0;
    transform: translateX(10px);
  }
`

const UndeployTimeout = styled.div`
  h4 {
    text-decoration: underline;
    font-size: 2rem;
  }

  div {
    display: flex;
    justify-content: space-evenly;

    input[type=${'radio'}] {
      display: none;
    }
    input[type=${'radio'}]:checked ~ span {
      color: #e0e1dd;
      text-shadow: 0 2px 20px #e0e1dd;
    }
  }
`

const StageOptionForm = styled.form`
  padding: 1rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  label {
    input[type=${'checkbox'}] {
      display: none;
    }
    input[type=${'checkbox'}]:checked ~ span {
      color: #e0e1dd;
      text-shadow: 0 2px 20px #e0e1dd;
    }

    span {
      color: #555;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
      font-size: 2rem;
      transition: all 0.3s;
      user-select: none;
      text-decoration: none;
      overflow: hidden;
      cursor: pointer;
    }

    input[type=${'checkbox'}]:checked ~ ${UndeployTimeout} h4 {
      animation: ${moveInFromLeft};
      animation-duration: 0.3s;
    }

    input[type=${'checkbox'}]:not(:checked) ~ ${UndeployTimeout} h4 {
      animation: ${slideAwayLeft};
      animation-duration: 0.3s;
      opacity: 0;
    }

    input[type=${'checkbox'}]:checked ~ ${UndeployTimeout} div {
      animation: ${moveInFromRight};
      animation-duration: 0.3s;
    }

    input[type=${'checkbox'}]:not(:checked) ~ ${UndeployTimeout} div {
      animation: ${slideAwayRight};
      animation-duration: 0.3s;
      opacity: 0;
    }
  }
`

const SubmitFormButton = styled.button`
  align-self: flex-end;
  border-radius: 1rem;
  color: #e0e1dd;
  padding: 1.5rem 3rem;
  background: none;
  border: 2px solid #e0e1dd;
  font-size: 2rem;
  transition: all 0.1s;

  &:hover {
    text-shadow: 0 2px 20px #e0e1dd;
    box-shadow: 0 1px 5px #e0e1dd;
    cursor: pointer;
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(-1px);
  }
`

const TwitchChannelInput = styled.div`
  label {
    overflow: hidden;
    width: 100%;
    font-size: 2rem;
    display: flex;
    gap: 1rem;

    p {
      white-space: nowrap;
    }

    input {
      width: 16rem;
      font-size: 1.6rem;
      padding: 0.5rem;
      border-radius: 10px;
    }

    input:focus {
      outline: none;
    }
  }
`

const ValidateError = styled.p`
  color: #ef2d56;
  animation: ${moveInFromLeft};
  animation-duration: 0.3s;
`

const StageOptions = ({ stage }) => {
  const socket = useContext(SocketContext)

  const [twitchChannel, setTwitchChannel] = useState('')
  const [allowUndeploy, setAllowUndeploy] = useState(false)
  const [undepTimeout, setUndepTimeout] = useState(undefined)
  const [validateError, setValidateError] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const completionFn = () => {
    console.log('sending request to backend LUL')

    ipcRenderer.send('runCommand', { stage, allowUndeploy, undepTimeout, twitchChannel })

    // TODO: if ever get remote desktop can do this.
    // socket.emit('playStage', { stage, allowUndeploy, undepTimeout })
  }

  const [count, resetTimer, startTimer] = useCounter(5, completionFn)

  const startStage = e => {
    e.preventDefault()

    if (twitchChannel === '') {
      setValidateError(true)
      return
    }

    const validationError = !allowUndeploy || (allowUndeploy && undepTimeout)

    if (!validationError) {
      setValidateError(true)
      return
    }

    setShowModal(true)

    // Start the timer.
    setTimeout(() => startTimer(), 500)
  }

  return (
    <>
      <StageOptionForm onSubmit={startStage}>
        <TwitchChannelInput>
          <label>
            <p>Twitch Channel:</p>
            <input
              placeholder="your name on twitch"
              type="text"
              name="name"
              value={twitchChannel}
              onChange={e => setTwitchChannel(e.target.value)}
            />
          </label>
        </TwitchChannelInput>

        <label>
          <input
            type="checkbox"
            name=""
            onChange={() => {
              setAllowUndeploy(!allowUndeploy)
              setValidateError(false)
            }}
          />
          <span>Allow Undeploy</span>

          <UndeployTimeout>
            <h4>Select Undeploy Timeout</h4>
            <div>
              {[0, 5, 10, 20].map(sec => (
                <label>
                  <input
                    type="radio"
                    name="undep"
                    value={sec}
                    onChange={e => {
                      setUndepTimeout(e.target.value)
                      setValidateError(false)
                    }}
                  />
                  <span>{sec}s</span>
                </label>
              ))}
            </div>
          </UndeployTimeout>
        </label>
        {validateError && twitchChannel === '' && <ValidateError>Enter a twitch channel name</ValidateError>}
        {validateError && allowUndeploy && <ValidateError>Select an undeploy timeout jabroni</ValidateError>}
        <SubmitFormButton type="submit">Start Stage</SubmitFormButton>
      </StageOptionForm>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        onClose={resetTimer}
        headerText="Stage is starting make sure to focus on emulator window"
      >
        <StageSelectedDetails count={count} stage={stage} allowUndeploy={allowUndeploy} undepTimeout={undepTimeout} />
      </Modal>
    </>
  )
}

export default StageOptions

// undeploy = enable/disable
// if undeploy is enabled then allow user to select a timeout 0, 5, 10, 20

// TODO: allow twitch voting on site.
