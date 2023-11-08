import React, {useEffect, useState}  from "react";
import  "../../../style.css"

const TableVirtDepsForm = ({resConfig, setResConfig, setEnable, ptoSel, deleteItemKey}) => {
 
    const addDependence = () => { 
        let idx =  resConfig.VirtualizacaoConfig.findIndex(itm => itm.nomeVirtual === ptoSel);
        let newParams = resConfig.VirtualizacaoConfig[idx].variaveis;
        newParams.push({'nome':''});  
        setResConfig({Plugins: resConfig.Plugins, VirtualizacaoConfig: resConfig.VirtualizacaoConfig})
        setEnable(true);
        //console.log('updatedAdd=', resConfig.VirtualizacaoConfig)  
    }

    const inputDepNameHandler = (idj, value) =>{       
        let idx =  resConfig.VirtualizacaoConfig.findIndex(itm => itm.nomeVirtual === ptoSel);
        resConfig.VirtualizacaoConfig[idx].variaveis[idj].nome = value;
        setResConfig({Plugins: resConfig.Plugins, VirtualizacaoConfig: resConfig.VirtualizacaoConfig})   
        setEnable(true);     
        //console.log('updated=', resConfig.VirtualizacaoConfig)  
    }

    useEffect(() => {
        console.log('resConfigDeps=', resConfig.VirtualizacaoConfig)  
    }, []) 

    const tableScroll = { 
        height:'130px',
        overflow:'auto',        
    }

    const fixedHead ={
        position: 'sticky', 
        top: '0',        
        background:'white'        
      }

    return(
      <div style={tableScroll} id="style-3"> 
         
          <table className="table table-sm table-hover"  style={{marginBottom:'-5px'}}>
               <thead style={fixedHead}>
                   <tr>                    
                       <th scope="col" className="fw-bold text-muted "  >Nome Pto. Monitorado</th>   
                   </tr>
               </thead>               
               <tbody > 
                
                   {resConfig.VirtualizacaoConfig.filter(it => it.nomeVirtual === ptoSel).map((itm, idx) =>  
                        itm.variaveis.map((vari, idj) => { 
                            return  <tr key={idj}>                       
                                       <td>
                                            {vari.nome} 
                                       </td> 
                                    </tr>
                        })                        
                   )} 
                                                            
               </tbody>           
          </table>
      </div>
    )
    
}

export default TableVirtDepsForm