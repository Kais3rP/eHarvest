import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import {
  ContainerDiv,
  flexRowSpace,
  flexRowCenter,
  flexColCenter,
  flexColSpace,
  textSecondaryFont,
} from "../styled-components/globalStyles"
import Loader from "react-loader-spinner"
import PicThumbnail from "../containers/PicThumbnail"
import Window from "./Window"


export default function () {
  
  const user = useSelector((state) => state.shop.publicUser)
  const vegs = useSelector(state => state.shop.vegetables)
  const fruit = useSelector(state => state.shop.fruit)
  const products = [...vegs, ...fruit]
  const userProducts = products.filter(prod => user.productsInSale.includes(prod._id))

  console.log(user)
  return user ? (
    <MainDiv>
   <Window title={"Seller Info:"}/>   
    <LayoutContainerDiv>
    <LeftWrapperDiv>
        <Window title={"Info&Picture:"}>
          <ul>
          <RowLi>
            <strong>Name:</strong>
            <p>{`${user.name} ${user.surname}`}</p>
          </RowLi>
          <RowLi>
            <strong>Description:</strong>
            <p>{user.description}</p>
          </RowLi>
          </ul>
          <UserPicImg
              src={`data:image/png;base64,${user.picture}`}
            />         
        </Window>
        </LeftWrapperDiv>
        <RightWrapperDiv>
        <Window title={`Sold by ${user.name} ${user.surname}:`}>
          <ul>
         <ColLi>
           {userProducts.map((item, i) => (
              <PicThumbnail key={item._id} item={item} idx={i} priv />
            ))}
         </ColLi>
          </ul>       
        </Window>
        </RightWrapperDiv>
        </LayoutContainerDiv>
    </MainDiv>
  ) :  <Loader
  type="TailSpin"
  color="black"
  height={50}
  width={50}
  timeout={6000} // 6 secs
/>
}

const MainDiv = styled.div`
  & > * {
    ${textSecondaryFont};
  }
  ${flexColSpace};
  align-items: flex-start;
  width: 100%;
  margin-top: 230px;
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`
const LayoutContainerDiv = styled.div`
${flexRowSpace};
  align-items: flex-start;
  width: 98%;
  @media (max-width: 768px) {
    ${flexColCenter};
    justify-content: flex-start;
    margin-top: 10px;
    width: 98%;
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

const UserPicImg = styled.img`
  width: 48%;
  margin: 5px;
`

const RowLi = styled.li`
  ${flexRowCenter};
  justify-content: flex-start;
`

const ColLi = styled.li`
  ${flexColCenter};
`
