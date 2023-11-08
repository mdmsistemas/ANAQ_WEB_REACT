import React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import SentCmdError from '../Messages/SentCmdError';
import SentCmdSucess from '../Messages/SentCmdSucess';
import { useAutoRefresh } from '../../context/AutoRefresh';
import ConfirmationView from './componentes-navbar/ConfirmationView';

const Navbar = () => {

    const [activeTab, setActiveTab] = useState(''); 
    const [alertState, setAlertState] = useState(false);
    const [errorState, setErrorState] = useState({code:0,source:'',status:false},); 
    const {refresh, setRefresh, spin, lang, setLang} = useAutoRefresh() ;
  
    const styleTab = () =>{
        return {
                    borderRadius: '3px 3px 0 0',
                    backgroundColor: 'white',
                    color: 'black',
                    borderBottom: 'white'
               }
    }  


    const sendCmd = async(cmd) =>{   
        let res = await axios.get(`JSON/${cmd}`)
        console.log(`res_cmd=`, res.data)
        res = res.data;
            
        setAlertState(true);      
        setErrorState({ code: res.error.code,
                        source: res.error.source,
                        status: res.error.status,})          
    } 

    const handleAlertUpdate = () => {      
        setAlertState(false);
    }

    const Component = errorState.status ? SentCmdError : SentCmdSucess;

    let mySpin = true;
    setTimeout(()=>{
        if(refresh)
            mySpin = !mySpin;
    },2000);

    useEffect(() => {
        let url = window.location.href;
        let tab = url.split('/')[5];
        console.log('tab url=',url, tab)
        if (!tab) {tab = 'analyse'}     
        setActiveTab(tab);  
    }, [])

    useHistory().listen((location, action) => {    
        let tabHist = location.pathname.slice(1)
        if(tabHist.includes('/')){
            tabHist = tabHist.split('/')[0];            
        } 
        setActiveTab(tabHist);    
        console.log(action, tabHist)
    }); 

    return (
      <div>  
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" >
            <div className="container" style={{paddingBottom:"-1px"}}>               
                <img src='logoMDM.png' alt="logo" width="6%" height="6%" className="d-inline-block align-text-top"/>
                      
                <div className="collapse navbar-collapse" id="navbarNavDropdown" style={{paddingLeft:"20px", marginBottom:'-8px'}}>
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className={activeTab==='analyses'?'active nav-link':'nav-link'} style={activeTab==='analyses'?styleTab():{}} onClick={()=>setActiveTab('analyses')} to="/">
                                <i className="fas fa-search-location fa-fw"></i>{lang==='POR'?'Análise':'Análisis'}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={activeTab==='daq'?'active nav-link':'nav-link'} style={activeTab==='daq'?styleTab():{}}  onClick={() => {setActiveTab('daq')}} to="/daq">
                                <i className="fas fa-hdd" style={{paddingRight:'2px'}}></i>{lang==='POR'?'Aquisição':'Adquisición'}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={activeTab==='log'?'active nav-link':'nav-link'} style={activeTab==='log'?styleTab():{}} onClick={() => {setActiveTab('log')}} to="/log">
                                <i className="far fa-list-alt fa-fw"></i>Log
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={activeTab==='error'?'active nav-link':'nav-link'} style={activeTab==='error'?styleTab():{}} onClick={() => {setActiveTab('error')}} to="/error">
                                <i className="fas fa-exclamation-triangle" style={{paddingRight:'2px'}}></i>{lang==='POR'?'Erros':'Errores'}
                            </Link>                           
                        </li>
                        <li className="nav-item">
                            <Link className={activeTab==='statistics'?'active nav-link':'nav-link'} style={activeTab==='statistics'?styleTab():{}} onClick={() => {setActiveTab('statistics')}} to="/statistics">
                                <i className="fas fa-chart-bar fa-fw" ></i>{lang==='POR'?'Estatísticas':'Estadísticas'} 
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <div className="nav-link  dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fas fa-bars"></i>
                            </div>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#restartModal" style={{cursor: "pointer"}}>Reiniciar</button></li>
                                <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#stopModal" style={{cursor: "pointer"}}>Parar</button></li>
                                <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#startModal" style={{cursor: "pointer"}}>Iniciar</button></li>
                                <li><hr className="dropdown-divider"></hr></li>
                                <li><Link className="dropdown-item" to="/configurator"><i className="fas fa-cog fa-fw"></i>Configurador</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <div className="nav-link"  title={refresh?(lang==='POR'?'Atualização Automatica':'Actualización Automática'):(lang==='POR'?'Ativar Auto-atualização':'Activar Auto-actualización')}  
                            onClick={() => setRefresh(!refresh)} style={{cursor: "pointer", color: refresh?'#81e386':'#EF9A9A'}}> 
                            <i className={refresh?`fas fa-spinner fa-lg ${mySpin?'fa-pulse':''}`:'fas fa-circle-notch fa-lg'} ></i>
                        </div> 
                        <li className="nav-item dropdown" >
                            <div className="nav-link dropdown-toggle"  id="navbarDropdownMenuLang" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {lang==='POR'?'POR':'ESP'}
                            </div>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLang" style={{ minWidth: '95px'}}>
                                <li><button className="dropdown-item" title='Português' onClick={()=>setLang('POR')}>POR</button></li>
                                <li><button className="dropdown-item" title='Español' onClick={()=>setLang('ESP')}>ESP</button></li>                            
                            </ul>
                        </li>                          
                        <Link className="nav-link"  title ='Sobre' to="/version" onClick={() => setActiveTab('')} style={{cursor: "pointer"}}> <i className="fas fa-info-circle"></i></Link>  
                    </ul>                       
                </div>
            </div>          
        </nav>
               
        {alertState === true 
            ? <Component error={errorState} show ={alertState} handle = {handleAlertUpdate}/>           
            : null  
        } 

        {/* Modal Reiniciar */}
        <div className="modal fade" id="restartModal" tabIndex="-1" aria-labelledby="restartModalLabel" aria-hidden="true">
            <ConfirmationView title="Reiniciar" msg={lang==='POR'?'Deseja reiniciar o ANAQ?':'Desea reiniciar el ANAQ?'} 
            cmd="WS_RST" sendCmd={sendCmd} classIcone="fas fa-history"/>
        </div>
        {/* Modal Parar */}
        <div className="modal fade" id="stopModal" tabIndex="-1" aria-labelledby="stopModalLabel" aria-hidden="true">
            <ConfirmationView title="Parar ANAQ" msg={lang==='POR'?'Deseja parar o ANAQ?':'Desea parar el ANAQ?'} 
            cmd="WS_PARAR" sendCmd={sendCmd} classIcone="far fa-stop-circle fa-fw"/>
        </div>
        {/* Modal Iniciar */}
        <div className="modal fade" id="startModal" tabIndex="-1" aria-labelledby="startModalLabel" aria-hidden="true">
            <ConfirmationView title="Iniciar ANAQ" msg={lang==='POR'?'Deseja iniciar o ANAQ?':'Desea iniciar el ANAQ?'} 
            cmd="WS_INICIAR" sendCmd={sendCmd} classIcone="far fa-play-circle fa-fw"/>
        </div>
      </div>  
    )
}

export default Navbar