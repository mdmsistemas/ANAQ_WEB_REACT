import React, {useEffect, useState}  from "react";

const SubParamsForm = ({mdm285Config, setMdm285Config, equipSel}) => {

    const getMinDistance=()=>{
        let values = [];
        let config = mdm285Config.MDM285Config.filter(it => it.nomeEquipamento === equipSel)
        if(config[0]){
            config[0].distanciaMinimaReferencia.map((ref, idx) =>{
                values.push(ref.distanciaMinima);
            })
        } 
        return values;  
    }

    const updateMinDistance = (idx, value) =>{
        let config = mdm285Config.MDM285Config.filter(it => it.nomeEquipamento === equipSel)
        if(config[0]){
            config[0].distanciaMinimaReferencia[idx].distanciaMinima = Number(value);
        }
        setMdm285Config({ListaEquipamentos: mdm285Config.ListaEquipamentos, MDM285Config: mdm285Config.MDM285Config, error:mdm285Config.error})
        console.log('updated=', config[0].distanciaMinimaReferencia)
   }

    const getOperationPointsNames =() =>{    
        let operArrNames = [];
        let list = mdm285Config.ListaEquipamentos.filter(it => it.nome === equipSel)
   
        if(list[0]){
            list[0].pontosOperacao.map((op, idx) =>{
                operArrNames.push(op.nome);
            })
        }      
        return operArrNames;
    }

    const getSelectedOperationName =() =>{    
        let operSelArr = ['',''];
      //  if(equipSel){
            let config = mdm285Config.MDM285Config.filter(it => it.nomeEquipamento === equipSel)
            //const copyArr = validConfig.ValidacaoConfig.map(item => ({...item}));   

            if(config[0]){
                config[0].distanciaMinimaReferencia.map((ref, idx) =>{
                    operSelArr[idx]= ref.nomePontoOperacao;
                })
            }
           // console.log('operSelArr1=', operSelArr, equipSel);
            return operSelArr;
    //    }            
      //  return operSelArr;
    }

    const updateOperPoint = (idx, val)=>{

        let config = mdm285Config.MDM285Config.filter(it => it.nomeEquipamento === equipSel)
        if(config[0]){          
             config[0].distanciaMinimaReferencia[idx].nomePontoOperacao = val;
        } 
        setMdm285Config({ListaEquipamentos: mdm285Config.ListaEquipamentos, MDM285Config: mdm285Config.MDM285Config, error:mdm285Config.error})
        console.log('updated=', config[0].distanciaMinimaReferencia)      
    }

    return(
        <div > 
            <table className="table table-sm table-hover table-bordered">
                <thead className='table-light'>
                        <tr> 
                            <th scope="col"  style={{width: '50%'}}>Ponto de Operação:</th>   
                            <th scope="col" className="text-center"  style={{width: '50%'}} >Distancia min. p/ Referência:</th> 
                        </tr>
                </thead>          
                <tbody>
                    {getSelectedOperationName().map((itm, idx) => {                           
                        return  <tr key={idx} > 
                                    <td> 
                                        <select key={idx} disabled = {itm===''?true:false} className="form-select"  value={itm} onChange={(e)=>updateOperPoint(idx, e.target.value)}>                       
                                            {getOperationPointsNames().map((it, idj) =>                                                                                     
                                                <option key={idj} value={it}>{it}</option>
                                            )}
                                        </select>
                                    </td>   
                                    <td>
                                        <input type="number" className="form-control" disabled = {itm===''?true:false} value={equipSel?getMinDistance()[idx]:''} onChange={(e)=>updateMinDistance(idx, e.target.value)}></input>
                                    </td>                                                                                                  
                            </tr>
                        }
                    )}                             
                </tbody> 
            </table>              
        </div>
    )
    
}

export default SubParamsForm