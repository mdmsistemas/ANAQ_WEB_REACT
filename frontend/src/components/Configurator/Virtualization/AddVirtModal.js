
import React, {useEffect, useState} from 'react'
import SelectViForm from '../SelectViForm';
import AddTableDepsForm from '../AddTableDepsForm';
import AddTableEquipForm from '../AddTableEquipForm';

const AddVirtModal = ({handleClose, show, showModal, virtConfig, setVirtConfig, ptoSel, setPtoSel, handle})  =>{ 

    const [newVirtConfig, setNewVirtConfig] = useState(
        {
           "equipamentos":[], 
           "nomeVirtual":'', 
           "parametros":[],
           "variaveis": [],
           "variaveisDisjuntivas":false,
           "vi": ''
        }
    ); 

    const [title, setTitle] = useState('') ;
    const [nameState, setNameState] = useState(''); 
    const [selectedVi, setSelectedVi] = useState('');
    const [itemsDepsTable, setItemsDepsTable] = useState({items:[]});
    const [itemsEquipTable, setItemsEquipTable] = useState({items:[]});      
    const [errors, setErrors] = useState(['']);
     

    const setDefault = () => {
        setNameState('');            
        setSelectedVi('');
        setItemsDepsTable({items:[]});
        setItemsEquipTable({items:[]});
        setErrors(['']);
        setPtoSel('')
    }

    const getParameters = () => {
        let arr = virtConfig.Plugins.filter(it => it.String === selectedVi);
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
            "nomeVirtual":nameState, 
            "parametros":getParameters(),
            "variaveis": itemsDepsTable.items,
            "variaveisDisjuntivas":false,
            "vi": selectedVi
        }     
        setNewVirtConfig(newVirtConf); 
        console.log('newVirtConfig', newVirtConfig)      
    }

    const inputPointHandler = (value) =>{
        let idx =  virtConfig.VirtualizacaoConfig.findIndex(it => it.nomeVirtual === ptoSel);
        console.log('value',idx)
        let newState = [...errors];
        newState[0] = '';
        setErrors(newState)
        if(idx >= 0){
            setPtoSel(value)
            virtConfig.VirtualizacaoConfig[idx].nomeVirtual = value;
            setVirtConfig({Plugins: virtConfig.Plugins, VirtualizacaoConfig: virtConfig.VirtualizacaoConfig})
        }
        else{
            setNameState(value)          
        }       
    }
   
    const checkForm = () => {
        const { nomeVirtual, vi } = newVirtConfig;
        const errors = validate( nomeVirtual, vi);

        console.log("errors:", errors.length, errors) 
        if (!errors[0] && !errors[1]) {
            console.log("No errors")           
            handle(newVirtConfig); 
            setDefault();  
        }       
    }

    function validate(name, vi) {
        const errors = new Array(2);  
      
        if (name.length < 3) {            
          errors[0] = "Please name must be at least 3 characters"; 
        } 
        if (!vi){
            errors[1] = "Please select a valid vi."
        }         
        setErrors(errors);
        return errors;
    }   
    
    useEffect(() => {
        console.log("errors[0-1] :", errors[0], errors[1])
        if (!errors[0] && !errors[1]) {
            console.log("No Erros:", errors[0])
            handleClose();  
        } else{
            showModal(); 
        }      
    }, [errors[0], errors[1]])

   
    useEffect(() => {
       
       SavePoint(); 
           
    }, [nameState, selectedVi, itemsEquipTable, itemsDepsTable])


    useEffect(() => {  
        console.log('Editar/Add')    
        if(ptoSel){
               console.log('Editar Ponto')
               setErrors(['']);
               setTitle('Editar Ponto');
               let arr = virtConfig.VirtualizacaoConfig.filter(it => it.nomeVirtual === ptoSel);
               //console.log('viSelected:', arr[0])
               if(arr[0]){
                    setNameState(arr[0].nomeVirtual);
                    setSelectedVi(arr[0].vi);
                    setItemsDepsTable({items:arr[0].variaveis});
                    setItemsEquipTable({items:arr[0].equipamentos});                   
               }               
              
        } else{
            console.log('Adicionar Novo Ponto')
            setTitle('Adicionar Novo Ponto');
            setNameState('');            
            setSelectedVi('');
            setItemsDepsTable({items:[]});
            setItemsEquipTable({items:[]})
            setErrors(['']);          
        } 
              
    },[ptoSel])

    console.log('show=', show)    
    console.log('ptoSel=', ptoSel)  
   return (
              
         <div className="modal-dialog" id='myModal'>
            <div className="modal-content" >
                <div className="modal-header bg-light">
                    <h4 className="modal-title w-100 text-center" id="addModalLabel">{title}</h4>                   
                </div>                
                <div className="modal-body">
                    <div className="row justify-content-center">                                
                        <div className="row pb-1">
                            <label className="col-4 col-form-label" >Nome do Ponto:</label>
                            <div className="col-12">
                                <input type="text" className={errors[0]?'form-control is-invalid': 'form-control'} autoFocus placeholder={errors[0]?'':'Insira o nome do ponto...'}
                                    value={nameState} onChange={(e)=>inputPointHandler(e.target.value)}
                                />
                                {errors[0]? <p className="text-danger m-0">{errors[0]}</p>:''}
                                 
                            </div>
                        </div>             
                        <div className="row pb-3">
                            <SelectViForm resConfig={virtConfig} setResConfig={setVirtConfig} ptoSel={ptoSel} selectedVi={selectedVi} setSelectedVi={setSelectedVi} errors={errors} setErrors={setErrors}/>                                   
                            {errors[1]? <p className="text-danger m-0">{errors[1]}</p>:''}
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
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Cancelar</button>
                    <button type="submit" className="btn btn-primary" data-bs-dismiss={show?'':'modal'} onClick={() => {checkForm()}}>OK</button>
                </div>
            </div>
         </div> 
                       
   )

}

export default AddVirtModal;