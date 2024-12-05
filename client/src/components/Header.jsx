import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";

const Header = () => {

    const { authUser } = useContext(UserContext); 

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                    <Link to="/">Courses</Link>
                </h1>
                    <nav>
                        {authUser === null ? 
                            <>
                                <li>
                                    <Link to="/signup">Sign Up</Link>
                                </li>
                                <li>
                                    <Link to="/signin">Sign In</Link>
                                </li>
                            </>
                            
                            :
                            <>

                                <li>
                                    <h1>Welcome, {authUser.firstName}!</h1>
                                </li>
                                <li>
                                    <Link to="Sign-out">Sign Out</Link>
                                </li>
                            </>
                        }    
                    </nav>
            </div>
        </header>    
    )
};

export default Header; 