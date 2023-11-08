import React from 'react'

const SentCmdSucess = ({show, handle})  =>{ 
   
    return( 
        <div> 
            <div className="alert alert-success alert-dismissible fade show" role="alert" style={{display:(show?'block':'none')}}>
            <strong><i className="fas fa-check-circle" style={{marginRight:'6px'}}></i>
                Comando enviado com sucesso
            </strong> 
            <button type="button" className="btn-close" onClick={() => handle()} aria-label="Close"></button>
            </div>
        </div> 
    ) 
}

export default SentCmdSucess