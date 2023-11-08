import React from 'react'

const SentCmdError = ({error, show, handle})  =>{ 
   
    return( 
        <div >
            <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{display:(show?'block':'none')}}>
                <h5 className="alert-heading mb-1"> <i className="fas fa-exclamation-triangle" style={{marginRight:'6px'}}></i>
                    Erro enviando comando!
                </h5>                       
                <div className="row" style={{height:'25px'}}>
                    <label className="col-1 col-form-label fw-bold">Código:</label>
                    <div className="col-10">
                        <input type="text" readOnly className="form-control-plaintext" value={error.code} disabled></input>
                    </div>
                </div>   
                <div className="row" style={{height:'25px'}}>
                    <label className="col-1 col-form-label fw-bold" >Fonte:</label>
                    <div className="col-10">
                        <input type="text" readOnly className="form-control-plaintext" value={error.source} disabled></input>
                    </div>
                </div> 
                <button type="button" className="btn-close" onClick={() => handle()} aria-label="Close"></button>
            </div>
        </div> 
    ) 
}

export default SentCmdError