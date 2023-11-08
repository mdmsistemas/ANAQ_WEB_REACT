import React from "react";

const TableValidDepsForm = ({resConfig, setResConfig, setEnable, ptoSel, deleteItemKey}) => {
 
    const addDependence = () => { 
        let idx =  resConfig.ValidacaoConfig.findIndex(itm => itm.nomePtoMon === ptoSel);
        let newParams = resConfig.ValidacaoConfig[idx].dependencias;
        newParams.push({'nome':''});  
        setResConfig({Plugins: resConfig.Plugins, ValidacaoConfig: resConfig.ValidacaoConfig})
        setEnable(true);
        //console.log('updatedAdd=', resConfig.ValidacaoConfig)  
    }

    const inputDepNameHandler = (idj, value) =>{       
        let idx =  resConfig.ValidacaoConfig.findIndex(itm => itm.nomePtoMon === ptoSel);
        resConfig.ValidacaoConfig[idx].dependencias[idj].nome = value;
        setResConfig({Plugins: resConfig.Plugins, ValidacaoConfig: resConfig.ValidacaoConfig})   
        setEnable(true);     
        //console.log('updated=', resConfig.ValidacaoConfig)  
    }
 
    return(
      <div>
          <table className="table table-sm table-hover" style={{marginBottom:'-5px'}}>
               <thead>
                   <tr>                    
                       <th scope="col">Nome Pto. Monitorado</th>   
                       <th scope="col" style={{width: '5%'}}><i className="fas fa-plus-circle" style={{color:'green', cursor:'pointer'}} onClick={()=>addDependence()}></i></th>                                                  
                   </tr>
               </thead>
               <tbody> 
                   {resConfig.ValidacaoConfig.filter(it => it.nomePtoMon === ptoSel).map((itm, idx) =>  
                        itm.dependencias.map((vari, idj) => { 
                            return  <tr key={idj}>                       
                                        <td>
                                          <input type="text" className="form-control" value={vari.nome} style={{cursor: 'pointer'}} onChange={(e)=>inputDepNameHandler(idj, e.target.value)}></input>  
                                        </td>   
                                        <td><i className="fas fa-trash fa-sm" style={{color:'#d43535', cursor:'pointer'}} onClick={()=>deleteItemKey('dependencias', vari.nome)}></i></td>                                                                                    
                                    </tr>
                        })                        
                   )}                                           
               </tbody>
          </table>
      </div>
    )
    
}

export default TableValidDepsForm