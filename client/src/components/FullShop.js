import React, { useEffect } from 'react';
import styled from 'styled-components';
import { flexColSpace, flexColCenter, flexRowSpace, flexRowCenter } from '../styled-components/globalStyles';
import { useSelector, useDispatch } from 'react-redux';
import PicThumbnail from './PicThumbnail.js';
import Loader from 'react-loader-spinner';

export default function () {
    const vegetables = useSelector(state => state.shop.vegetables);
    const fruit = useSelector(state => state.shop.fruit);
    const dispatch = useDispatch();
  
    return (vegetables.length > 0 && fruit.length > 0) ?

        (<FullShopWrapper>
            <PicThumbnailContainer> {vegetables.map((item, i) => (<PicThumbnail key={i} item={item} />))}</PicThumbnailContainer>
            <PicThumbnailContainer> {fruit.map((item, i) => (<PicThumbnail key={i} item={item} />))}</PicThumbnailContainer>
        </FullShopWrapper>) :

        (<FullShopWrapper>
            <Loader
                type="TailSpin"
                color="black"
                height={50}
                width={50}
                timeout={3000} //3 secs
            />
        </FullShopWrapper>)

       
    
}

const FullShopWrapper = styled.div`
${flexRowCenter};
width:100%;
margin-top:300px;
`
const PicThumbnailContainer = styled.div`
${flexRowCenter};
width:50%;
height:90%;
flex-wrap:wrap;
`