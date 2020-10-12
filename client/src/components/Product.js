import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import {
  ContainerDiv,
  flexRowSpace,
  flexRowCenter,
  textSecondaryFont,
  flexColCenter,
  flexColSpace,
} from "../styled-components/globalStyles"
import Window from "./Window"
import ImagePreviewer from "./ImagePreviewer"

export default function () {
    const dispatch = useDispatch()
  const productClicked = useSelector((state) => state.shop.productClicked)
  const [selectedPicSrc, setSelectedPicSrc] = useState("")
  const [isPreviewPic, setIsPreviewPic] = useState(false)
  return (
    <MainDiv>
    {isPreviewPic && <ImagePreviewer pic={{pic:selectedPicSrc, name:productClicked.productName}} onClick={()=>{
      setIsPreviewPic(false)
    }}/>}
    <Window title={"Product Info"}/>
    <LayoutContainerDiv>
      <LeftMainDiv>
        <Window title={ <ProductSvgImg src={productClicked.pic} />}>
         
          <ul>
          <RowLi>
            <strong>Category:</strong>
            <p> {productClicked.type}</p>
          </RowLi>
          <RowLi>
            <strong>Product Name:</strong>
            <p> {productClicked.productName}</p>
          </RowLi>
          <RowLi>
            <strong>Seller Name:</strong>
            <p>{productClicked.sellerName}</p>
          </RowLi>
          <RowLi>
            <strong>Price (€/Kg):</strong>
            <p> {productClicked.price}€</p>
          </RowLi>
          <RowLi>
            <strong>Quantity available:</strong>
            <p>{productClicked.quantityAvailable} Kgs available</p>
          </RowLi>
          <RowLi>
            <p>
              These {productClicked.productName} have been bought
              {productClicked.soldNTimes} times
            </p>
          </RowLi>
          
          <DescriptionDiv>
            <strong>Description:</strong>
            <p> {productClicked.description}</p>
          </DescriptionDiv>
          
          <RowLi>
            <strong>This product has been rated </strong>
            <p>{productClicked.numberOfVotes} times</p>
          </RowLi>
          <RowLi>
            <strong>Average rating:</strong>
            <p> {productClicked.rating}</p>
          </RowLi>
          </ul>
        </Window>
      </LeftMainDiv>
      <RightMainDiv>
        <Window title={"Pictures"}>
          <PicturesContainerDiv>
          {[productClicked.realPicture].map(pic =>  <ProductPicImg
              src={`data:image/png;base64,${pic}`} onClick={()=>{
                setSelectedPicSrc(`data:image/png;base64,${pic}`)
                setIsPreviewPic(true)
              }}
            /> )}
          </PicturesContainerDiv>
          </Window>
       
      </RightMainDiv>
      </LayoutContainerDiv>
    </MainDiv>
  )
}

const MainDiv = styled.div`
  & > * {
    ${textSecondaryFont};
  }
  ${flexColSpace};
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

const LeftMainDiv = styled.div`
  ${flexColCenter};
  width: 47%;

  @media (max-width: 768px) {
    width: 100%;
  }
`
const RightMainDiv = styled.div`
  ${flexColCenter};
  width: 47%;

  @media (max-width: 768px) {
    width: 100%;
  }
`
const PicturesContainerDiv = styled.div`
  width: 100%;
`

const DescriptionDiv = styled.div`
  width: 100%;
  overflow: auto;
`
const ProductPicImg = styled.img`
  width: 48%;
  margin: 5px;
  cursor:pointer;
`
const ProductSvgImg = styled.img`
  width: 15%;
`

const RowLi = styled.li`
  ${flexRowCenter};
  justify-content: flex-start;
`

