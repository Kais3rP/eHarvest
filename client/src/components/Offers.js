import React from 'react';
import styled from 'styled-components';
import { flexColSpace, flexColCenter, flexRowSpace, flexRowCenter } from '../styled-components/globalStyles';
import { useSelector, useDispatch } from 'react-redux';
import PicThumbnail from './PicThumbnail.js';
import Loader from 'react-loader-spinner';

export default function () {
    const offersItems = useSelector(state => state.shop.offersItems);
    return offersItems ? offersItems.length>0 ? (
        <OffersWrapper>
            <OffersTitle>OFFERS</OffersTitle>
            <PicThumbnailContainer>
                {offersItems.map((item, i) => (<PicThumbnail key={i} item={item} />))}
            </PicThumbnailContainer>
        </OffersWrapper>) :

        (    <Loader
            type="TailSpin"
            color="black"
            height={50}
            width={50}
            timeout={6000} //6 secs
          />) : null

    
}

const OffersWrapper = styled.div`
${flexColSpace};
width:98%;
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

