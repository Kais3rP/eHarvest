import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import {
  ContainerDiv,
  flexRowSpace,
  flexRowCenter,
  textSecondaryFont,
} from "../styled-components/globalStyles"
import Loader from "react-loader-spinner"

export default function () {
  
  const user = useSelector((state) => state.shop.publicUser);
  console.log(user)
  return user ? (
    <WrapperDiv>
      <LeftMainContainerDiv>
        <ContainerDiv>
          <ul>
          <RowLi>
            <strong>Name:</strong>
            <p>{user.name+" "+user.surname}</p>
          </RowLi>
          </ul>
        </ContainerDiv>
      </LeftMainContainerDiv>
      <RightMainContainerDiv>
        <ContainerDiv>
          <PicturesContainerDiv>
            <UserPicImg
              src={`data:image/png;base64,${user.picture}`}
            />
          
          </PicturesContainerDiv>
        </ContainerDiv>
      </RightMainContainerDiv>
    </WrapperDiv>
  ) :  <Loader
  type="TailSpin"
  color="black"
  height={50}
  width={50}
  timeout={6000} // 6 secs
/>

}

const WrapperDiv = styled.div`
  ${flexRowSpace};
  ${textSecondaryFont};
  margin-top: 250px;
  width: 95%;
  align-items: flex-start;
`
const LeftMainContainerDiv = styled.div`
  width: 48%;
`

const RightMainContainerDiv = styled.div`
  width: 48%;
`

const PicturesContainerDiv = styled.div`
  width: 100%;
`

const DescriptionDiv = styled.div`
  width: 100%;
  overflow: auto;
`
const UserPicImg = styled.img`
  width: 48%;
  margin: 5px;
`


const RowLi = styled.li`
  ${flexRowCenter};
  justify-content: flex-start;
`
const em = styled.p`
  margin-top: 3px;
`
