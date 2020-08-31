
import React from 'react';
import styled from 'styled-components';
import { flexColSpace, flexColCenter, flexRowSpace, flexRowCenter } from '../styled-components/globalStyles';
import PicThumbnail from './PicThumbnail.js';
import { useSelector, useDispatch } from 'react-redux';


export default function () {
  const mostSold = useSelector(state => state.shop.mostSoldItems)
  return (
    <ProductsPreviewWrapper>
      <ProductsLeft>
        <ProductsTitle>MOST SOLD</ProductsTitle>
        <PicThumbnailContainer> {mostSold.map((item, i) => (<PicThumbnail key={i} item={item} />))}</PicThumbnailContainer>
      </ProductsLeft>
      <ProductsRight>
        <ProductsTitle>MOST BOUGHT</ProductsTitle>
        <PicThumbnailContainer> {mostSold.map((item, i) => (<PicThumbnail key={i} item={item} />))}</PicThumbnailContainer>
      </ProductsRight>
    </ProductsPreviewWrapper>

  )
}




const ProductsPreviewWrapper = styled.div`
${flexRowCenter};
align-items: flex-start;
width:100%;
background:lavender;
text-align:center;

`
const ProductsLeft = styled.div`
${flexColCenter};
width:50%;
background:violet;
text-align:center;



`

const ProductsRight = styled.div`
${flexColCenter};
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
${flexRowCenter};
width:100%;
height:90%;
flex-wrap:wrap;
`