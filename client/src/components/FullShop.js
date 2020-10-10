import React, { useEffect } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import Loader from "react-loader-spinner"
import {
  flexColSpace,
  flexColCenter,
  flexRowSpace,
  flexRowCenter,
} from "../styled-components/globalStyles"
import PicThumbnail from "../containers/PicThumbnail.js"

export default function ({ width, height }) {
  const vegetables = useSelector((state) => state.shop.vegetables)
  const fruit = useSelector((state) => state.shop.fruit)

  return vegetables.length >= 0 && fruit.length >= 0 ? (
    <FullShopWrapper>
      <VegsContainer>
        <strong>Vegetables</strong>
        <PicThumbnailContainer>
          {vegetables.map((item, i) => (
            <PicThumbnail key={i} item={item} idx={i + 200} />
          ))}
        </PicThumbnailContainer>
      </VegsContainer>
      <FruitContainer>
        <strong>Fruit</strong>
        <PicThumbnailContainer>
          {fruit.map((item, i) => (
            <PicThumbnail key={i} item={item} idx={i + 300} />
          ))}
        </PicThumbnailContainer>
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
  ${flexRowCenter};
  align-items: flex-start;
  width: 100%;
  margin-top: 300px;
  @media (max-width: 768px) {
    ${flexColCenter};
    justify-content: flex-start;
    margin-top: 10px;
  }
`
const VegsContainer = styled.div`
  ${flexColCenter};
  width: 100%;
  height: 90%;
`

const FruitContainer = styled.div`
  ${flexColCenter};
  width: 100%;
  height: 90%;
`

const PicThumbnailContainer = styled.div`
  ${flexRowCenter};
  width: 80%;
  height: 90%;
  flex-wrap: wrap;
`
