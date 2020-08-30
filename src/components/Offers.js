import React from 'react';
import styled from 'styled-components';
import pic from '../logo.svg';
import PicThumbnail from './PicThumbnail.js';
const id = [1,2,3,4,5] //IDs and pics have to be organized in objects

export default function (){
    return (
        <OffersWrapper>
        <OffersTitle>OFFERS</OffersTitle>
    <PicThumbnailContainer>
    { id.map( (id,i) => (<PicThumbnail key={i} pic={pic} id={id}/>))}
    </PicThumbnailContainer>
         
        </OffersWrapper>
       
    )
}

const OffersWrapper = styled.div`
display:flex;
flex-direction:column;
justify-content: center;
align-items: center;
width:70%;
background:aqua;
text-align:center;
`

 const OffersTitle = styled.div`
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
`

