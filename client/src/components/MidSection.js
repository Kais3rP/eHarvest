import React from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import Loader from "react-loader-spinner"
import {
  flexColSpace,
  flexColCenter,
  flexRowSpace,
  flexRowCenter,
} from "../styled-components/globalStyles"
import Offers from "./Offers"
import MostSold from "./MostSold.js.js"

export default function () {
  const offersItems = useSelector((state) => state.shop.offersItems)
  const mostSold = useSelector((state) => state.shop.mostSoldItems)

  return offersItems && mostSold ? (
    <MidSectionWrapper>
    <LeftWrapperDiv>
      <Offers offersItems={offersItems} />
      </LeftWrapperDiv>
      <RightWrapperDiv>
      <MostSold mostSold={mostSold} />
      </RightWrapperDiv>
    </MidSectionWrapper>
  ) : (
    <Loader
      type="TailSpin"
      color="black"
      height={50}
      width={50}
      timeout={6000} // 6 secs
    />
  )
}

const MidSectionWrapper = styled.div`
  ${flexRowSpace};
  width: 98%;
  text-align: center;
  margin-top: 230px;
  @media (max-width: 768px) {
    ${flexColCenter};
    justify-content: flex-start;
    margin-top: 20px;
  }
  @media (max-height: 500px) {
    ${flexColCenter};
    justify-content: flex-start;
    margin-top: 20px;
  }
`
const LeftWrapperDiv = styled.div`
  ${flexColCenter};
  width: 47%;

  @media (max-width: 768px) {
    width: 100%;
  }
`
const RightWrapperDiv = styled.div`
  ${flexColCenter};
  width: 47%;

  @media (max-width: 768px) {
    width: 100%;
  }
`
