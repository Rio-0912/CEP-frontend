import React from 'react'
import Auth from '../Middleware/auth'
import BatchItem from './BatchItem'
import Navbar from './Navbar'
import BatchModal from './BatchModal'

const Batches = () => {
    return (
        <div>
            <Navbar />
            <div className="container">
                <h4><Auth /></h4>
               Batch name
               <BatchModal/>
                <BatchItem />
                  
            </div>
        </div>
    )
}

export default Batches
