import React, {useEffect, useState} from 'react'
import AddTableEquipForm from '../AddTableEquipForm';
import SelectViForm from '../SelectViForm';

const ImportCsvValidModal = ({resConfig, handle})  =>{ 

    const [selectedVi, setSelectedVi] = useState();
    const [itemsEquipTable, setItemsEquipTable] = useState({items:[]});
    const [csvFile, setCsvFile] = useState();    
    const [csvArray, setCsvArray] = useState([]); 
   
    const processCSV = (str, delim=';') => {
        let headers = str.slice(0,str.indexOf('\n')).split(delim);  
        let rows = str.slice(str.indexOf('\n')+1).split('\n');
        rows = rows.filter(String); 
        let outArr  = [];  

        rows.map(row => {   
            let deps  = [];
            let params = []
            let obj = {}  
            row = row.trim();                 
            const values = row.split(delim); 
                       
            headers.map((head, i) => {
                head = head.trim();              
                if(head==='DEP'){                    
                    deps.push({'nome':values[i]})
                } else if(head === 'ponto Monitorado'){
                    obj['nomePtoMon'] = values[i]
                } else {
                    params.push({'nome':head , 'valor':values[i]})
                }
            }) 
            obj['dependencias'] = deps;
            obj['parametros'] = params;
            obj['vi'] = selectedVi;
            obj['equipamentos'] = itemsEquipTable.items;
            outArr.push(obj)          
        }) 
       // console.log('outArr=',outArr)
        setCsvArray(outArr);
    }    

    const submit = () => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
           // console.log('text=',text);
            processCSV(text)
        }
        reader.readAsText(file);       
    }  

    useEffect(() => {
        handle(csvArray);
    }, [csvArray]) 


    return(
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header bg-light">
                    <h4 className="modal-title w-100 text-center" id="addModalLabel">Importar CSV</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="row justify-content-center"> 
                        <div className="row pb-2">
                            <SelectViForm resConfig={resConfig} selectedVi={selectedVi} setSelectedVi={setSelectedVi}/>                                   
                        </div> 
                        <div className='row'>
                             <AddTableEquipForm itemsEquipTable={itemsEquipTable} setItemsEquipTable={setItemsEquipTable}/>
                        </div> 
                        <div className='row'>
                            <label className="col-4 col-form-label" >Arquivo CSV:</label>
                            <div className="col-12">
                               <input type="file" className="form-control" accept='.csv' onChange={(e) => setCsvFile(e.target.files[0])}></input>                       
                            </div>
                        </div> 
                    </div>                     
                </div>                
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => {e.preventDefault(); if(csvFile)submit()}}>Importar</button>
                </div>
            </div> 
        </div>         
    )
}

export default ImportCsvValidModal