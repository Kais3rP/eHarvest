import React from 'react';
import styled from 'styled-components';
import AddToCart from './AddToCart';

export default function ({ pic, id }){
    return (
        
           <ThumbnailOfferContainer>
            <OfferPic src={pic}/>
            Pic1
            <AddToCart pic={pic} id={id}/>
           </ThumbnailOfferContainer>
         )
}

const ThumbnailOfferContainer = styled.div`
display:flex;
flex-direction:column;
justify-content: center;
align-items: center;
width:35%;
min-width:100px;
text-align:center;
border: 1px solid red;
margin:5px;
`
const OfferPic = styled.img`

width:98%;


`