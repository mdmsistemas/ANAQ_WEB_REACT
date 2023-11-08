import React, {useEffect, useState}  from "react";
import SubParamsForm from "./SubParamsForm";

const TableParamsForm = ({mdm285Config, setMdm285Config, equipSel, setEquipSel}) => {
 
    const getValues=()=>{
        let values = [];
        let config = mdm285Config.MDM285Config.filter(it => it.nomeEquipamento === equipSel)
        if(config[0]){
             //console.log('equipSel=', equipSel)
             values.push(config[0].identificadorParada.valorSuperiorParada);
             values.push(config[0].identificadorParada.valorInferiorParada);
             return values;
        }
        return values;       

    }
    const updateSupValue = (value) =>{

        let config = mdm285Config.MDM285Config.filter(it => it.nomeEquipamento === equipSel)
        if(config[0]){
            config[0].identificadorParada.valorSuperiorParada = Number(value);
        }
        setMdm285Config({ListaEquipamentos: mdm285Config.ListaEquipamentos, MDM285Config: mdm285Config.MDM285Config, error:mdm285Config.error})
       // console.log('updated=', config[0].identificadorParada)
   }
    
   const updateInfValue = (value) =>{

        let config = mdm285Config.MDM285Config.filter(it => it.nomeEquipamento === equipSel)
        if(config[0]){
            config[0].identificadorParada.valorInferiorParada = Number(value);
        }
        setMdm285Config({ListaEquipamentos: mdm285Config.ListaEquipamentos, MDM285Config: mdm285Config.MDM285Config, error:mdm285Config.error})
        //console.log('updated=', config[0].identificadorParada)
    }

    const getPointIdentifier=()=>{
        let config = mdm285Config.MDM285Config.filter(it => it.nomeEquipamento === equipSel) 
        if(config[0]){ 
             return config[0].identificadorParada.nomePontoMonitorado;
        }
        return '';   
    }

    const getMonitoredPointsNames =() =>{        
        let pointsArr = [];
        let list = mdm285Config.ListaEquipamentos.filter(it => it.nome === equipSel);
       
        if(list[0]){               
            list[0].subSistemas.forEach((sub, idj)=>{
                sub.componentes.forEach((comp, idz)=>{
                    comp.pontoMonitorados.forEach((pto, idp)=>{
                        pointsArr.push(pto.nome);
                    })
                })
            })          
        }             
        return pointsArr;
    }

    const updateSelectedPoint = (val)=>{

        let config = mdm285Config.MDM285Config.filter(it => it.nomeEquipamento === equipSel)
        if(config[0]){          
             config[0].identificadorParada.nomePontoMonitorado = val;
        } 
        setMdm285Config({ListaEquipamentos: mdm285Config.ListaEquipamentos, MDM285Config: mdm285Config.MDM285Config, error:mdm285Config.error})
       // console.log('updated=', config[0].identificadorParada)
     } 


    return(
        <div className="justify-content-center">  
             <table className="table table-hover table-bordered">              
                <thead className='table-light'>
                    <tr> 
                        <th scope="col" className="text-center">Parâmetros</th> 
                    </tr>
                 </thead>
             </table>           
            <table className="table table-sm table-hover table-bordered ">              
                <thead className='table-light'>
                    <tr> 
                        <th scope="col" style={{width: '33.3%'}}>Identificador de Parada</th>   
                        <th scope="col" className="text-center" style={{width: '33.3%'}}>Valor Superior:</th>    
                        <th scope="col" className="text-center" style={{width: '33.3%'}}>Valor Inferior:</th>     
                    </tr>
                </thead>
                <tbody>                
                    <tr> 
                       <td>
                           <select className="form-select" value={getPointIdentifier()} onChange={(e)=>updateSelectedPoint(e.target.value)} >                                                                                                
                               <option hidden></option>
                               {getMonitoredPointsNames().map((it, idj) =>                                                                                     
                                   <option key={idj} value={it}>{it}</option>
                               )}    
                           </select>
                       </td>
                       <td> 
                            <input type="number" className="form-control" value={equipSel?getValues()[0]:''} onChange={(e)=>updateSupValue(e.target.value)} ></input>
                        </td> 
                        <td> 
                            <input type="number" className="form-control" value={equipSel?getValues()[1]:''} onChange={(e)=>updateInfValue(e.target.value)}></input>
                        </td>                                                                       
                    </tr>                
                </tbody>
             </table>  
             
            <SubParamsForm mdm285Config={mdm285Config} setMdm285Config={setMdm285Config} equipSel={equipSel}/>  
        </div>
    )
    
}

export default TableParamsForm