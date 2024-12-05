import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";


const UserSignIn = () => {
    const navigate = useNavigate();
    const { actions } = useContext(UserContext); 
    const [emailAddress, setEmailAddress] = useState(); 
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState([]);

    //Event Handlers
    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = {
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }; 

        try {
            //Get user from UserContext
            //Success (user !== null) -> console.log the user that has signed in and navigate to root route 
            //if sign in failed (user === null) -> update errors state
            const user = await actions.signIn(credentials);
            if (user) {
                console.log("This user has signed in:", user);
                navigate("/");
            } else {
                setErrors(["Sign in was unsuccessful!"]);
            }
        } catch (error) {
            console.log(error); 
            navigate("/error");
        }
    }


    const HandleCancel = (e) => {
        e.preventDefault(); 
        navigate("/");
    };
    
    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}> 
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
                        Sign In
                    </button>
                    <button
                        className="button button-secondary"
                        onClick={HandleCancel}
                    >
                        Cancel
                    </button>
                </form>
                <p>
                    Do you have a user account? No? Then click here to{" "}
                    <Link to="/signup">sign up</Link>!
                </p>
            </div>
        </main>
    )
} 

export default UserSignIn; 