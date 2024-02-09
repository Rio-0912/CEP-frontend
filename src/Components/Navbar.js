import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Auth from '../Middleware/auth'

const Navbar = () => {
    let navigate = useNavigate()
    const logout = () => {
        // localStorage.removeItem('userId')
        // localStorage.removeItem('authority')
        // localStorage.removeItem('departmentId')
        localStorage.clear()
        navigate('/')

    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><Auth/></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/home">Departments</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Link</Link>
                            </li>
                        </ul>


                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <button className="btn btn-outline-success mx-2" onClick={logout}>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
