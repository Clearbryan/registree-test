import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../themes'


const Container = styled.div`
    display: flex;
    width: 15vw;
    height: 100%;
    border-right: 1px solid ${Colors.appGreen};
    background
`

const Sidebar = () => {
    return (
        <Container>
            Sidebar
        </Container>
    )
}

export default Sidebar
