import React, {useEffect, useState} from 'react'
import SelectViForm from '../SelectViForm';
import AddTableDepsForm from '../AddTableDepsForm';
import AddTableEquipForm from '../AddTableEquipForm'

const AddValidModal = ({resConfig, handle})  =>{ 

    const [newVirtConfig, setNewVirtConfig] = useState(
        {
           "equipamentos":[], 
           "nomePtoMon":'', 
           "parametros":[],
           "dependencias": [],           
           "vi": ''
        }
    ); 

    const [nameState, setNameState] = useState(''); 
    const [selectedVi, setSelectedVi] = useState();
    const [itemsDepsTable, setItemsDepsTable] = useState({items:[]});
    const [itemsEquipTable, setItemsEquipTable] = useState({items:[]});      

    const getParameters = () => {
        let arr = resConfig.Plugins.filter(it => it.String === selectedVi);
        let params = []
        if(arr[0]){
            arr[0].Array.map((itm, idx) => {
                params.push({ "nome":itm.nome, "valor":itm.valor})
            })
            return params;
        }
        else {return ''}
    }

    const SavePoint= () =>{      
        let newVirtConf =  {
            "equipamentos":itemsEquipTable.items, 
            "nomePtoMon":nameState, 
            "parametros":getParameters(),
            "dependencias": itemsDepsTable.items,           
            "vi": selectedVi
         }
        setNewVirtConfig(newVirtConf)       
        //console.log('newVirtConfig', newVirtConfig )
    }

    useEffect(() => {
        SavePoint();
    }, [nameState, selectedVi, itemsEquipTable, itemsDepsTable])

    
   return (
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header bg-light">
                    <h4 className="modal-title w-100 text-center" id="addModalLabel">Adicionar Novo Ponto</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="row justify-content-center">                                
                        <div className="row pb-1">
                            <label className="col-4 col-form-label" >Nome do Ponto:</label>
                            <div className="col-12">
                                <input type="text" className="form-control" autoFocus placeholder="Insira o nome do ponto..." value={nameState} onChange={(e)=>setNameState(e.target.value)}></input>
                            </div>
                        </div> 
                        <div className="row pb-3">
                            <SelectViForm resConfig={resConfig} selectedVi={selectedVi} setSelectedVi={setSelectedVi}/>                                   
                        </div>                         
                        <div className='row'>
                            <AddTableDepsForm itemsDepsTable={itemsDepsTable} setItemsDepsTable={setItemsDepsTable}/>                                     
                        </div>
                        <div className='row'>
                            <AddTableEquipForm itemsEquipTable={itemsEquipTable} setItemsEquipTable={setItemsEquipTable}/>                                    
                        </div>              
                    </div>                                 
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handle(newVirtConfig)}>OK</button>
                </div>
            </div>
        </div>               
   )

}

export default AddValidModal;