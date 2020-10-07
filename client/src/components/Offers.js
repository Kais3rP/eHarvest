import React from 'react';
import styled from 'styled-components';
import { flexColSpace, flexColCenter, flexRowSpace, flexRowCenter } from '../styled-components/globalStyles';
import { useSelector, useDispatch } from 'react-redux';
import PicThumbnail from './PicThumbnail.js';


export default function ({offersItems}) {
    
    return (
    <OffersWrapper>
            <OffersTitle>OFFERS</OffersTitle>
            <PicThumbnailContainer>
                {offersItems.map((item, i) => (<PicThumbnail key={i} item={item} idx={i} />))}
            </PicThumbnailContainer>
        </OffersWrapper> 
    )
}

const OffersWrapper = styled.div`
${flexColSpace};
width:98%;
text-align:center;

`

const OffersTitle = styled.div`
 width:100%;
 height:20%;
 
 `
const PicThumbnailContainer = styled.div`
${flexRowCenter};
width:100%;
height:80%;
flex-wrap:wrap;

`

