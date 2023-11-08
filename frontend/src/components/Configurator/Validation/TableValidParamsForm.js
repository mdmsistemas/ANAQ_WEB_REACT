import React  from "react";

const TableValidParamsForm = ({resConfig, setResConfig, setEnable, ptoSel, paramSel, setParamSel, deleteItemKey}) => {
 
    const addParameter = () => { 
        let idx =  resConfig.ValidacaoConfig.findIndex(itm => itm.nomePtoMon === ptoSel);
        let newParams = resConfig.ValidacaoConfig[idx].parametros;
        newParams.push({'nome':'', 'valor': ''});  
        setResConfig({Plugins: resConfig.Plugins, ValidacaoConfig: resConfig.ValidacaoConfig})
        setEnable(true);
        //console.log('updatedAdd=', resConfig.ValidacaoConfig)  
    }

    const inputParamNameHandler = (idj, value) =>{     
        let idx =  resConfig.ValidacaoConfig.findIndex(itm => itm.nomePtoMon === ptoSel);
        resConfig.ValidacaoConfig[idx].parametros[idj].nome = value;
        setResConfig({Plugins: resConfig.Plugins, ValidacaoConfig: resConfig.ValidacaoConfig}) 
        setEnable(true);       
        //console.log('updated=', resConfig.ValidacaoConfig)  
    }

    const inputParamValueHandler = (idj, value) =>{       
        let idx =  resConfig.ValidacaoConfig.findIndex(itm => itm.nomePtoMon === ptoSel)
        resConfig.ValidacaoConfig[idx].parametros[idj].valor = value;
        setResConfig({Plugins: resConfig.Plugins, ValidacaoConfig: resConfig.ValidacaoConfig})
        setEnable(true);
       // console.log('updated=', resConfig.ValidacaoConfig)  
    }

    return(
      <div>
           <table className="table table-sm table-hover" style={{marginBottom:'-5px'}}>
               <thead>
                   <tr>                    
                       <th scope="col" style={{width: '70%'}}>Nome</th>
                       <th scope="col" style={{width: '25%'}}>Valor</th>    
                       <th style={{width: '5%'}}><i className="fas fa-plus-circle" style={{color:'green', cursor:'pointer'}} onClick={()=>addParameter()}></i></th>                     
                   </tr>
               </thead>
                   <tbody>
                      { 
                        resConfig.ValidacaoConfig.filter(it => ptoSel? (it.nomePtoMon === ptoSel):'').map((itm, idx) =>  
                            itm.parametros.map((itp, idj) => { 
                               return  <tr key={idj} className={(paramSel===itp.nome)?'table-active':''} onClick={()=>setParamSel(itp.nome)}>                       
                                           <td>
                                              <input type="text" className="form-control" value={itp.nome} style={{cursor: 'pointer'}} onChange={(e)=>inputParamNameHandler(idj, e.target.value)}></input>
                                           </td>
                                           <td className="text-center">
                                              <input type="text" className="form-control" value={itp.valor} style={{cursor: 'pointer'}} onChange={(e)=>inputParamValueHandler(idj, e.target.value)}></input>
                                           </td>    
                                           <td><i className="fas fa-trash fa-sm" style={{color:'#d43535', cursor:'pointer'}} onClick={()=>deleteItemKey('parametros', itp.nome)}></i></td>                                  
                                       </tr>
                           })                        
                        )
                      }                     
                   </tbody>
           </table>
      </div>
    )
    
}

export default TableValidParamsForm