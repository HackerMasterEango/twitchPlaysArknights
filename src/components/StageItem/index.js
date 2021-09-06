import React from 'react'
import styled from 'styled-components'

import StageOptions from '../StageOptions'

const cardSideMixin = `
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  transition: all 0.7s ease;
  width: 100%;
  height: 100%;
`
const FrontSide = styled.div`
  ${cardSideMixin}
`

const Backside = styled.div`
  perspective: 200rem;
  background-image: linear-gradient(to left bottom, #415a77, #1b263b);
  ${cardSideMixin}
  transform: rotateY(180deg);
`

const Wrapper = styled.div`
  height: 23rem;
  width: 34.8rem;

  position: relative;

  &:hover ${FrontSide} {
    transform: rotateY(-180deg);
  }

  &:hover ${Backside} {
    transform: rotateY(0);
  }
`

const StageName = styled.h3`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  font-size: 2.8rem;
  text-transform: uppercase;
  color: #e0e1dd;

  span {
    padding: 0 1rem;
    background-image: linear-gradient(to left bottom, rgba(65, 90, 119, 0.8), rgba(27, 38, 59, 0.8));
    box-decoration-break: clone;
  }
`

const StagePicture = styled.div`
  background: linear-gradient(to left bottom, #415a77, #1b263b), url(${props => props.imgUrl});
  background-blend-mode: color;
  background-size: cover;
  height: 100%;
`

const StageItem = ({ stage }) => {
  return (
    <Wrapper>
      <FrontSide>
        <StagePicture imgUrl={stage.img} />
        <StageName>
          <span>{stage.title}</span>
        </StageName>
      </FrontSide>

      <Backside>
        <StageOptions stage={stage} />
      </Backside>
    </Wrapper>
  )
}

export default StageItem
