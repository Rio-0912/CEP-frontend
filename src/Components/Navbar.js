import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">WebSiteName</Link>

                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <sapn className="icon-bar"></sapn>
                        </button>
                    </div>
                    <ul className="nav navbar-nav navbar-right collapse navbar-collapse">
                        <li className="active"><Link to="/">Home</Link></li>
                        <li><Link to="/">Page 1</Link></li>
                        <li><Link to="/">Page 2</Link></li>
                        <li><Link to="/">Page 3</Link></li>
                    </ul>
                </div>
            </nav>

            <div className="container">
                <h3>Basic Navbar Example</h3>
                <p>A navigation bar is a navigation header that is placed at the top of the page.</p>
            </div>
        </div>
    )
}

export default Navbar
