import React  from "react";

const AddTableEquipForm = ({itemsEquipTable, setItemsEquipTable}) => {
    
    const addEquipItem = () => { 
        let newitems = itemsEquipTable.items;
        newitems.push({'nome':''});      
        setItemsEquipTable({items:newitems});    
    }

    const deleteEquipItem = (idx) =>{ 
        let updatedItems = itemsEquipTable.items;
        updatedItems.splice(idx, 1);     
        setItemsEquipTable({items:updatedItems});
    }

    const inputEquipHandler = (idx, value) =>{
        itemsEquipTable.items[idx].nome = value;
        setItemsEquipTable({items:itemsEquipTable.items})
    }

    const renderEquipTable = () => {        
        return itemsEquipTable.items.map(function(itm, idx) {      
             return (      
                 <tr key={idx}>                                           
                     <td> 
                     <input type="text" className="form-control" autoFocus value={itm.nome} placeholder="Insira o nome do equipamento..."  onChange={(e)=>inputEquipHandler(idx, e.target.value)}></input>                                                      
                     </td>   
                     <td><i className="fas fa-trash fa-sm" style={{color:'#d43535', cursor:'pointer'}} onClick={()=>deleteEquipItem(idx)}></i></td>                                              
                 </tr>
             );      
         })
    }

    return(
       <div>
            <label className="col-3 col-form-label" style={{width:'159px'}}>Equipamento:</label>
            <div className="col-12">
                <table className="table table-sm ">
                <thead>
                        <tr>
                            <th scope="col" style={{width: '95%'}}>Nome Equipamento:</th>
                            <th style={{width: '5%'}}><i className="fas fa-plus-circle" style={{color:'green', cursor:'pointer'}} onClick={()=>addEquipItem()}></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderEquipTable()}  
                    </tbody>
                </table>
            </div> 
      </div>
    )
    
}

export default AddTableEquipForm