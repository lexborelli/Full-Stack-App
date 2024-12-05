import { useContext, useEffect } from 'react'; 
import UserContext from '../context/UserContext';
import { Navigate } from 'react-router-dom';

//retrieveing the signout function from actions property in userContext
// UserSignout will call the signOut function once it's rendered, passed useEffect() an arrow function that calls actions.signOut
// Lastly, the UserSignOut will navigate the user back to the root route, replace route will replace the signOut route in the history stack with the root. This will prevent a navigate loop.  

const UserSignOut = () => {
    const { actions } = useContext(UserContext); 

    useEffect(() => actions.SignOut()); 
    
    return <Navigate to="/" replace />

}

export default UserSignOut; 