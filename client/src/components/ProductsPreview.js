
import React from 'react';
import styled from 'styled-components';
import pic from '../logo.svg';
import PicThumbnail from './PicThumbnail.js';
import { useSelector, useDispatch } from 'react-redux';


export default function (){
  const mostSold = useSelector( state => state.shop.mostSoldItems )
    return (
      <ProductsPreviewWrapper>
      <ProductsLeft>
      <ProductsTitle>MOST VIEWED</ProductsTitle>
      <PicThumbnailContainer> { mostSold.map( (item,i) => (<PicThumbnail key={i} item={item} />))}</PicThumbnailContainer>
      
           </ProductsLeft>
           <ProductsRight>
           <ProductsTitle>MOST BOUGHT</ProductsTitle>
           <PicThumbnailContainer> { mostSold.map( (item,i) => (<PicThumbnail key={i} item={item} />))}</PicThumbnailContainer>
           </ProductsRight>
      </ProductsPreviewWrapper>
       
    )
}




const ProductsPreviewWrapper = styled.div`
display:flex;
justify-content: center;
align-items: flex-start;
width:100%;
background:lavender;
text-align:center;

`
const ProductsLeft = styled.div`
display:flex;
justify-content: center;
align-items: center;
flex-direction:column;
width:50%;
background:violet;
text-align:center;



`

const ProductsRight = styled.div`
display:flex;
justify-content: center;
align-items: center;
flex-direction:column;
width:50%;
background:blue;
text-align:center;


`

const ProductsTitle = styled.div`
width:100%;
height:10%;
background:grey;

`
const PicThumbnailContainer = styled.div`

width:100%;
height:90%;
display:flex;
justify-content: center;
align-items: center;
flex-wrap:wrap;
`