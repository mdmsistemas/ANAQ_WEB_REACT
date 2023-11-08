import React from "react";

const TableValidPointsForm = ({resConfig, setResConfig, ptoSel, setPtoSel, getViSelectedPoint}) => {

    const getParameters = () => {
        let arr = resConfig.Plugins.filter(it => ptoSel? (it.String === getViSelectedPoint()):'');
        let params = []
        if(arr[0]){
            arr[0].Array.map((itm, idx) => {
                params.push({ "nome":itm.nome, "valor":itm.valor})
            })
            return params;
        }
        else {return ''}
    }

    const updateSelectedVi = (idx, val)=>{
        resConfig.ValidacaoConfig[idx].vi = val;
        resConfig.ValidacaoConfig[idx].parametros = getParameters();      
        setResConfig({Plugins: resConfig.Plugins, ValidacaoConfig: resConfig.ValidacaoConfig})
       // console.log('updated=', virtConfig.VirtualizacaoConfig[idx])       
    } 
 
    const inputPointHandler = (idx, value) =>{
         setPtoSel(value)
         resConfig.ValidacaoConfig[idx].nomePtoMon = value;
         setResConfig({Plugins: resConfig.Plugins, ValidacaoConfig: resConfig.ValidacaoConfig})         
         //console.log('updated=', resConfig.ValidacaoConfig)  
    }


    return(
       <div>
            <table className="table table-sm table-hover table-bordered">
                <thead className='table-light'>
                    <tr>                    
                        <th scope="col" style={{width: '56%'}}>Ponto Monitorado</th>
                        <th scope="col" className="text-center" style={{width: '44%'}}>VI</th>                                            
                    </tr>
                </thead>
                <tbody>
                    {resConfig.ValidacaoConfig.map((itm, idx) => {                           
                        return  <tr key={idx} className={(ptoSel===itm.nomePtoMon)?'table-active':''} onClick={()=>setPtoSel(itm.nomePtoMon)}> 
                                    <td> 
                                       <input type="text" className="form-control" value={itm.nomePtoMon} style={{cursor: 'pointer'}} onChange={(e)=>inputPointHandler(idx, e.target.value)}></input>                                                      
                                    </td> 
                                    <td>
                                      <select className="form-select" defaultValue={itm.vi} onChange={(e)=>updateSelectedVi(idx, e.target.value)}>
                                          {resConfig.Plugins.map((it, idj) =>                                                                                     
                                             <option key={idj} value={it.String}>{it.String}</option>
                                          )}
                                      </select>
                                    </td>                                                                      
                                </tr>
                        }
                    )}                                        
                </tbody>
             </table>
      </div>
    )
    
}

export default TableValidPointsForm