import {useState} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

function Register({setCurrentUser, currentUser}) {
    const [form, setForm] = useState({
        name:'',
        email: '',
        password: '',
        passwordConfirmation: ''
    })
    const [msg, setMsg] = useState('')

    const handleFormSubmit = async e => {
        e.preventDefault()
        try {
            if (form.password === form.passwordConfirmation){
                //remove unneeded data in the form
                delete form.passwordConfirmation
                //post to backend with form data to login
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, form)
                //decode the token that is sent to us
                const {token} = response.data 
                const decoded = jwt_decode(token)
                //save token in local storage
                localStorage.setItem('jwt', token)
                //set the app state to the logged in user
                
                setCurrentUser(decoded)
                
            } else {
                setMsg('the two passwords you enterd do not match')
            }
        } catch (err) {
            if(err.response.status===409){
                setMsg(err.response.data.message)
            }
            console.log(err)
        }
    }

    if(currentUser) return <Navigate to='/profile' />
    return ( 
        <div>

            <h1>Register: </h1>
            <p>{msg ? `entered info not valid ${msg}` :''}</p>
            <form onSubmit={handleFormSubmit}>

            <label htmlFor='name'>name:</label>
            <input type="text"
             id='name'
             placeholder='name'
             onChange={e => setForm({...form, name: e.target.value})}
             value={form.name}
            
            />

            <label htmlFor="email">Email:</label>
            <input type="email"
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
            <label htmlFor='passwordConfirmation'>Confirmation:</label>
            <input type="passwordConfirmation"
             id='password'
             placeholder='passwordConfirmation'
             onChange={e => setForm({...form, passwordConfirmation: e.target.value})}
             value={form.passwordConfirmation}
            
            />

            <input type="submit" />

        </form>
        </div>
     );
}

export default Register;