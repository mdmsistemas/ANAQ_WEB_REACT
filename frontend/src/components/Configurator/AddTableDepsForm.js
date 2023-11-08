import React from "react";

const AddTableDepsForm = ({itemsDepsTable, setItemsDepsTable}) => {

    const addDepsItem = () => { 
        let newitems = itemsDepsTable.items;
        newitems.push({'nome':''});    
        setItemsDepsTable({items:newitems});
    }

    const deleteDepsItem = (idx) =>{ 
        let updatedItems = itemsDepsTable.items;
        updatedItems.splice(idx, 1);  //.filter(it => it !== name)
        //console.log('updatedItems=', updatedItems)
        setItemsDepsTable({items:updatedItems});
    }

    const inputDepsHandler = (idx, value) =>{
        itemsDepsTable.items[idx].nome = value;
        setItemsDepsTable({items:itemsDepsTable.items})
    }

    const renderDepsTable = () => {       
        return itemsDepsTable.items.map(function(itm, idx) {      
            return (      
                <tr key={idx}>                                           
                    <td> 
                    <input type="text" className="form-control" autoFocus value={itm.nome} placeholder="Insira o nome do ponto..."  onChange={(e)=>inputDepsHandler(idx, e.target.value)}></input>                                                      
                    </td>   
                    <td><i className="fas fa-trash-alt fa-sm" style={{color:'#E6676B', cursor:'pointer'}} onClick={()=>deleteDepsItem(idx)}></i></td>                                              
                </tr>
            );      
        })
    } 
    

    return(
       <div>
            <label className="col-3 col-form-label" >Dependências:</label>
            <div className="col-12">
                <table className="table table-sm ">
                    <thead>
                        <tr>
                            <th scope="col" style={{width: '95%'}}>Nome Ponto Monitorado:</th>
                            <th style={{width: '5%'}}><i className="fas fa-plus-circle" style={{color:'green', cursor:'pointer'}} onClick={()=>addDepsItem()}></i></th>
                        </tr>
                    </thead>
                       <tbody>
                            {renderDepsTable()}  
                       </tbody>
                </table>
           </div>  
      </div>
    )
    
}

export default AddTableDepsForm