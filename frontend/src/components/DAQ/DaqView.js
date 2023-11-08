import React, {useEffect, useState} from 'react'
import axios from 'axios'
import LoadPageError from '../Messages/LoadPageError';
import LoadingSpinner from '../Messages/LoadingSpinner';
import { useAutoRefresh } from '../../context/AutoRefresh';

const DaqView = ()=>{ 
   
    const [daq, setDaq] = useState();
    const {refresh, setSpin, lang} = useAutoRefresh();

    const loadDaq = async () =>{          
        const res = await axios.get('JSON/WS_EAQ')
        setDaq(res.data);
    } 
      
    useEffect(() => {
        loadDaq()
    }, [])

    useEffect(() => {
        if(refresh===true) {
            const timeoutView = setTimeout(() => {
                loadDaq()
                console.log('Updating Daq')                  
                const timeOutSpin = setTimeout(() => {setSpin(false)}, 5000);
                setSpin(true); 
                return () => clearTimeout(timeOutSpin);   
            }, 5000);
            return () => clearTimeout(timeoutView);   
        } else if(refresh===false){
            setSpin(false)
        }     
     }, [daq, refresh, setSpin])   


    function dateFormat(date) {
        let ndate = date.replace(',', '.')
        let d = new Date(ndate)
        //console.log('date=', ndate , d)
        return d.toLocaleString();
    }
   
    return( 
        <div> 
        {
            daq?(
                daq.error.status === true   
                ? <LoadPageError error = {daq.error} />            
                : <div className="row justify-content-center">
                    <div className="col-16">
                        <table className="table table-striped table-sm table-bordered table-light mt-2">
                            <thead>
                                <tr>                    
                                    <th scope="col">{lang==='POR'?'Nome':'Nombre'}</th>
                                    <th scope="col" className="text-center">Driver</th>
                                    <th scope="col" className="text-center">Num. {lang==='POR'?'Bloco':'Bloque'}</th>
                                    <th scope="col" className="text-center">{lang==='POR'?'Última Adquição':'Última Adquisición'}</th>
                                    <th scope="col" className="text-center">Estado</th>                          
                                </tr>
                            </thead>
                                <tbody>
                                    {daq.EstadosAquisicao.map((estado, idx) => {
                                        return  <tr key={idx} className={`table table-striped table-sm table-bordered table-light mt-3 
                                                                        ${(estado.error.status)?'text-danger':'text-success'}`}>  
                                                    <td>{estado.nomeUAD}</td>
                                                    <td className="text-center">{estado.driver}</td>
                                                    <td className="text-center">{estado.nbloco}</td>
                                                    <td className="text-center">{dateFormat(estado.datahora)}</td>
                                                    <td className="text-center">{(estado.error.status)?'':'OK'}</td>     
                                                </tr>
                                    })}                                          
                                </tbody>                    
                        </table>  
                    </div> 
                  </div>
            ):(<LoadingSpinner/>)
        } 
        </div>   
    ) 
}

export default DaqView