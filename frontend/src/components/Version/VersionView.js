import React, {useEffect, useState} from 'react'
import axios from 'axios'
import LoadPageError from '../Messages/LoadPageError'
import LoadingSpinner from '../Messages/LoadingSpinner'

const VersionView = ()=>{ 

    const [vers, setVers] = useState();

    const loadVers = async () =>{  
        const res = await axios.get(`JSON/WS_VERSAO`)
        setVers(res.data);
    } 
      
    useEffect(() => {
        loadVers()
    }, [])  
   
    return( 
       <div> 
         {
            vers?(
                vers.error.status === true    
                ? <LoadPageError error = {vers.error} />          
                : <div className="col d-flex justify-content-center pt-4">             
                        <div className="card"  style={{width:'31rem'}}>
                            <div className="card-header text-center"><h4>ANAQ</h4></div>
                            <div className="card-body">               
                                <h5 className="card-title pb-2">Aquisição e análise de dados para o Sistema MDM</h5>
                                <div className="row">
                                    <label className="col-5 col-form-label fw-bold" >Versão Programa:</label>
                                    <div className="col-5">
                                        <input type="text" readOnly className="form-control-plaintext"  value={vers.data.FileVersion} disabled></input>
                                    </div>
                                </div> 
                                <div className="row">
                                    <label className="col-5 col-form-label fw-bold">Versão Web Service:</label>
                                    <div className="col-5">
                                        <input type="text" readOnly className="form-control-plaintext" value='1.3.0180' disabled></input>
                                    </div>
                                </div>   
                                <div className="row">
                                    <label className="col-5 col-form-label fw-bold" >Nome:</label>
                                    <div className="col-5">
                                        <input type="text" readOnly className="form-control-plaintext" value='ANAQ Web' disabled></input>
                                    </div>
                                </div>                                
                            </div>
                            <div className="card-footer text-muted">
                                <div> {vers.data.CompanyName}</div>
                                <div> {vers.data.LegalCopyright}</div>
                            </div>
                        </div>
                  </div>
            ):(<LoadingSpinner/>)     
         }
       </div>          
    ) 
}

export default VersionView