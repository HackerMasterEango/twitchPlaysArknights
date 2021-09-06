import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 3rem;
`

const StagePicture = styled.div`
  background: linear-gradient(to left bottom, #415a77, #1b263b), url(${props => props.imgUrl});
  background-blend-mode: hue;
  background-size: 30rem 19.8rem;
  height: 19.8rem;
  width: 30rem;
`

const SelectedOption = styled.p`
  margin-bottom: 2rem;
`

const StageTitle = styled.h2`
  grid-column: 1 / -1;
  text-align: center;
`

const Counter = styled.p`
  font-size: 2.8rem;
`

const StageSelectedDetails = ({ stage, count, allowUndeploy, undepTimeout }) => {
  const getUndeployText = () => {
    if (!allowUndeploy) {
      return 'Not allowing undeploys'
    }

    return undepTimeout > 0 ? `Allowing undeploys every ${undepTimeout} seconds` : 'Allowing undeploys to be spammed'
  }

  return (
    <Wrapper>
      <StageTitle>{stage.title} </StageTitle>
      <StagePicture imgUrl={stage.img} />

      <div>
        <SelectedOption>{getUndeployText()}</SelectedOption>
        <Counter>{count > 0 ? `Stage starting  in ${count}` : 'Stage started!'}</Counter>
      </div>
    </Wrapper>
  )
}

export default StageSelectedDetails
