import React from 'react'
import { Link } from 'react-router-dom'

const CourseItem = () => {
    return (
        <div>
            <div className='row my-3 grid-col ' >


                <div className=' col-md-4 my-2'>
                    <div className='card'>
                        <div className='card-body '>
                            <h5 className='card-title mb-5 mt-2'>Course name</h5>


                             <Link to='/' className='btn mx-2 btn-outline-dark'>
                            <i className='fa-solid fa-trash'></i>
                        </Link>
                            <Link to='/batch' className='btn mx-2 btn-outline-dark position-absolute  '  >
                               View <i className="fa-solid fa-arrow-right"></i>
                            </Link>

                        </div>
                    </div>
                </div>
                <div className=' col-md-4 my-2'>
                    <div className='card'>
                        <div className='card-body '>
                            <h5 className='card-title mb-5 mt-2'>Course name</h5>


                             <Link to='/' className='btn mx-2 btn-outline-dark'>
                            <i className='fa-solid fa-trash'></i>
                        </Link>
                            <Link to='/batch' className='btn mx-2 btn-outline-dark position-absolute  '  >
                               View <i className="fa-solid fa-arrow-right"></i>
                            </Link>

                        </div>
                    </div>
                </div>
                <div className=' col-md-4 my-2'>
                    <div className='card'>
                        <div className='card-body ' >
                            <h5 className='card-title mb-5 mt-2 mb-5 mt-2' >Course name</h5>


                             <Link to='/' className='btn mx-2 btn-outline-dark'>
                            <i className='fa-solid fa-trash'></i>
                        </Link>
                            <Link to='/batch' className='btn mx-2 btn-outline-dark position-absolute  '  >
                               View <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                            <div > 
                            
                            </div>

                        </div>
                    </div>
                </div>
                <div className=' col-md-4 my-2'>
                    <div className='card'>
                        <div className='card-body '>
                            <h5 className='card-title mb-5 mt-2'>Course name</h5>


                             <Link to='/' className='btn mx-2 btn-outline-dark'>
                            <i className='fa-solid fa-trash'></i>
                        </Link>
                            <Link to='/batch' className='btn mx-2 btn-outline-dark position-absolute  '  >
                               View <i className="fa-solid fa-arrow-right"></i>
                            </Link>

                        </div>
                    </div>
                </div>
                <div className=' col-md-4 my-2'>
                    <div className='card'>
                        <div className='card-body '>
                            <h5 className='card-title mb-5 mt-2'>Course name</h5>


                             <Link to='/' className='btn mx-2 btn-outline-dark'>
                            <i className='fa-solid fa-trash'></i>
                        </Link>
                            <Link to='/batch' className='btn mx-2 btn-outline-dark position-absolute  '  >
                               View <i className="fa-solid fa-arrow-right"></i>
                            </Link>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CourseItem
