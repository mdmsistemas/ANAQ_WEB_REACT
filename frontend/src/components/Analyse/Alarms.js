import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";
import LoadPageError from '../Messages/LoadPageError';
import LoadingSpinner from '../Messages/LoadingSpinner';
import { useAutoRefresh } from '../../context/AutoRefresh';
import TitlePage from '../Cards/TitlePage';

const Alarms = ()=>{ 
    
    const { nome } = useParams();
  //  const [alarms, setAlarms] = useState({'Alarmes':[], 'error':{'code':'', 'source':'', 'status':''}});
    const [alarms, setAlarms] = useState();
    const {refresh, setSpin, lang} = useAutoRefresh();

    const loadAlarms = async () =>{   
        const res = await axios.get(`JSON/WS_ALARMES/${nome}`)
        //console.log('res=', JSON.parse(res.data.body)); 
        setAlarms(res.data);
    } 
    
    setTimeout(()=>{
        if(refresh)
            loadAlarms();
    },5000);

    useEffect(() => {
        loadAlarms()
    }, [])


    const LocalDate= () => {
        let ldate = new Date(Date.now());    
        return ldate.toLocaleString("en-GB");
    } 

    
    return (
       <div> 
         {
            alarms?(  
                alarms.error.status === true   
                ? <LoadPageError error = {alarms.error}/>
                : <div className="justify-content-center">  

                    <TitlePage title={lang==='PORT'?'ALARMES':'ALARMAS'}
                        labelNome={lang==='POR'?'Nome:':'Nombre:'} nome={nome} 
                        labelDataUpdate={lang==='POR'?'Última Atualização:':'Última Actualización'}
                        dataUpdate={LocalDate()}/>                             

                    <div className="row justify-content-center">
                        <div className="col-16">
                            <table className="table table-striped  table-sm table-bordered table-light mt-3">
                                <thead>
                                    <tr>                    
                                        <th scope="col">{lang==='POR'?'Ponto Monitorado':'Punto Monitoreado'}</th>
                                        <th scope="col" className="text-center">{lang==='POR'?'Teste':'Prueba'}</th>
                                        <th scope="col" className="text-center">Valor Alarmado</th>
                                        <th scope="col" className="text-center">Valor {lang==='POR'?'Alarme':'Alarma'}</th>
                                        <th scope="col" className="text-center">Sentido</th>
                                        <th scope="col" className="text-center">{lang==='POR'?'Alarme':'Alarma'}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alarms.Alarmes.map((alarm, idx) => 
                                        alarm.alarmados.map((almds, idj) => {
                                            return  <tr key={alarm.IDPtoMon+'_'+idj}>                       
                                                        <td>{alarm.nomePtoMon}</td>
                                                        <td className="text-center">{almds.nomeTeste}</td>
                                                        <td className="text-center">{(almds.valorAlarmado).toFixed(4)}</td>
                                                        <td className="text-center">{almds.valorAlarme}</td>
                                                        <td className="text-center">{almds.sentido}</td>
                                                        <td className="text-center">{almds.nomeAlarme}</td>
                                                    </tr>
                                        })
                                    )}                                          
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

export default Alarms