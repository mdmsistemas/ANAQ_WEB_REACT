import React, {useState}  from "react";

const TableParamsUadsForm = ({DriversConfig, setDriversConfig, uadSel}) => {

    
    const [paramSel, setParamSel] = useState('');
    const [itemsParamTable, setItemsDepsTable] = useState({items:[]});

    const addParameter = () => { 
        let drivers = DriversConfig.UADsConfig.filter(itm => itm.Nome === uadSel);
        let idx = DriversConfig.UADsConfig.findIndex(itm => itm.Nome === uadSel)
        let params;
        if(drivers[0]){
          params = drivers[0].Parametros; 
        }
        params.push({'Nome':'', 'Valor':''});     
        DriversConfig.UADsConfig[idx].Parametros = params;     
        setDriversConfig({Plugins: DriversConfig.Plugins, UADsConfig: DriversConfig.UADsConfig, error:DriversConfig.error})
        //console.log('updated=', DriversConfig.UADsConfig)  
    }

    const deleteParameter = (name) => {
        let arr = DriversConfig.UADsConfig.filter(it => it.Nome === uadSel);
        let idx = DriversConfig.UADsConfig.findIndex(it => it.Nome === uadSel)
        let newArr;
        if(arr[0]){ 
            newArr = arr[0].Parametros.filter(item => item.Nome !== name) 
        }
        DriversConfig.UADsConfig[idx].Parametros = newArr;
        setDriversConfig({Plugins: DriversConfig.Plugins, UADsConfig: DriversConfig.UADsConfig, error:DriversConfig.error})
        //console.log('updated=', DriversConfig.UADsConfig)         
    }

    
    const inputParamNameHandler = (idj, value) =>{
        let idx = DriversConfig.UADsConfig.findIndex(it => it.Nome === uadSel)
        DriversConfig.UADsConfig[idx].Parametros[idj].Nome = value;        
        setDriversConfig({Plugins: DriversConfig.Plugins, UADsConfig: DriversConfig.UADsConfig, error:DriversConfig.error})
        //console.log('upd=',  DriversConfig.UADsConfig[idx].Parametros[idj])
    }

    const inputParamValueHandler = (idj, value) =>{
        let idx = DriversConfig.UADsConfig.findIndex(it => it.Nome === uadSel)
        DriversConfig.UADsConfig[idx].Parametros[idj].Valor = value;        
        setDriversConfig({Plugins: DriversConfig.Plugins, UADsConfig: DriversConfig.UADsConfig, error:DriversConfig.error})
        //console.log('upd=',  DriversConfig.UADsConfig[idx].Parametros[idj])
     }
    
    const stylePlusIcon =() =>{
      if(uadSel){
        let uad = DriversConfig.UADsConfig.filter(it => it.Nome === uadSel)        
        if (uad[0]){
            if(uad[0].Habilitado){
              return {width: '5%', color:'green'};
            }         
        } 
      }
      return {width: '5%', color:'green', pointerEvents: 'none', opacity: '0.4'}  
    }

 

    return(
       <div>
            <table className="table table-sm  table-hover" style={{marginBottom:'-5px'}}>
               <thead>
                   <tr>                                        
                       <th scope="col" className="text-center" style={{width: '47.5%'}}>Nome</th>
                       <th scope="col" className="text-center" style={{width: '47.5%'}}>Valor</th>                        
                       <th><div className="fas fa-plus-circle text-center" style={stylePlusIcon()} onClick={()=>addParameter()}></div></th> 
                   </tr>
               </thead>
               <tbody>
                      { 
                        DriversConfig.UADsConfig.filter(it => uadSel? (it.Nome === uadSel):'').map((itm, idx) =>  
                            itm.Parametros.map((itp, idj) => { 
                              if(itm.Habilitado){ 
                                return  <tr key={idj} className={(paramSel===itp.Nome)?'table-active':''} onClick={()=>setParamSel(itp.Nome)}>                       
                                            <td>
                                              <input type="text" className="form-control" value={itp.Nome} placeholder="Insira o nome..." onChange={(e)=>inputParamNameHandler(idj, e.target.value)}></input> 
                                            </td>
                                            <td>
                                              <input type="text" className="form-control" value={itp.Valor} placeholder="Insira o valor..." onChange={(e)=>inputParamValueHandler(idj, e.target.value)}></input> 
                                            </td>           
                                            <td className="align-middle"><i className="fas fa-trash fa-sm" style={{color:'#d43535'}} onClick={()=>deleteParameter(itp.Nome)}></i></td>                                  
                                        </tr>
                              }         
                           })                        
                        )
                      }                     
                </tbody>
            </table>
      </div>
    )
    
}

export default TableParamsUadsForm