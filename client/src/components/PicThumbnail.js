import React from 'react';
import styled from 'styled-components';
import AddToCart from './AddToCart';
import convertIdNames from '../helpers/convertIdNames';
import Loader from 'react-loader-spinner'

export default function ({ item }){
  console.log(item)
  let mimeType = "image/png";
  
    return (
         item ?
           (<ThumbnailOfferContainer>
            <OfferPic src={`data:${mimeType};base64,${item.pic}`}/>
            {convertIdNames(item)}
            <AddToCart item={item}/>
           </ThumbnailOfferContainer>) 
           :
           <Loader
           type="TailSpin"
           color="#00BFFF"
           height={30}
           width={30}
           timeout={3000} //3 secs
   
        />
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