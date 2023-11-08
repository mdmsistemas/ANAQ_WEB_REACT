import React, {useEffect, useState} from 'react'
import axios from 'axios'
import LoadingSpinner from '../Messages/LoadingSpinner';
import { useAutoRefresh } from '../../context/AutoRefresh';

const LogView = ()=>{ 

    //const [log, setLog] = useState({'Log':[]});
    const [log, setLog] = useState();
    const {refresh, setSpin} = useAutoRefresh();

    const loadLog = async () =>{         
        let res = await axios.get(`JSON/WS_LOG/600`);
        if(typeof(res) === 'string')
            res=JSON.parse(res);
        setLog(res.data);
    } 
    
    setTimeout(()=>{
        if(refresh)
            loadLog();
    },5000);

    useEffect(() => {
        loadLog()
    }, [])


    function logType(log) {
        if(log.includes('ERRO ADICIONADO')){
            return 'alert alert-danger'
        }else if(log.includes('ERRO EXPIRADO')){
            return 'alert alert-info'
        }else if(log.includes('ANAQ iniciado com sucesso')){
            return 'alert alert-success'
        }else if(log.includes('descarregada com sucesso')){
            return 'alert alert-success'
        }else if(log.includes('Mudou do estado')){
            return 'alert alert-warning'
        }else if(log.includes('ANAQ finalizado')){
            return 'alert alert-warning'
        }else if(log.includes('COMANDO DE')){
            return 'alert alert-warning'
        }else if(log.includes('Alerta Coletado')){
            return 'alert alert-warning'
        }else if(log.includes('RECEBIDA')){
            return 'alert alert-warning'
        }else {
            return 'bg-light'
        }      
    }   
   
    return( 
        <div> 
          {
            log?(
                <div className="row justify-content-center">     
                    <div className="col">            
                        {
                            log.Log.map((logi, idx) => {
                                return  <div key={idx} className={`${logType(Buffer.from(logi,'base64').toString('ascii'))} border-top justify-content-start p-0 mb-1`}> 
                                            {Buffer.from(logi,'base64').toString('ascii')}     
                                        </div>
                        })}                                          
                    
                    </div> 
                </div>   
            ):(<LoadingSpinner/>)    
          }   
        </div>         
    ) 
}

export default LogView