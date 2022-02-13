import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Main from '../../components/Main'
import Sidebar from '../../components/Sidebar'

const Container = styled.div`
    display: flex;
    height: 100vh;
`

const DashboardPage = () => {
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ queryLimit, setQueryLimit ] = useState(0)
    const [ nextQuery, setNextQuery ] = useState(5)
    const token = localStorage.getItem('token')
    useEffect(() => {
        setLoading(true)
       axios.get(`http://localhost:3000/raw?limit=${queryLimit}&next=${nextQuery}`, {
            headers: {
                'Authorization': `bearer ${token}` 
              }
        }).then((response: any) => {
            console.log(response);
            setData(response.data.result)
            setQueryLimit(response.data.prev)
            setNextQuery(response.data.next)
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            setQueryLimit(0)
            setNextQuery(0)
            console.log(err);
            
        })
        
    }, [])

    // due to the unpredicatable nature of the API, we handle pagination in the
    const next = () => {
        setData(data.slice(nextQuery, nextQuery + 5))
            setNextQuery(nextQuery + 5)
        axios.get(`http://localhost:3000/raw?limit=${queryLimit}&next=${nextQuery}`, {
            headers: {
                'Authorization': `bearer ${token}` 
              }
        }).then((response: any) => {
            console.log(response);
            setData(response.data.result)
            setQueryLimit(response.data.prev)
            setNextQuery(response.data.next)
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            setQueryLimit(0)
            setNextQuery(0)
            console.log(err);

        })
    }

    const previous = () => {
        alert('yes')
        axios.get(`http://localhost:3000/raw?limit=${queryLimit}&next=${nextQuery}`, {
            headers: {
                'Authorization': `bearer ${token}` 
              }
        }).then((response: any) => {
            console.log(response);
            setData(response.data.result)
            setQueryLimit(response.data.prev)
            setNextQuery(response.data.next)
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            setQueryLimit(0)
            setNextQuery(0)
            console.log(err);

        })
    }
    return (
        <Container>
            <Sidebar />
            <Main loading={loading} data={data} previous={previous} next={next}  />
        </Container>
    )
}

export default DashboardPage
