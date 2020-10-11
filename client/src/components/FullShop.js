import React, { useEffect } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import Loader from "react-loader-spinner"
import {
  flexColSpace,
  flexColCenter,
  flexRowSpace,
  flexRowCenter,
  ContainerDiv,
  TitleDiv,
  PicThumbnailContainerDiv,
} from "../styled-components/globalStyles"
import PicThumbnail from "../containers/PicThumbnail.js"

export default function () {
  const vegetables = useSelector((state) => state.shop.vegetables)
  const fruit = useSelector((state) => state.shop.fruit)

  return vegetables.length >= 0 && fruit.length >= 0 ? (
    <FullShopWrapper>
      <VegsContainer>
      <ContainerDiv>
      <TitleDiv>
        <strong>Vegetables</strong>
        </TitleDiv>
        <PicThumbnailContainerDiv>
          {vegetables.map((item, i) => (
            <PicThumbnail key={i} item={item} idx={i + 200} />
          ))}
        </PicThumbnailContainerDiv>
        
        </ContainerDiv>
      </VegsContainer>
      <FruitContainer>
      <ContainerDiv>
      <TitleDiv>
        <strong>Fruit</strong>
        </TitleDiv>
        <PicThumbnailContainerDiv>
          {fruit.map((item, i) => (
            <PicThumbnail key={i} item={item} idx={i + 300} />
          ))}
        </PicThumbnailContainerDiv>
        </ContainerDiv>
      </FruitContainer>
    </FullShopWrapper>
  ) : (
    <FullShopWrapper>
      <Loader
        type="TailSpin"
        color="black"
        height={50}
        width={50}
        timeout={3000} // 3 secs
      />
    </FullShopWrapper>
  )
}

const FullShopWrapper = styled.div`
  ${flexRowSpace};
  align-items: flex-start;
  width: 98%;
  margin-top: 230px;
  @media (max-width: 768px) {
    ${flexColCenter};
    justify-content: flex-start;
    margin-top: 10px;
  }
`
const VegsContainer = styled.div`
  ${flexColCenter};
  width: 47%;
  @media (max-width: 768px) {
    width: 98%;
  }
`

const FruitContainer = styled.div`
  ${flexColCenter};
  width: 47%;
  @media (max-width: 768px) {
    width: 98%;
  }
`
