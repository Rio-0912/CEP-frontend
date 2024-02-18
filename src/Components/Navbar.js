import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../Middleware/auth';
// ... (other imports)

const Navbar = () => {
    const navigate = useNavigate();

    const logout = (e) => {
        localStorage.clear();
        window.location.reload();
        navigate('/');
    };

    let userAuthority;
    let departmentId;

    if (localStorage.getItem('authority')) {
        userAuthority = localStorage.getItem('authority');
    } else if (localStorage.getItem('departmentId')) {
        departmentId = localStorage.getItem('departmentId');
    }

    const isHomeRoute = window.location.pathname === '/home'; // Check if the current route is /course
    const isLoginRoute = window.location.pathname === '/'; // Check if the current route is /course

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <Auth />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {departmentId && !isHomeRoute && !isLoginRoute && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" to="/reports">
                                            Reports
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" to="/course">
                                            Course
                                        </Link>
                                    </li>
                                </>
                            )}
                            {userAuthority === 'Principal' && (
                                <>

                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" to="/home">
                                            Departments
                                        </Link>
                                    </li>
                                </>
                            )}
                            {userAuthority === 'Principal' && !isHomeRoute && !isLoginRoute && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" to="/reports">
                                            Reports
                                        </Link>
                                    </li>

                                </>
                            )}

                            { !isHomeRoute && !isLoginRoute && (
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/addStudent">
                                        Add Students
                                    </Link>
                                </li>
                            )}
                        </ul>

                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>
                        <button className="btn btn-outline-success mx-2" onClick={logout}>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
