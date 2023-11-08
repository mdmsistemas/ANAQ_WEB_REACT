import React, {useEffect, useState} from 'react'
import axios from 'axios'
import LoadPageError from '../Messages/LoadPageError';
import LoadingSpinner from '../Messages/LoadingSpinner';
import { useAutoRefresh } from '../../context/AutoRefresh';

const ErrorView = ()=>{ 

    //const [error, setError] = useState({'data':[], 'error':{'code':'', 'source':'', 'status':''}});
    const [error, setError] = useState();
    const {refresh, setSpin, lang} = useAutoRefresh();

    const loadError = async () =>{ 
       const res = await axios.get(`JSON/WS_ERROS`) ;  
       setError(res.data);
    }

    setTimeout(()=>{
        if(refresh)
            loadError();
    },5000); 

    useEffect(() => {
        loadError()
    }, [])

    function dateFormat(date) {
        let ndate = date.replace(',', '.')
        let d = new Date(ndate)    
        return d.toLocaleString("en-GB");
    }
   
    return( 
        <div> 
          {
            error?(  
                error.error.status === true   
                ? <LoadPageError error = {error.error} />             
                : <div className="row justify-content-center">
                    {error.data.length
                        ? <div className="col">  
                            {error.data.map((err, idx) => {
                                return  <div  key={idx} className="border-danger alert alert-danger justify-content-start bg-light pb-0 pt-0 mb-2">                               
                                            <div className="row" style={{height:'25px'}}>
                                                <label className="col-2 col-form-label fw-bold" >Código:</label>
                                                <div className="col-10">
                                                    <input type="text" readOnly className="form-control-plaintext" style={{color:'#a94442'}} value={err.codigo} ></input>
                                                </div>
                                            </div> 
                                            <div className="row" style={{height:'25px'}}>
                                                <label className="col-2 col-form-label fw-bold">Inicio:</label>
                                                <div className="col-10">
                                                    <input type="text" readOnly className="form-control-plaintext" style={{color:'#a94442'}} value={dateFormat(err.horaInicio)} disabled></input>
                                                </div>
                                            </div>   
                                            <div className="row" style={{height:'25px'}}>
                                                <label className="col-2 col-form-label fw-bold">{lang==='POR'?'Última Ocorrência':'Última Ocurrencia'}</label>
                                                <div className="col-10">
                                                    <input type="text" readOnly className="form-control-plaintext" style={{color:'#a94442'}} value={dateFormat(err.horaUltima)} disabled></input>
                                                </div>
                                            </div>                            
                                            <div className="row" style={{height:'25px'}}>
                                                <label className="col-2 col-form-label fw-bold">Total de {lang==='POR'?'Tempo':'Tiempo'}</label>
                                                <div className="col-10">
                                                    <input type="text" readOnly className="form-control-plaintext" style={{color:'#a94442'}} value='0d 01:30:50' disabled></input>
                                                </div>
                                            </div> 
                                            <div className="row">
                                                <label className="col-2 col-form-label fw-bold">{lang==='POR'?'Descrição':'Descripción'}</label>
                                                <div className="col-10">
                                                    <textarea  type="text" readOnly className="form-control-plaintext" style={{color:'#a94442'}} value={err.descricao} disabled></textarea >
                                                </div>
                                            </div> 
                                            <div className="row" >
                                                <label className="col-2 col-form-label fw-bold">Stack:</label>
                                                <div className="col-10">
                                                    <textarea  type="text" readOnly className="form-control-plaintext" style={{color:'#a94442'}} value={err.stack} disabled></textarea >
                                                </div>
                                            </div> 
                                        </div>
                            })} 
                          </div>           
                        : <div className ='container'>
                            <div className="alert alert-success" role="alert"> 
                                <strong><i className="fas fa-check-circle" style={{marginRight:'6px'}}></i>
                                    {lang==='POR'?'Sistema sem erros em ocorrência':'Sistema sin errores de ocurrencia'} 
                                </strong>
                            </div>
                          </div>   
                    }
                  </div>
            ):(<LoadingSpinner/>)    
          } 
        </div>      
    ) 
}

export default ErrorView