import React from 'react'
import Logo from '../../maxfy-logo.png'
import { Container } from './styles'

export default function Header () {
    return (
        <Container>
            <img src={Logo} alt="logo"/>
        </Container>
    );
}