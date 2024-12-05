import {useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../context/UserContext"
import axios from 'axios';

const UserSignUp = () => {
    const { actions } = useContext(UserContext);
    const navigate = useNavigate(); 

    const [firstName, setFristName] = useState(); 
    const [lastName, setLastName] = useState(); 
    const [password, setPassword] = useState();
    const [emailAddress, setEmailAddress] = useState(); 
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            //creating user variable that contains users information object from state

            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }
        
        // to add a new user to the server, i'll send a POST request to the server. i'll send a request to the url to create the new user.
        

        try {
            const response = await axios.post('http://localhost:5000/api/courses/user', user);
            // check if the response status code is 201, then log a message to console to verify it is sucessful in creating new user
            if (response.status === 201) {
                console.log(`${user.firstName} is successfully signed up and authenticated!`);
                
                // else if the response code returns a 400 status, i'll store the api responds in a variable called data
                //i'll parse the data to JSON, while waiting for the promise to be fulfilled and store the errors in our error state 
            } else if (response.status === 400) {
                setErrors(errors.response.data.errors);

                // to catch a status response that does not have 201 or 400, ill add an else statment that throws an error
            } else {
                throw new Error();
            }
            //catch will log the error to the console, then navigate the user to the error route
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    }

    //navigate user back to root route which is home
    const handleCancel = (e) => {
        e.preventDefault();
        navigate("/");
    };

    <main>
        <div className="form--centered">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" value={firstName} onChange={ (e) => setFristName(e.target.value)} />
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" value={lastName} onChange={ (e) => setLastName(e.target.value)} />
                <label htmlFor="emailAddress">Email Address</label>
                <input
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="button" type="submit">
                    Sign Up
                </button>
                <button
                    className="button button-secondary"
                    onclick={handleCancel}
                >
                    Cancel
                </button>
            </form>
            <p>
                Already have a user account? Click here to{" "}
                <Link to="/signin">sign in</Link>!
            </p>
        </div>
    </main>
}

export default UserSignUp; 