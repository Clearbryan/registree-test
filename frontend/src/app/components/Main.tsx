import React, { FC } from 'react'
import styled from 'styled-components'
import { Images } from '../../themes'
import { LoadingGif } from './Login'
import TableData from './Table'

interface IMain {
    loading?: boolean
    data: Array<IStudent>
    next?: any
    previous?: any
    disableNext?: boolean
}

export interface IStudent {
    name: string
    student_id: string
    university: string
    mark: number
}

const Container = styled.div`
    width: 85vw;
    height: 100vh;
    marign: 30px auto;
`

const Main: FC<IMain> = ({loading, data, next, previous, disableNext}) => {
    return (
        <Container>
            { loading ? <LoadingGif src={Images.Loading} /> : <TableData previous={previous} next={next}  data={data} disableNext={disableNext} />}
        </Container>
    )
}

export default Main
