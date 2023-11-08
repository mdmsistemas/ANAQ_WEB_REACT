import React, {useEffect, useState} from 'react'
import { Link, useRouteMatch } from 'react-router-dom';
import axios from 'axios'
import LoadPageError from '../Messages/LoadPageError'
import SentCmdError from '../Messages/SentCmdError';
import SentCmdSucess from '../Messages/SentCmdSucess';
import LoadingSpinner from '../Messages/LoadingSpinner';
import { useAutoRefresh } from '../../context/AutoRefresh';

const AnalyseView = ()=>{ 
      
   const [analyses, setAnalyses] = useState();   
   //const [analyses, setAnalyses] = useState();
   const [keyState, setKeyState] = useState();
   const [alertState, setAlertState] = useState(false);
   const [errorState, setErrorState] = useState({"code":"" ,"source":"","status": false},);  
   const {refresh, setSpin, lang} = useAutoRefresh() ;

   const { url } = useRouteMatch();  

   const loadAnalyses = async () =>{    
      let res = await axios.get('JSON/WS_EAN'); 
       setAnalyses(res.data);        
    }   

    setTimeout(()=>{
        if(refresh)
            loadAnalyses();
    },5000);
   
    useEffect(() => {      
        loadAnalyses()   
    }, [])
    

    const isError = (val)=>{ 
        if(val === -99999999999){
            return <button type="button" className="btn btn-sm btn-danger pt-0 pb-0"  style={{fontSize:'12px', pointerEvents: 'none'}}>ERRO</button>
        }else{
            return val.toFixed(4);
        }
    }

    const styleBadge = { 
        width:'259px', 
        fontSize: '1.0em', 
        fontWeight: '600',
        padding:'4.7px'         
    } 
    const styleBadgeGroup = { 
        width:'238px', 
        fontSize: '1.0em', 
        fontWeight: '600',
        padding:'4.7px'         
    } 

    const sendCmd = async(cmd) =>{   
              
        let equip = analyses.EstadosAnalise[keyState].nome;
        let res = await axios.get(`JSON/${cmd}/${equip}`) 
       // console.log(`resAnalise_cmd=`, JSON.parse(res.data))
        res = JSON.parse(res.data);
      
        setAlertState(true); 
        setErrorState({ code: res.error.code,
                        source: res.error.source,
                        status: res.error.status,})          
    } 

    const handleAlertUpdate = () => {      
        setAlertState(false);
    }

    //const items = analyses.EstadosAnalise; 
    //const erros = analyses.error; 

    const Component = errorState.status ? SentCmdError : SentCmdSucess;
  
    return (
        <div>               
          { 
            analyses?(       
                analyses.error.status === true
                ? <LoadPageError error = {analyses.error} />              
                : <div>
                    {alertState === true 
                        ? <Component error={errorState} show ={alertState} handle = {handleAlertUpdate}/>  
                        : null  
                    }  
                    {analyses.EstadosAnalise.map((item, idx) =>              
                    <div className="col d-flex justify-content-center mb-2" key={idx}>           
                        <div className="card text-dark align-item-center mb-3 " style={{width: '76rem'}} >
                            <div className="card-header">
                                <div className="row">
                                    <div className="col">
                                        <h6 className="card-title fw-bold">{item.nome}</h6>
                                    </div>
                                    <div className="col">
                                        <h6 className="card-title">Estado: {item.estado}</h6>
                                    </div>
                                    <div className="col">
                                        <h6 className="card-title">{lang==='POR'?'Última Análise':'Último análisis'}: {item.datahoraUltimaAnalise}</h6>
                                    </div>
                                    <div className="col">
                                        <h6 className="card-title text-center">{item.estadoUltimaAnalise}</h6>
                                    </div>
                                </div> 
                                <div className="row justify-content-center">
                                    <div className="col-11">
                                        <table className="table table-sm table-striped table-bordered table-light mt-3">
                                            <thead>
                                                <tr>                    
                                                <th scope="col">{lang==='POR'?'Ponto de Operação':'Punto de Operación'}</th>
                                                <th scope="col" className="text-center">Valor</th>
                                                <th scope="col" className="text-center">{lang==='POR'?'Tempo':'Tiempo'} p/ Estab.</th>
                                                </tr>
                                            </thead>
                                            <tbody>                                            
                                                {//item.pontosOp.map((pto, idx) => {
                                                item.pontosOp.map(function(pto, idx) {  
                                                    if(pto.nomePtoOp){
                                                        return  <tr key={item.nome+'_'+idx}>                       
                                                                    <td>{pto.nomePtoOp}</td>
                                                                    <td className="text-center">{isError(pto.ultimoValor)}</td>
                                                                    <td className="text-center">{pto.tempoRestante} minutos </td>
                                                                </tr>
                                                    }
                                                })}                                          
                                            </tbody>                    
                                        </table>  
                                    </div> 
                                </div>   
                                <div className="row">
                                    <div className="col text-center" >
                                        {item.numAlarmes > 0
                                            ? <Link className="btn btn-sm rounded-pill btn-danger me-md-2 " to ={`${url}/alarms/${item.nome}`} style={styleBadge}><i className="fas fa-bell fa-fw"></i>{lang==='POR'?'Alarmes ':'Alarmas '}<span className="badge bg-light text-danger">{item.numAlarmes}</span></Link>
                                            : <button className="btn btn-sm rounded-pill btn-success me-md-2" disabled style={styleBadge}><i className="fas fa-bell-slash" style={{paddingRight:'2px'}}></i>{lang==='POR'?'Sem Alarmes ':'Sin Alarmas '}</button>
                                        }
                                        <Link className="btn btn-sm rounded-pill btn-primary me-md-2" to ={`${url}/points/${item.nome}`} style={styleBadge}><i className="fas fa-map-marker-alt fa-fw"></i>{lang==='POR'?'Pontos Monitorados':'Puntos Monitoreados'}</Link>
                                        <Link className="btn btn-sm rounded-pill btn-primary me-md-2" to ={`${url}/tests/${item.nome}`} style={styleBadge}><i className="fas fa-clipboard" style={{paddingRight:'4px'}}></i>{lang==='POR'?'Testes':'Pruebas'}</Link>
                                        <div className="btn-group" >
                                            <button type="button" className="btn btn-sm btn-primary rounded-pill rounded-end" style={styleBadgeGroup}>
                                                <i className="fas fa-bars fa-fw"></i>Comandos
                                            </button>
                                            <button type="button" className="btn btn-sm btn-primary dropdown-toggle dropdown-toggle-split rounded-pill rounded-start" data-bs-toggle="dropdown" aria-expanded="false">
                                                <span className="visually-hidden">Toggle Dropdown</span>
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-end" >
                                                <li><button  className="dropdown-item" data-bs-toggle="modal" data-bs-target="#recordModal"  onClick={() => setKeyState(idx)} style={{cursor: "pointer"}}>{lang==='POR'?'Gravar ':'Grabar '}Registro</button ></li>
                                                <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#enforceModal" onClick={() => setKeyState(idx)} style={{cursor: "pointer"}}>{lang==='POR'?'Forçar Estabilidade':'Forzar Estabilidad'}</button ></li>
                                                <li><button  className="dropdown-item" data-bs-toggle="modal" data-bs-target="#restAlarmModal" onClick={() => setKeyState(idx)} style={{cursor: "pointer"}}>Reiniciar {lang==='POR'?'Alarmes':'Alarmas'}</button ></li>     
                                            </ul>
                                        </div>  
                                    </div>
                                </div>              
                            </div>
                        </div>                                 
            
                        {/* Modal Gravar Registro */}
                        <div className="modal fade" id="recordModal" tabIndex="-1" aria-labelledby="recordModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="recordModalLabel">{lang==='POR'?'Gravar novo ':'Grabar nuevo '}registro<i className="fas fa-share-square" style={{paddingLeft:'7px'}}></i></h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {lang==='POR'?'Deseja gravar um novo registro?':'¿Quieres grabar un nuevo registro?'}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => sendCmd('WS_NOVOREG')}>OK</button>
                                </div>
                                </div>
                            </div>
                        </div>
            
                        {/* Modal Forcar Estabilidade */}
                        <div className="modal fade" id="enforceModal" tabIndex="-1" aria-labelledby="enforceModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="enforceModalLabel">{lang==='POR'?'Forçar estabilidade do equipamento':'Forzar estabilidad del eqiuipo'}<i className="fas fa-hammer" style={{paddingLeft:'7px'}}></i></h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div> {lang==='POR'?'Deseja forçar o estado do equipamento para estável?':'¿Quiere forzar el estado del equipo a estable?'} </div>
                                    <div> {lang==='POR'?'O contador de tempo para estabilidade será zerado.':'El contador de tiempo para estabilidad se reiniciará.'} </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => sendCmd('WS_RST_AGUARDA')}>OK</button>
                                </div>
                                </div>
                            </div>
                        </div>
            
                        {/* Modal Reiniciar Alarmados */}
                        <div className="modal fade" id="restAlarmModal" tabIndex="-1" aria-labelledby="restAlarmModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="restAlarmModalLabel">{lang==='POR'?'Reiniciar os Alarmes do equipamento':'Reiniciar las alarmas del equipo'}<i className="fas fa-retweet" style={{paddingLeft:'7px'}}></i></h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div>{lang==='POR'?'Deseja forçar o reinicio dos alarmes do equipamento?':'¿Quieres forzar el reinicio de las alarmas del equipo?'} </div>
                                    <div>{lang==='POR'?'Todos os alarmes serão zerados.':'Todas las alarmas se reiniciarán.'} </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => sendCmd('WS_RST_ALARMADOS')}>OK</button>
                                </div>
                                </div>
                            </div>
                        </div>        
                    </div> 
                    )}
                  </div>              
            ):(<LoadingSpinner/>) 
          }    
        </div>     
    )
}

export default AnalyseView