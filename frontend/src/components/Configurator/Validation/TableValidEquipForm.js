import React from "react";

const TableValidEquipForm = ({resConfig, setResConfig, setEnable, ptoSel, deleteItemKey}) => {
 
    const addEquipment = () => { 
        let idx =  resConfig.ValidacaoConfig.findIndex(itm => itm.nomePtoMon === ptoSel);
        let newParams = resConfig.ValidacaoConfig[idx].equipamentos;
        newParams.push({'nome':''});  
        setResConfig({Plugins: resConfig.Plugins, ValidacaoConfig: resConfig.ValidacaoConfig});
        setEnable(true);
        //console.log('updatedAdd=', resConfig.ValidacaoConfig)  
    }

    const inputEquipNameHandler = (idj, value) =>{     
        let idx =  resConfig.ValidacaoConfig.findIndex(itm => itm.nomePtoMon === ptoSel);
        resConfig.ValidacaoConfig[idx].equipamentos[idj].nome = value;
        setResConfig({Plugins: resConfig.Plugins, ValidacaoConfig: resConfig.ValidacaoConfig});
        setEnable(true);        
        //console.log('updated=', resConfig.ValidacaoConfig)  
    }

    return(
      <div>
          <table className="table table-sm table-hover" style={{marginBottom:'-5px'}}>
                <thead>
                    <tr>                    
                       <th scope="col">Nome Equipamento</th>  
                       <th scope="col" style={{width: '5%'}}><i className="fas fa-plus-circle" style={{color:'green', cursor:'pointer'}} onClick={()=>addEquipment()}></i></th>                                                                                                                      
                    </tr>
                </thead>
                <tbody> 
                    {resConfig.ValidacaoConfig.filter(it => it.nomePtoMon === ptoSel).map((itm, idx) =>  
                        itm.equipamentos.map((equip, idj) => { 
                            return  <tr key={idj}>                       
                                        <td>
                                          <input type="text" className="form-control" value={equip.nome} style={{cursor: 'pointer'}} onChange={(e)=>inputEquipNameHandler(idj, e.target.value)}></input> 
                                        </td> 
                                        <td><i className="fas fa-trash fa-sm" style={{cursor:'pointer', color:'#d43535'}} onClick={()=>deleteItemKey('equipamentos',equip.nome)}></i></td>  
                                    </tr>
                        })                        
                    )}                                            
                </tbody>
          </table>
      </div>
    )
    
}

export default TableValidEquipForm