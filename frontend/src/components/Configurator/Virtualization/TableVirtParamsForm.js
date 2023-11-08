import React from "react";

const TableVirtParamsForm = ({resConfig, setResConfig, setEnable, ptoSel, paramSel, setParamSel, deleteItemKey}) => {
 
    const addParameter = () => { 
        let idx =  resConfig.VirtualizacaoConfig.findIndex(itm => itm.nomeVirtual === ptoSel);
        let newParams = resConfig.VirtualizacaoConfig[idx].parametros;
        newParams.push({'nome':'', 'valor': ''});  
        setResConfig({Plugins: resConfig.Plugins, VirtualizacaoConfig: resConfig.VirtualizacaoConfig})
        setEnable(true);
       // console.log('updatedAdd=', resConfig.VirtualizacaoConfig)  
    }

    const inputParamNameHandler = (idj, value) =>{
        //setPtoSel(value)
        let idx =  resConfig.VirtualizacaoConfig.findIndex(itm => itm.nomeVirtual === ptoSel);
        resConfig.VirtualizacaoConfig[idx].parametros[idj].nome = value;
        setResConfig({Plugins: resConfig.Plugins, VirtualizacaoConfig: resConfig.VirtualizacaoConfig}) 
        setEnable(true);       
        //.log('updated=', resConfig.VirtualizacaoConfig)  
    }

    const inputParamValueHandler = (idj, value) =>{       
        let idx =  resConfig.VirtualizacaoConfig.findIndex(itm => itm.nomeVirtual === ptoSel)
        resConfig.VirtualizacaoConfig[idx].parametros[idj].valor = value;
        setResConfig({Plugins: resConfig.Plugins, VirtualizacaoConfig: resConfig.VirtualizacaoConfig})
        setEnable(true);
       // console.log('updated=', resConfig.VirtualizacaoConfig)  
    }

    const tableScroll = { 
      height:'210px',
      overflow:'auto',        
    }
    return(
      <div style={tableScroll}>   
           <table className="table table-sm table-bordered">
                <thead className='table-light'>
                    <tr>                    
                        <th scope="col" className="text-center" style={{width: '40%'}}>Parâmetros</th>
                                                             
                    </tr>
                </thead>
                <tbody>
                  <tr>  
                   <td>
           <table className="table table-sm  table-hover " style={{marginBottom:'-5px'}}>
            
               <thead>
                   <tr>                    
                       <th scope="col" style={{width: '70%'}} className="fw-bold text-muted">Nome</th>
                       <th scope="col" style={{width: '25%'}} className="fw-bold text-muted">Valor</th>    
                       <th style={{width: '5%'}}><i className="fas fa-plus-circle" style={{color:'green', cursor:'pointer'}} onClick={()=>addParameter()}></i></th>            
                   </tr>
               </thead>
                   <tbody>
                      { 
                        resConfig.VirtualizacaoConfig.filter(it => ptoSel? (it.nomeVirtual === ptoSel):'').map((itm, idx) =>  
                          itm.parametros?(  
                            itm.parametros.map((itp, idj) => { 
                                  return  <tr key={idj} className={(paramSel===itp.nome)?'table-active':''} onClick={()=>setParamSel(itp.nome)}>                       
                                            <td>
                                              <input type="text" className="form-control" value={itp.nome} style={{cursor: 'pointer'}} onChange={(e)=>inputParamNameHandler(idj, e.target.value)}></input>
                                            </td>
                                            <td className="text-center">
                                              <input type="text" className="form-control" value={itp.valor} style={{cursor: 'pointer'}} onChange={(e)=>inputParamValueHandler(idj, e.target.value)}></input>
                                            </td>    
                                            <td className="align-middle"><i className="fas fa-trash-alt fa-sm " style={{color:'#E6676B', cursor:'pointer'}} onClick={()=>deleteItemKey('parametros', itp.nome)}></i></td>                                  
                                          </tr>                                       
                            }) 
                          ):''                         
                        )
                      }                     
                   </tbody>
           </table>
           </td>
                   </tr>
                </tbody>
           </table> 
      </div>
    )
    
}

export default TableVirtParamsForm