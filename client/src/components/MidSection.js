import React from 'react';
import styled from 'styled-components';
import Offers from './Offers';
import ProductsPreview from './ProductsPreview';

export default function () {
    return (
        <MidSectionWrapper>
            <Offers />
            <ProductsPreview />
        </MidSectionWrapper>

    )
}

const MidSectionWrapper = styled.div`
display:flex;
flex-direction:column;
justify-content: center;
align-items: center;
width:100%;
height:40%;
background:white;
text-align:center;
margin-top:10%;
`

