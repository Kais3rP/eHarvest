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
    <ProductPicSVG src={productClicked.pic}></ProductPicSVG>
    <div>Type: {productClicked.type}</div>
    <div>Name: {productClicked.productName}</div>
    <div>This is sold by: {productClicked.sellerName}</div>
    <div>Price per Kg: {productClicked.price}€</div>
    <div>Actually there are still {productClicked.quantityAvailable} Kgs available</div>
    <div>These {productClicked.productName} have been bought: {productClicked.soldNTimes} times</div>
    <DescriptionDiv>Description: {productClicked.description}</DescriptionDiv>
    <div>This item has been rated {productClicked.numberOfVotes} times</div>
    <div>Average rating of the product: {productClicked.rating}</div>
    <div>Real picture of the product:</div>
    <ProductPic src={`data:image/png;base64,${productClicked.realPicture}`}></ProductPic>
    
    </WrapperDiv>)
}

const WrapperDiv = styled.div`
${flexColCenter};
margin-top:500px;
`

const DescriptionDiv = styled.div`
width:30%;
background:red;
overflow:auto;
`
const ProductPic = styled.img`

`
const ProductPicSVG = styled.img`
width:10%;
`