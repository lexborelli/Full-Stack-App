import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
    //variables to gold course data, useNavigate() to navigate, used useParams() to return the course id from the url user has clicked on
    const [course, setCourse] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
                //set success
                setCourse(response.data);
            } catch(error) {
                //handle error
                console.log("Error fetching and parsing course data",error);
            }
        }; 
        // fetch the course detail data from id 
        if (id) {
            fetchCourse();
        } else {
            console.log("Error fetching and parsing course data");
        }
    }, [id]);

    return (
        <>
            <main>
                <div className="actions--bar">
                    <div className="wrap">
                        <Link className="button" to={`/courses/${id}/update`}>
                            Update Course
                        </Link>
                        <a className="button" href="#">
                            Delete Course
                        </a>
                        <Link className="button button-secondary" to="/">
                            Return to List
                        </Link>
                    </div>
                </div>

                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{course.title}</h4>
                                <p>
                                    By {" "}
                                    {course.user 
                                    ? `${course.user.firstName} ${course.user.lastName}`
                                    : "Author Not Found"
                                    }         
                                </p>
                                <p>
                                   {course.description}
                                </p>
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{course.estimatedTime}</p>
                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ul className="course--detail--list">
                                   {course.materialsNeeded}
                                </ul>
                            </div>
                        </div>
                    </form>
             </div>
            </main>
        </>
    )
};

export default CourseDetail;