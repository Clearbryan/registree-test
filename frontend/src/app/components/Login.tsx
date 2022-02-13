import React, { FC, Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Colors, Images } from '../../themes';
import styled from 'styled-components'
import OutlineKeyLogin from '@ant-design/icons/KeyOutlined';
import axios from 'axios'

interface IHeading {
    color?: string
    fontWeight?: string
    fontSize?: string
}

interface ILoading {
    src?: string
    alt?: string
}

interface IFormInput {
    name?: string
    value?: string
    placeholder?: string
    type?: string
    id?: number
    handleInputChange?: any
}

const Container = styled.div`
    display: flex;
    height: 100vh;
    position: relative;
`
const LoginForm = styled.div`
    position: absolute;
    top: 50%; right: 50%;
    transform: translate(50%,-50%);
    padding: 50px 30px;
    border-radius: 20px;
`
const FormInput = styled.input<IFormInput>`
    height: 40px;
    width: 300px;
    display: block;
    margin: 10px 5px;
`
const CustomButton = styled.button`
    background-color: ${Colors.appGreen};
    color: ${Colors.appWhite};
    width: 300px;
    height: 40px;
    border: none;
    margin: 0px 5px;
`
const CustomHeading = styled.h1<IHeading>`
    text-align: center;
    margin: auto;
    color: ${props => props.color};
    font-weight: ${props => props.fontWeight};
    font-size: ${props => props.fontSize}
`
export const LoadingGif = styled.img<ILoading>`
    height: 100px;
`
const Logo = styled.div`
    text-align: center;
`

const Login: FC = () => {
    const [ user, setUser ] = useState({ loginId: '', password: '' })
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()
    const inputTypes = [
        { id: 1, value: user.loginId, type: 'text', name: 'loginId', placeholder: 'Login ID', handleInputChange: (evt: any) => setUser({...user, loginId: evt.target.value})},
        { id: 2, value: user.password, type: 'password', name: 'password', placeholder: 'Password', handleInputChange: (evt: any) => setUser({...user, password: evt.target.value})}
    ]

    const loginUser = async (evt: any) => {
        setLoading(true)
        evt.preventDefault()
        const response: any = await axios.post('http://localhost:3000/users/login', user)
        if(response.data.success) {
            setLoading(false)
            localStorage.setItem('token', response.data.token)
            navigate('/dashboard')
        }else {
            setLoading(false)

        }
    }
    return (
        <Container>
            <LoginForm>
                {loading ? <LoadingGif src={Images.Loading} alt="Loading..." /> : 
                <Fragment>
                     <Logo>
                         <img height="100px" src={Images.Logo} alt="Logo..." />
                     </Logo>
                    <form>
                    { inputTypes.map((inputType: IFormInput) => {
                        return <FormInput value={inputType.value} onChange={evt => inputType.handleInputChange(evt)} name={inputType.name} type={inputType.type} placeholder={inputType.placeholder} key={inputType.id} />
                    }) }
                    <CustomButton onClick={(evt) => loginUser(evt)}> <OutlineKeyLogin /> Login</CustomButton>
                    </form>
                </Fragment>
                }
            </LoginForm>
        </Container>
    )
}

export default Login
