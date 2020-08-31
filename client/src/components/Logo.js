import React from 'react';
import styled from 'styled-components';
import logo from '../img/logo512.png';

export default function () {
    return (
        <LogoContainer>
            <Logo src={logo} />
        </LogoContainer>
    
    )
}

const LogoContainer = styled.div`

`
const Logo = styled.img`
height:190px;
`