import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import Register from './components/pages/Register';
import Welcome from './components/pages/Welcome';
import Navbar from './components/layout/Navbar';
import {useState, useEffect} from 'react'
import jwt_decode from 'jwt-decode'


function App() {
  //state with the user data when the user is logged in
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(()=>{
    const token = localStorage.getItem('jwt')
    if(token){
      setCurrentUser(jwt_decode(token))
    } else setCurrentUser(null)
  },[])

  //useEffect that handles the local storage if user navs away from the page
  const handleLogout = () => {
    if (localStorage.getItem('jwt')) localStorage.removeItem('jwt')
    setCurrentUser(null)
  }
  // logout handler function that deletes a token from the localstorage

  return (
    <Router>
      <Navbar currentUser={currentUser} handleLogout={handleLogout} />
      <div className="App">
        <Routes>
          <Route
           path='/'
           element={<Welcome />} 
          />
          <Route
           path='/login'
           element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} 
          />
          <Route
           path='/register'
           element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} />} 
          />
          <Route
           path='/profile'
           element={currentUser ? <Profile currentUser={currentUser }/>:<Navigate to='/login'/>} 
          />


        </Routes>
      </div>
    </Router>
  )
}

export default App;
