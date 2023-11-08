import React, {useEffect, useState} from 'react'
import axios from 'axios'
import LoadPageError from '../Messages/LoadPageError'
import LoadingSpinner from '../Messages/LoadingSpinner';
import { useAutoRefresh } from '../../context/AutoRefresh';

function toDdHhMnSs(ms) {
    let mil_num = parseInt(ms); 
    let days = Math.floor(mil_num / (3600 * 24 * 1000));
    let hours = Math.floor((mil_num - (days * (3600 * 24 * 1000))) / (3600 * 1000));
    let minutes = Math.floor((mil_num - (days * (3600 * 24 * 1000)) - (hours * 3600 * 1000)) / (60 * 1000));
    let seconds = Math.floor(mil_num - (days * (3600 * 24 * 1000)) - (hours * 3600 * 1000) - (minutes * 60 * 1000))/(1000);

    if (hours < 10) {hours = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return days+'d '+hours+':'+minutes+':'+seconds;
}

function dateFormat(date) {
    let ndate = date.replace(',', '.')
    let d = new Date(ndate)    
    return d.toLocaleString("en-GB");
}

function operationTime(datei, datef){
    let ndatei = datei.replace(',', '.');
    let ndatef = datef.replace(',', '.');
    ndatei = new Date(ndatei);
    ndatef = new Date(ndatef);

    let ms = Math.abs(ndatef.getTime() - ndatei.getTime());
    return toDdHhMnSs(ms)
}

const StatisticsView = ()=>{ 

    const [stat, setStat] = useState();

    const {refresh, setSpin, lang} = useAutoRefresh();

    const loadStat = async () =>{  
        const res = await axios.get(`JSON/WS_STAT`)       
        setStat(res.data);
    } 
    
    setTimeout(()=>{
        if(refresh)
            loadStat();
    },5000);

    useEffect(() => {
        loadStat();
    }, [])  ;
        
   
    return( 
       <div> 
         {
            stat?(  
                stat.error.status === true   
                ? <LoadPageError error = {stat.error} />            
                : <div className="row justify-content-center">
                        <div className="col-16">
                            <div className="row" style={{height:'25px'}}>
                                <label className="col-2 col-form-label fw-bold" >Inicio:</label>
                                <div className="col-10 h-25">
                                    <input type="text" readOnly className="form-control-plaintext" value={dateFormat(stat.data.inicio)} disabled></input>
                                </div>
                            </div> 
                            <div className="row" style={{height:'25px'}}>
                                <label className="col-2 col-form-label fw-bold">Último {lang==='POR'?'Reinício':'Reinicio'}</label>
                                <div className="col-10">
                                    <input type="text" readOnly className="form-control-plaintext" value={dateFormat(stat.data.ultimoReinicio)} disabled></input>
                                </div>
                            </div> 
                            <div className="row" style={{height:'25px'}}>
                                <label className="col-2 col-form-label fw-bold">{lang==='POR'?'Tempo em Operação':'Tiempo en Operación'}</label>
                                <div className="col-10">
                                    <input type="text" readOnly className="form-control-plaintext" value={operationTime(stat.data.inicio, stat.data.ultimoReinicio)} disabled></input>
                                </div>
                            </div> 
                            <div className="row" style={{height:'25px'}}>
                                <label className="col-2 col-form-label fw-bold">Memória:</label>
                                <div className="col-10">
                                    <input type="text" readOnly className="form-control-plaintext" value={(stat.data.memoria/1024/1024).toFixed(2) + ' MB'} disabled></input>
                                </div>
                            </div> 
                            <table className="table table-striped table-sm table-bordered table-light mt-4">
                                <thead>
                                    <tr>                    
                                        <th scope="col">{lang==='POR'?'Equipamento':'Equipo'}</th>
                                        <th scope="col" className="text-center">{lang==='POR'?'Tempo Análise':'Tiempo Análisis'}</th>  
                                        <th scope="col" className="text-center">{lang==='POR'?'Tempo Pré-Processamento':'Tiempo Preprocesamiento'}</th>                                                 
                                        <th scope="col" className="text-center">{lang==='POR'?'Tempo Pós-Processamento':'Tiempo Postprocesamiento'}</th>      
                                    </tr>
                                </thead>
                                    <tbody>
                                        {stat.data.temposAnaliseEquipamentos.map((equip, idx) => {
                                            return  <tr key={idx} className='table table-striped table-sm table-bordered table-light'>                                            
                                                        <td >{equip.nome}</td>
                                                        <td className="text-center">{equip.tUltimoCiclo} ms</td> 
                                                        <td className="text-center">{stat.data.temposBlocosPreProcess[idx].tUltimoCiclo} ms</td>                                        
                                                        {
                                                            (() => {
                                                                    if (stat.data.temposBlocosPosProcess[idx] )
                                                                        if (stat.data.temposBlocosPosProcess[idx].nome)
                                                                            return <td className="text-center">
                                                                                        {`${stat.data.temposBlocosPosProcess[idx].tUltimoCiclo} + ms`}
                                                                                    </td>
                                                                        else 
                                                                            return <td className="text-center"> </td>
                                                                    else
                                                                        return <td className="text-center"> </td>   
                                                            })()               
                                                        } 
                                                    </tr>
                                        })}                                          
                                    </tbody>                    
                            </table>  
                            <table className="table table-striped table-sm table-bordered table-light mt-4">
                                <thead>
                                    <tr>                    
                                        <th scope="col" style={{width: '50%'}}>UAD</th>
                                        <th scope="col" className="text-center" style={{width: '50%'}}>{lang==='POR'?'Bloco Pronto':'Bloque Listo'}</th>                                               
                                    </tr>
                                </thead>
                                    <tbody>
                                        {stat.data.temposBlocosUADs.map((uad, idx) => {
                                            return  <tr key={idx} className='table table-striped table-sm table-bordered table-light'>                                            
                                                        <td >{uad.nome}</td>
                                                        <td className="text-center">{uad.tUltimoCiclo} ms</td>                                        
                                                    </tr>
                                        })}                                          
                                    </tbody>                    
                            </table> 
                            <table className="table table-striped table-sm table-bordered table-light mt-4">
                                <thead>
                                    <tr>                    
                                        <th scope="col" style={{width: '50%'}}>{lang==='POR'?'Processos':'Procesos'}</th>
                                        <th scope="col" className="text-center" style={{width: '50%'}}>{lang==='POR'?'Pacotes em Fila':'Paquetes en Fila'}</th>                                               
                                    </tr>
                                </thead>
                                    <tbody>
                                        {stat.data.PacotesEquipamento.map((pac, idx) => {
                                            return  <tr key={idx} className='table table-striped table-sm table-bordered table-light'>                                            
                                                        <td >{pac.Equipamento}</td>
                                                        <td className="text-center">{pac.NumPacotesAnalise}</td>                                        
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

export default StatisticsView