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
  const productClicked = useSelector((state) => state.shop.productClicked)
  const dispatch = useDispatch()
  const [] = useState(false)
  const [] = useState(false)
  const [] = useState("")
  return (
    <WrapperDiv>
      <LeftMainContainerDiv>
        <ContainerDiv>
          <ProductSvgImg src={productClicked.pic} />
          <RowDiv>
            <strong>Category:</strong>
            <em> {productClicked.type}</em>
          </RowDiv>
          <RowDiv>
            <strong>Product Name:</strong>
            <em> {productClicked.productName}</em>
          </RowDiv>
          <RowDiv>
            <strong>Seller Name:</strong>
            <em>{productClicked.sellerName}</em>
          </RowDiv>
          <RowDiv>
            <strong>Price (€/Kg):</strong>
            <em> {productClicked.price}€</em>
          </RowDiv>
          <RowDiv>
            <strong>Quantity available:</strong>
            <em>{productClicked.quantityAvailable} Kgs available</em>
          </RowDiv>
          <RowDiv>
            <em>
              These {productClicked.productName} have been bought
              {productClicked.soldNTimes} times
            </em>
          </RowDiv>
          <DescriptionDiv>
            <strong>Description:</strong>
            <em> {productClicked.description}</em>
          </DescriptionDiv>
          <RowDiv>
            <strong>This product has been rated </strong>
            <em>{productClicked.numberOfVotes} times</em>
          </RowDiv>
          <RowDiv>
            <strong>Average rating:</strong>
            <em> {productClicked.rating}</em>
          </RowDiv>
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

const RowDiv = styled.div`
  ${flexRowCenter};
  justify-content: flex-start;
`
const em = styled.p`
  margin-top: 3px;
`
