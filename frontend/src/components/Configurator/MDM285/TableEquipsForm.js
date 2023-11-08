import React, {useEffect, useState}  from "react";

const TableEquipsForm = ({mdm285Config, setMdm285Config, equipSel, setEquipSel}) => {

    
    return(
       <div>
            <table className="table  table-hover table-bordered">
                <thead className='table-light'>
                    <tr>                    
                        <th scope="col">Equipamentos</th>                        
                    </tr>
                </thead>
                <tbody>
                    {mdm285Config.ListaEquipamentos.map((itm, idx) => {                           
                        return  <tr key={idx} className={(equipSel===itm.nome)?'table-active':''} style={{cursor: 'pointer'}} onClick={()=>setEquipSel(itm.nome)}> 
                                    <td> 
                                         {itm.nome}                                                                
                                    </td>                                                                                                                             
                                </tr>
                        }
                    )}                                        
                </tbody>
             </table>
      </div>
    )
    
}

export default TableEquipsForm