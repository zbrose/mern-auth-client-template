import {Link} from 'react-router-dom'

function Navbar({handleLogout, currentUser}) {
    const loggedIn = (
        <>
         <Link to='/'><span onClick={handleLogout}>Log out</span></Link>
         <Link to='/profile'>Profile</Link>

        </>
    )

    const loggedOut = (
        <>
         <Link to='/register'>Register</Link>
         <Link to='/login'>Login</Link>
        </>
    )
    return ( 
        <nav>

         <Link to='/'>User App</Link>
            {currentUser ? loggedIn : loggedOut}
        </nav>
     );
}

export default Navbar;