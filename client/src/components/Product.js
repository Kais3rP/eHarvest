import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rateProduct } from '../slices/shopSlice'
import styled from 'styled-components';
import { flexColSpace, flexColCenter, flexRowCenter, Header1, Header2, Header3, Header5 } from '../styled-components/globalStyles';
import { Link } from "react-router-dom";


export default function () {
  const productClicked = useSelector(state=> state.shop.productClicked);
  const dispatch = useDispatch();
  const [] = useState(false);
  const [] = useState(false);
  const [] = useState('');
  console.log(productClicked)
  return (
    <WrapperDiv>
    <LeftMainContainerDiv>
    <ProductSvgImg src={productClicked.pic}></ProductSvgImg>
    <div><Header2>Category:</Header2> {productClicked.type}</div>
    <div><Header2>Product Name:</Header2> {productClicked.productName}</div>
    <div><Header2>Seller Name:</Header2> {productClicked.sellerName}</div>
    <div><Header2>Price (€/Kg):</Header2> {productClicked.price}€</div>
    <div><Header2>Quantity available:</Header2> {productClicked.quantityAvailable} Kgs available</div>
    <div>These {productClicked.productName} have been bought {productClicked.soldNTimes} times</div>
    <DescriptionDiv>
    <Header2>Description:</Header2> {productClicked.description}
    </DescriptionDiv>
    <div><Header2>This product has been rated </Header2> {productClicked.numberOfVotes} times</div>
    <div><Header2>Average rating:</Header2> {productClicked.rating}</div>
    </LeftMainContainerDiv>
    <RightMainContainerDiv>
    <PicturesContainerDiv>
    <ProductPicImg src={`data:image/png;base64,${productClicked.realPicture}`}></ProductPicImg>
    <ProductPicImg src={`data:image/png;base64,${productClicked.realPicture}`}></ProductPicImg>
    <ProductPicImg src={`data:image/png;base64,${productClicked.realPicture}`}></ProductPicImg>
    <ProductPicImg src={`data:image/png;base64,${productClicked.realPicture}`}></ProductPicImg>
    <ProductPicImg src={`data:image/png;base64,${productClicked.realPicture}`}></ProductPicImg>
    </PicturesContainerDiv>
   
    </RightMainContainerDiv>
    </WrapperDiv>)
}

const WrapperDiv = styled.div`
${flexRowCenter};
margin-top:250px;
width:100%;
align-items:flex-start;
`
const LeftMainContainerDiv = styled.div`
width:48%;
`

const RightMainContainerDiv = styled.div`
width:48%;
`

const PicturesContainerDiv = styled.div`
width:100%;
`

const DescriptionDiv = styled.div`
width:30%;
overflow:auto;
`
const ProductPicImg = styled.img`
width: 48%;
margin:5px;
`
const ProductSvgImg = styled.img`
width:15%;
`