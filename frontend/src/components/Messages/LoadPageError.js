import React from 'react'

const LoadPageError = props =>{ 
   
    return( 
        <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading mb-3"> <i className="fas fa-exclamation-triangle" style={{marginRight:'6px'}}></i>
                Erro carregando a página!
            </h4>
            <div className="row" style={{height:'25px'}}>
                <label className="col-1 col-form-label fw-bold">Código:</label>
                <div className="col-10">
                    <input type="text" readOnly className="form-control-plaintext" value={props.error.code} disabled></input>
                </div>
            </div>   
            <div className="row" style={{height:'25px'}}>
                <label className="col-1 col-form-label fw-bold" >Fonte:</label>
                <div className="col-10">
                    <input type="text" readOnly className="form-control-plaintext" value={props.error.source} disabled></input>
                </div>
            </div>                
       </div>
    ) 
}

export default LoadPageError