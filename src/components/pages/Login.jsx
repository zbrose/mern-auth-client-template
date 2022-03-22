import {useState} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

function Login({currentUser, setCurrentUser}) {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [msg, setMsg] = useState('')
    const handleFormSubmit = async e => {
        e.preventDefault()
        try {
            //post to backend with form data to login
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, form)
            //decode the token that is sent to us
            const {token} = response.data 
            const decoded = jwt_decode(token)
            //save token in local storage
            localStorage.setItem('jwt', token)
            //set the app state to the logged in user
            setCurrentUser(decoded)
        } catch (err) {
            if(err.response.status===400){
                console.log(err.response.data)
                setMsg(err.response.data.message)
            }
            console.log(err)
        }
    }
   
    //navigate to the user profile if user is not null
    if(currentUser) return <Navigate to='/profile' />
    return ( 
        <div>
            <h3>Login form</h3>
            <p>{msg ? `the server has a message for you: ${msg}` :''}</p>
            <form onSubmit={handleFormSubmit}>

                <label htmlFor="email">Email:</label>
                <input type="text"
                 id='email'
                 placeholder='user@domain.com'
                 onChange={e => setForm({...form, email: e.target.value})}
                 value={form.email}
                />

                <label htmlFor='password'>Password:</label>
                <input type="password"
                 id='password'
                 placeholder='password'
                 onChange={e => setForm({...form, password: e.target.value})}
                 value={form.password}
                />

                <input type="submit" />

            </form>
        </div>
     )
}

export default Login;