
import React from 'react';
import styled from 'styled-components';
import pic from '../logo.svg';
import PicThumbnail from './PicThumbnail.js';
const idLeft = [1,2,3,4,5,6,7,8] //IDs and pics have to be organized in objects and fetched
const idRight = [1,2,3,4,5] //IDs and pics have to be organized in objects and fetched

export default function (){
    return (
      <ProductsPreviewWrapper>
      <ProductsLeft>
      <ProductsTitle>MOST VIEWED</ProductsTitle>
      <PicThumbnailContainer> { idLeft.map( (id,i) => (<PicThumbnail key={i} pic={pic} id={id}/>))}</PicThumbnailContainer>
      
           </ProductsLeft>
           <ProductsRight>
           <ProductsTitle>MOST BOUGHT</ProductsTitle>
           <PicThumbnailContainer> { idRight.map( (id,i) => (<PicThumbnail key={i} pic={pic} id={id}/>))}</PicThumbnailContainer>
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