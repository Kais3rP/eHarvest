import React from 'react';
import styled from 'styled-components';
import pic from '../logo.svg';
import PicThumbnail from './PicThumbnail.js';
const id = [1,2,3,4,5] //IDs and pics have to be organized in objects

export default function (){
    return (
        <OffersWrapper>
         { id.map( (id,i) => (<PicThumbnail key={i} pic={pic} id={id}/>))}
        </OffersWrapper>
       
    )
}

const OffersWrapper = styled.div`
display:flex;
justify-content: center;
align-items: center;
width:90%;
background:aqua;
text-align:center;
`



