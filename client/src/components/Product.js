import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import {
  ContainerDiv,
  flexRowSpace,
  flexRowCenter,
  textSecondaryFont,
} from "../styled-components/globalStyles"

export default function () {
    const dispatch = useDispatch();
  const productClicked = useSelector((state) => state.shop.productClicked)
  return (
    <WrapperDiv>
      <LeftMainContainerDiv>
        <ContainerDiv>
          <ProductSvgImg src={productClicked.pic} />
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
        </ContainerDiv>
      </LeftMainContainerDiv>
      <RightMainContainerDiv>
        <ContainerDiv>
          <PicturesContainerDiv>
            <ProductPicImg
              src={`data:image/png;base64,${productClicked.realPicture}`}
            />
            <ProductPicImg
              src={`data:image/png;base64,${productClicked.realPicture}`}
            />
            <ProductPicImg
              src={`data:image/png;base64,${productClicked.realPicture}`}
            />
            <ProductPicImg
              src={`data:image/png;base64,${productClicked.realPicture}`}
            />
            <ProductPicImg
              src={`data:image/png;base64,${productClicked.realPicture}`}
            />
          </PicturesContainerDiv>
        </ContainerDiv>
      </RightMainContainerDiv>
    </WrapperDiv>
  )
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
const ProductPicImg = styled.img`
  width: 48%;
  margin: 5px;
`
const ProductSvgImg = styled.img`
  width: 15%;
`

const RowLi = styled.li`
  ${flexRowCenter};
  justify-content: flex-start;
`

