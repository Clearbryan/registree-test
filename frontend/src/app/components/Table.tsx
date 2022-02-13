import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { Thead, Tr, Th, Tbody, Td, Table } from '@chakra-ui/react'
import { Colors } from '../../themes'
import { IStudent } from './Main'

const Container = styled.div`
    margin: 30px auto;
    width: 90%;
    border-radius: 3px;
`

const Pagination = styled.div`
    text-align: right;
    margin: 5px 5px;
`
const PaginatorButton = styled.button`
    height: 40px;
    padding: 4px;
    magrgin-top: 20px;
    margin-botton: 20px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: ${Colors.appGreen};
    color: ${Colors.appWhite};
    border-radius: 50%;
`

export const TableData: FC<any> = ({data, next, previous}) => {
    return (
        <Container>
             <Table variant='striped' colorScheme='whatsapp'>
        <Thead>
            <Tr>
                <Th></Th>
                <Th>Student ID</Th>
                <Th>Student Name</Th>
                <Th>Student Mark</Th>
                <Th>University</Th>
            </Tr>
        </Thead>
        <Tbody>
            {data.map((el: IStudent) => {
                return (
                <Tr key={el.name}>
                    <Td>√</Td>
                    <Td>{el.student_id}</Td>
                    <Td>{el.name}</Td>
                    <Td>{el.mark}</Td>
                    <Td>{el.university}</Td>
                </Tr>
                )
            })}
        </Tbody>
    </Table>
    <Pagination>
        <PaginatorButton title="Previous" onClick={previous}>Prev</PaginatorButton>
        <PaginatorButton title="Next" onClick={next}>Next</PaginatorButton>
    </Pagination>
        </Container>
   
    )

}

export default TableData