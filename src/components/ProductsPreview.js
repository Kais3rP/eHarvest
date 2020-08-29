
import React from 'react';
import styled from 'styled-components';
import pic from '../logo.svg';
import PicThumbnail from './PicThumbnail.js';
const idLeft = [1,2,3,4,5,6,7,8] //IDs and pics have to be organized in objects
const idRight = [1,2,3,4,5] //IDs and pics have to be organized in objects

export default function (){
    return (
      <ProductsPreviewWrapper>
      <ProductsLeft>
      { idLeft.map( (id,i) => (<PicThumbnail key={i} pic={pic} id={id}/>))}
           </ProductsLeft>
           <ProductsRight>
           { idRight.map( (id,i) => (<PicThumbnail key={i} pic={pic} id={id}/>))}
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
width:50%;
background:violet;
text-align:center;
flex-wrap:wrap;


`

const ProductsRight = styled.div`
display:flex;
justify-content: center;
align-items: center;
width:50%;
background:blue;
text-align:center;
flex-wrap:wrap;

`