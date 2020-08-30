import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import PicThumbnail from './PicThumbnail.js';


export default function () {
    const offersItems = useSelector(state => state.shop.offersItems);
    //console.log(offersItems)
    return (
        <OffersWrapper>
            <OffersTitle>OFFERS</OffersTitle>
            <PicThumbnailContainer>
                {offersItems.map((item, i) => (<PicThumbnail key={i} item={item} />))}
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
height:400px;
background:aqua;
text-align:center;
`

const OffersTitle = styled.div`
 width:100%;
 height:20%;
 background:grey;
 
 `
const PicThumbnailContainer = styled.div`

width:100%;
height:80%;
display:flex;
justify-content: center;
align-items: center;
`

