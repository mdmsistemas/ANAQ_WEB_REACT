import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams} from "react-router-dom";
import LoadPageError from '../Messages/LoadPageError';
import LoadingSpinner from '../Messages/LoadingSpinner';
import { useAutoRefresh } from '../../context/AutoRefresh';
import TitlePage from '../Cards/TitlePage'

const Tests = ()=>{ 
    
    const { nome } = useParams(); 
    //const [tests, setTests] = useState({"Testes":[], "error":{"code":"", "source":"", "status":""}});
    const [tests, setTests] = useState();
    const {refresh, setSpin, lang} = useAutoRefresh() ;

    const loadTests = async () =>{
        let res = await axios.get(`JSON/WS_TESTES/${nome}`)      
        //console.log(res.data);    
        setTests(res.data);
    } 
      
    setTimeout(()=>{
        if(refresh)
            loadTests();
    },5000);

    useEffect(() => {
        loadTests()
    }, [])   

    const Sentido = (val)=>{ 
        if(val === 0){
            return 'positivo'
        }else if(val === 1) {
            return 'negativo'
        }else{
            return ''
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
            tests?(             
                tests.error.status === true   
                ? <LoadPageError error = {tests.error} /> 

                : <div className="justify-content-center"> 

                    
                    <TitlePage title={lang==='PORT'?'TESTES':'PRUEBAS'}
                        labelNome={lang==='POR'?'Nome:':'Nombre:'} nome={nome} 
                        labelDataUpdate={lang==='POR'?'Última Atualização:':'Última Actualización'}
                        dataUpdate={LocalDate()}
                    />

     
                     <div className="row justify-content-center">
                         <div className="col-16">
                             <table className="table table-striped table-sm table-bordered table-light mt-3">
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
                                     {tests.Testes.map((test, idx) => 
                                         test.ultimosResultadosTestes.map((ultm, idj) => 
                                             //ultm.alarmados.map((alarm, idk) => {  
                                               ultm.alarmados.map(function(alarm, idk) {        
                                                 if(ultm.idTeste && ultm.nomeTeste) {                                                                        
                                                     return <tr key={test.nome+'_'+ultm.idTeste} className={(alarm.id && alarm.nome)?'table-danger':'table'}>  
                                                             <td className={`text-center ${(alarm.id && alarm.nome)?'alert alert-danger':''}`}>{test.nome}</td>
                                                             <td className={`text-center ${(alarm.id && alarm.nome)?'alert alert-danger':''}`}>{ultm.nomeTeste}</td>
                                                             <td className={`text-center ${(alarm.id && alarm.nome)?'alert alert-danger':''}`}>{(ultm.valor).toFixed(4)}</td>
                                                             <td className={`text-center ${(alarm.id && alarm.nome)?'alert alert-danger':''}`}>{(alarm.id && alarm.nome)?alarm.valor:''}</td>
                                                             <td className={`text-center ${(alarm.id && alarm.nome)?'alert alert-danger':''}`}>{Sentido(alarm.sentido)}</td>
                                                             <td className={`text-center ${(alarm.id && alarm.nome)?'alert alert-danger':''}`}>{alarm.nome}</td>
                                                            </tr>
                                                 }
                                             })   
                                     )       
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

export default Tests