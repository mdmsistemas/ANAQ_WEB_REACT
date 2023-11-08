import React from 'react'

const LoadingSpinner = () =>{ 
   
    return( 
        <div className="col d-flex justify-content-center m-5">             
            <div className="card"  style={{width:'8rem'}}>
                <div className="card-body text-center bg-light">
                    <div className="spinner-border text-primary mb-2" style={{width:'3rem', height:'3rem'}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>                       
                    <h5>Loading...</h5>
                </div>                                        
            </div>
        </div>
    ) 
}

export default LoadingSpinner