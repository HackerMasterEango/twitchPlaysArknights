import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 365;
`

const ModalWrapper = styled.div`
  width: 80rem;
  height: 40rem;
  border-radius: 1rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0.2);
  color: #e0e1dd;
  padding: 1rem;
  background: radial-gradient(#415a77, #0d1b2a);
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const closeSpanMixin = angle => `
    content: '';
    height: 4px;
    width: 45px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #E0E1DD;
    border-radius: 2px;
    transform: rotate(${angle}deg);
    transition: all 0.3s ease-in;
    margin-top: 24px;
`

const Close = styled.span`
  position: relative;
  width: 50px;
  height: 50px;

  cursor: pointer;

  &::before {
    ${closeSpanMixin(45)}
  }

  &::after {
    ${closeSpanMixin(-45)}
  }

  &:hover::before {
    transform: rotate(-45deg);
    background-color: #ef2d56;
  }

  &:hover::after {
    transform: rotate(45deg);
    background-color: #ef2d56;
  }
`

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
`

const Modal = ({ showModal, setShowModal, headerText, onClose, children }) => {
  return (
    <>
      {showModal &&
        ReactDOM.createPortal(
          <Background>
            <ModalWrapper>
              <Header>
                <h2>{headerText}</h2>

                <Close
                  onClick={() => {
                    setShowModal(false)
                    onClose()
                  }}
                />
              </Header>
              <ModalContent>{children}</ModalContent>
            </ModalWrapper>
          </Background>,
          document.body
        )}
    </>
  )
}

export default Modal
