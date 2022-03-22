import {useState, useEffect} from 'react'
import axios from 'axios'


function Profile({currentUser}) {
    const [msg, setMsg] = useState('')

    useEffect(()=>{
        (async ()=>{
            try {
                const token = localStorage.getItem('jwt')
                const options = {
                    headers: {
                        'Authorization': token
                    }
                }
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, options)
                setMsg(response.data.message)
            }catch (err){
                console.log(err)
            }
        })()
    },[])

    return ( 

        <div>
         <h1>{currentUser.name}</h1>
         <p>{currentUser.email}</p>
         <h6>{msg}</h6>
        </div>


     );
}

export default Profile;