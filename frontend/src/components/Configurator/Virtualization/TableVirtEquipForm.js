import React  from "react";

const TableVirtEquipForm = ({resConfig, setResConfig, setEnable, ptoSel, deleteItemKey}) => {
 
    const addEquipment = () => { 
        let idx =  resConfig.VirtualizacaoConfig.findIndex(itm => itm.nomeVirtual === ptoSel);
        let newParams = resConfig.VirtualizacaoConfig[idx].equipamentos;
        newParams.push({'nome':''});  
        setResConfig({Plugins: resConfig.Plugins, VirtualizacaoConfig: resConfig.VirtualizacaoConfig});
        setEnable(true);
        //console.log('updatedAdd=', resConfig.VirtualizacaoConfig)  
    }

    const inputEquipNameHandler = (idj, value) =>{
        //setPtoSel(value)
        let idx =  resConfig.VirtualizacaoConfig.findIndex(itm => itm.nomeVirtual === ptoSel);
        resConfig.VirtualizacaoConfig[idx].equipamentos[idj].nome = value;
        setResConfig({Plugins: resConfig.Plugins, VirtualizacaoConfig: resConfig.VirtualizacaoConfig});
        setEnable(true);        
        //console.log('updated=', resConfig.VirtualizacaoConfig)  
    }

    return(
      <div>

               
          <table className="table  table-sm table-hover" style={{marginBottom:'-5px'}}>
                <thead>
                    <tr>                    
                       <th scope="col" className="fw-bold text-muted">Nome Equipamento</th>                                                                                                   
                    </tr>
                </thead>
                <tbody> 
                    {resConfig.VirtualizacaoConfig.filter(it => it.nomeVirtual === ptoSel).map((itm, idx) =>  
                        itm.equipamentos.map((equip, idj) => { 
                            return <tr key={idj}>                       
                                       <td>
                                           {equip.nome}
                                       </td>                                      
                                   </tr>
                        })                        
                    )}                                            
                </tbody>
          </table>
         
      </div>
    )
    
}

export default TableVirtEquipForm