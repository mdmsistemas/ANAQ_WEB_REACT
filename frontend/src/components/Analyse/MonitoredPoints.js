import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams, Link, useRouteMatch } from "react-router-dom";
import LoadPageError from '../Messages/LoadPageError';
import LoadingSpinner from '../Messages/LoadingSpinner';
import { useAutoRefresh } from '../../context/AutoRefresh';
import TitlePage from '../Cards/TitlePage';

const MonitoredPoints = ()=>{ 

    const { nome } = useParams();    
    /*const [monPoints, setMonPoints] = useState({
        "Sinais":{
            "nome":"",
            "datahora":"",
            "pontosMonitorados":[]        
        }, 
        "error":{
            "code":"", 
            "source":"", 
            "status":""
    }});*/
    const [monPoints, setMonPoints] = useState();

    let { url } = useRouteMatch();
    const {refresh, setSpin, lang} = useAutoRefresh() ;

    const loadMonPoints = async () =>{    
        const res = await axios.get(`JSON/WS_DADOS/${nome}`)
        //console.log('res=', JSON.parse(res.data.body));
        setMonPoints(res.data);
    } 
    
    setTimeout(()=>{
        if(refresh)
            loadMonPoints();
    },5000);

    useEffect(() => {
        loadMonPoints();
    }, [])


    const linkRef = (valid, name) => {
        if (valid) {
            return <Link to={`${url}/${name}`} className="fw-bold" style={{textDecoration: 'none'}}>{name}</Link>
        } else {
           return  <div>{name}</div>
        }
    }

    const isValid = (val)=>{ 
        if(val === false){
            return <i className="fas fa-times" style={{color:'red'}}></i>
        }else{
            return <i className="fas fa-check" style={{color:'green'}}></i>;
        }
    }

    function pad2(number) {
        return (number < 10 ? '0' : '') + number;
    }

    const LocalDate= () => {
        let ldate = new Date(Date.now());    
      
        return pad2(ldate.getUTCDate()) + '/' + pad2(ldate.getUTCMonth() + 1) + '/' + pad2(ldate.getUTCFullYear()) + ' ' + 
               pad2(ldate.getUTCHours() - 3) + ':' + pad2(ldate.getUTCMinutes()) + ':' + pad2(ldate.getUTCSeconds());
    }     

    return (
       <div> 
        {
            monPoints?(               
                monPoints.error.status === true  
                ? <LoadPageError error = {monPoints.error} />            



                : <div className="justify-content-center"> 
                    <TitlePage title={lang==='POR'?'PONTOS MONITORADOS':'PUNTOS MONITOREADOS'}
                        labelNome={lang==='POR'?'Nome:':'Nombre:'} nome={nome} 
                        labelDataUpdate={lang==='POR'?'Última Atualização:':'Última Actualización'}
                        dataUpdate={LocalDate()}
                    />  


                    <div className="row justify-content-center">
                        <div className="col-16">
                            <table className="table table-sm table-bordered table-light mt-3">
                                <thead>
                                    <tr>                    
                                        <th scope="col" >{lang==='POR'?'Ponto Monitorado':'Punto Monitoreado'}</th>
                                        <th scope="col" className="text-center">Valor</th>
                                        <th scope="col" className="text-center">Time Stamp</th>
                                        <th scope="col" className="text-center">{lang==='POR'?'Unidade':'Unidad'}</th>
                                        <th scope="col" className="text-center">Canal</th>
                                        <th scope="col" className="text-center">Válido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {monPoints.Sinais.pontosMonitorados.map((point, idx) => {
                                        return  <tr key={idx} className={(point.valido)?'table-success':'table-danger'}>  
                                                    <td>
                                                        {linkRef(point.valido, point.nome)}
                                                    </td>
                                                    <td className="text-center" style={{color:(point.valido)?'black':'#a94442'}}>{(point.valor).toFixed(4)}</td>
                                                    <td className="text-center" style={{color:(point.valido)?'black':'#a94442'}}>{point.timestamp}</td>
                                                    <td className="text-center" style={{color:(point.valido)?'black':'#a94442'}}>{point.unidade}</td>
                                                    <td className="text-center" style={{color:(point.valido)?'black':'#a94442'}}>{point.canal}</td>
                                                    <td className="text-center">{isValid(point.valido)}</td>
                                                </tr>
                                    })}                                          
                                </tbody>                    
                            </table>  
                        </div> 
                    </div>
                  </div>                
            ):(<LoadingSpinner/>) 
        } 
       </div>  
    )
}

export default MonitoredPoints