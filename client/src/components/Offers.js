import React from 'react';
import styled from 'styled-components';
import { flexColSpace, flexColCenter, flexRowSpace, flexRowCenter } from '../styled-components/globalStyles';
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
${flexColSpace};
width:70%;
height:400px;
text-align:center;
`

const OffersTitle = styled.div`
 width:100%;
 height:20%;
 
 `
const PicThumbnailContainer = styled.div`
${flexRowSpace};
width:100%;
height:80%;

`

