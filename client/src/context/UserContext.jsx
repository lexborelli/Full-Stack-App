import { createContext, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types"; 

export const UserContext = createContext(); 

// provide user's data to multiple componenets throughout the app
export const UserProvider = ({ children }) => {
    
    const [authUser, setAuthUser] = useState(null);

    const signIn = async (credentials) => {

        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

        const fetchOption = {
            method: "GET",
            headers: {
                Authorization: `Basic ${encodedCredentials}`,
            },
        };

        const response = await axios.get('http://localhost:5000/api/users', fetchOption);
            
            //if status code is 200, then the user was authenticated and the response will contain the user's data and parse it into json,
            // set authUser state equal to the user's data, lastly, the user will be returned
            // if server responds with a 401, then the server could not authenticate the user, null will be returned
            if (response.status === 200) {
                const user = await response.json(); 
                setAuthUser(user); 
                return user; 
                } else if (response.status === 401) {
                    return null; 
                } else {
                throw new Error();
            }
    }

    // set authUser to null
    const signOut = () => {
        setAuthUser(null);
    }


    
    // provided signIn function and authUser state to UserContext, data passes to value prop can be accessible to any component in the app. 
    // {children} is what allows the app component along w/ all of apps children to be passed into UserProvider and render.

    return (
        <UserContext.Provider 
            value ={{
                authUser, 
                actions: {
                    signIn,
                    signOut 

                },
            }}
        >
         {children}
        </UserContext.Provider>
    );


}

    //validate the children of UserProvider
    UserProvider.propTypes = {
        children: PropTypes.node.isRequired,
    }; 

export default UserContext; 