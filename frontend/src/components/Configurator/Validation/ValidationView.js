import React, {useEffect, useState} from 'react'
import axios from 'axios'
//import LoadPageError from '../../Messages/LoadPageError';
//import LoadingSpinner from '../../Messages/LoadingSpinner';
import { useAutoRefresh } from '../../../context/AutoRefresh';
import TableValidPointsForm from './TableValidPointsForm'
import TableValidParamsForm from './TableValidParamsForm';
import TableValidDepsForm from './TableValidDepsForm'
import TableValidEquipForm from './TableValidEquipForm';
import AddValidModal from './AddValidModal'
import ImportCsvValidModal from './ImportCsvValidModal'
import ExportCsvValidModal from './ExportCsvValidModal'

const ValidationView = () => { 
   
    //const {refresh, setSpin, lang} = useAutoRefresh(); 
    const [ptoSel, setPtoSel] = useState('');
    const [paramSel, setParamSel] = useState('');      
    const [enable, setEnable] = useState(false);  
    const [copyVal, setCopyVal] = useState();  
    const [validConfig, setValidConfig] = useState({"Plugins":[], "ValidacaoConfig":[]});
    
    const loadValidConfig = async () =>{         
        let res = await axios.get(`JSON/WS_VALID_CONFIG`);     
        setValidConfig(res.data); 
    } 
      
    useEffect(() => {
        loadValidConfig()
    }, [])   

    const styleBadge = { 
        width:'33px', 
        fontSize: '1.0em', 
        fontWeight: '500',
        padding:'1.0px',
        border: 'solid',
       
    } 

    const styleBadgeLong = { 
        width:'300px', 
        fontSize: '1.0em', 
        fontWeight: '600',
        padding:'2.5px',                
    } 

    const getViSelectedPoint = ()=>{
        let virtArr = validConfig.ValidacaoConfig.filter(it => it.nomePtoMon === ptoSel)
       // console.log('virt=',virtArr[0].vi);
        if (virtArr[0]) {return virtArr[0].vi}
        else { return ''}      
    }

    const getDescription = ()=>{    
       let arr = validConfig.Plugins.filter(it => (ptoSel)? (it.String === getViSelectedPoint()):'')
       if(arr[0]){
          // console.log('arrParam1=',arr[0]);
           let arr1 = arr[0].Array.filter(ip => ip.nome === paramSel);         
           if (arr1[0]){
                return arr1[0].descricao;
           } else {return ''}
       } else {return ''} 
    }     
   // console.log('ptoSel=',ptoSel);

    const deleteItemKey = (key, name) => {
        let arr = validConfig.ValidacaoConfig.filter(it => it.nomePtoMon === ptoSel);
        let idx = validConfig.ValidacaoConfig.findIndex(it => it.nomePtoMon === ptoSel)
        let newArr;
        if(arr[0]){ 
            newArr = arr[0][key].filter(item => item.nome !== name) 
        }
        validConfig.ValidacaoConfig[idx][key] = newArr;
        setValidConfig({Plugins: validConfig.Plugins, ValidacaoConfig: validConfig.ValidacaoConfig});        
        setEnable(true);
        console.log('updated=', validConfig.ValidacaoConfig)  
    }    

    const handleAddingNewPoint = (item) => {      
       // console.log('New Item=', item);
        validConfig.ValidacaoConfig.push(item);
        setValidConfig({Plugins: validConfig.Plugins, ValidacaoConfig: validConfig.ValidacaoConfig});
        setPtoSel('')
        setEnable(true);
    }

    const handleImportPoints = (items)=>{
       // console.log('New items=', items);
        items.map(item =>{
            validConfig.ValidacaoConfig.push(item);
        })   
        setValidConfig({Plugins: validConfig.Plugins, ValidacaoConfig: validConfig.ValidacaoConfig});
        setPtoSel('');
        if (items.length>0){setEnable(true)};       
    }

    const deletePoint = () => {      
        let idx = validConfig.ValidacaoConfig.findIndex(it => it.nomePtoMon === ptoSel);
        let updatedPoints = validConfig.ValidacaoConfig;
        updatedPoints.splice(idx, 1); 
        setValidConfig({Plugins: validConfig.Plugins, ValidacaoConfig: updatedPoints})
        setPtoSel('')
        setEnable(true);
       // console.log('updated=', validConfig.ValidacaoConfig)  
    }

    const copyPoint = () => { 
        const copyArr = validConfig.ValidacaoConfig.map(item => ({...item}));   
        let idx = copyArr.findIndex(it => it.nomePtoMon === ptoSel);
        let point = copyArr[idx];
        point.nomeVirtual+='_copy'; 
        return point;
    }

    const pastePoint = () => {
        let updatedPoints = validConfig.ValidacaoConfig;        
        updatedPoints.push(copyVal)      
        setValidConfig({Plugins: validConfig.Plugins, ValidacaoConfig: updatedPoints})
        setCopyVal('');   
       // console.log('updated2=', validConfig.ValidacaoConfig) 
    } 
     
    const saveValidConfig = async() =>{         
        console.log('salvo com sucesso !!')
        try {
          const res = await axios.post(`JSON/WS_VALID_CONFIG` , validConfig);
        } catch (error) {
            console.log(error.response.data);
        }
    }
    

    return(       
        <div className="row">  
           <div className="col-md-5"> 
            <div className="d-flex row pb-2"> 
                <div className="col">
                   <button className="btn btn-sm rounded-pill btn-outline-primary me-md-4" title='Adicionar novo ponto' data-bs-toggle="modal" data-bs-target="#addModal1" style={styleBadge}><i className="fas fa-plus fa-sm fa-fw"></i></button>
                   <button className="btn btn-sm rounded-pill btn-outline-danger me-md-4" title='Remover novo ponto' disabled={ptoSel?false:true} style={styleBadge} onClick={()=>deletePoint()}><i className="fas fa-trash fa-sm fa-fw" ></i></button>
                   <button className="btn btn-sm rounded-pill btn-outline-dark me-md-4" title='Copiar novo ponto' disabled={ptoSel?false:true} style={styleBadge} onClick={()=>setCopyVal(copyPoint())}><i className="fas fa-copy fa-sm fa-fw"></i></button>
                   <button className="btn btn-sm rounded-pill btn-outline-dark me-md-4" title='Colar novo ponto' disabled={copyVal?false:true} style={styleBadge} onClick={()=>pastePoint()}><i className="fas fa-paste fa-sm fa-fw"></i></button>
                </div> 
                <div className="col" style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <button className="btn btn-sm rounded-pill btn-outline-dark me-md-2" data-bs-toggle="modal" title='Importar CSV' data-bs-target="#importCsvModal1" style={styleBadge}><i className="fas fa-file-import fa-sm fa-fw"></i></button>                   
                    <button className="btn btn-sm rounded-pill btn-outline-dark me-md-2" disabled={ptoSel?false:true} title='Exportar CSV' data-bs-toggle="modal" data-bs-target="#exportCsvModal1" style={styleBadge}><i className="fas fa-file-export fa-sm fa-fw"></i></button> 
                </div>
             </div> 
             <TableValidPointsForm resConfig={validConfig} setResConfig={setValidConfig} ptoSel={ptoSel} setPtoSel={setPtoSel} getViSelectedPoint={getViSelectedPoint}/>
           </div> 
           <div className="col-md-7" style={{paddingTop:'39px'}}> 
              <table className="table table-sm table-bordered">
                <thead className='table-light'>
                    <tr>                    
                        <th scope="col" className="text-center" style={{width: '40%'}}>Parâmetros</th>
                        <th scope="col" className="text-center" style={{width: '30%'}}>Dependências</th>    
                        <th scope="col" className="text-center" style={{width: '30%'}}>Equipamento</th>                                          
                    </tr>
                </thead>
                <tbody>
                  <tr>  
                   <td> 
                       <TableValidParamsForm resConfig={validConfig} setResConfig={setValidConfig} setEnable={setEnable} ptoSel={ptoSel} paramSel={paramSel} setParamSel={setParamSel} deleteItemKey={deleteItemKey}/>
                   </td> 
                   <td> 
                       <TableValidDepsForm resConfig={validConfig} setResConfig={setValidConfig} setEnable={setEnable} ptoSel={ptoSel} deleteItemKey={deleteItemKey}/>
                   </td>
                   <td> 
                       <TableValidEquipForm resConfig={validConfig} setResConfig={setValidConfig} setEnable={setEnable} ptoSel={ptoSel} deleteItemKey={deleteItemKey}/>
                   </td>
                   </tr>
                </tbody>
              </table> 
              <div className="">
                    <label  className="form-label">Descrição</label>
                    <textarea className="form-control" readOnly rows="3" value={getDescription()}></textarea>               
              </div> 
              <div className="d-grid gap-2 col-5 mx-auto pt-3">
                    <button className="btn btn-sm rounded-pill btn btn-success" disabled={enable?false:true}  onClick={()=>{if(window.confirm('Tem certeza que deseja salvar as configurações?')){saveValidConfig()}}} style={styleBadgeLong} type="button">
                        <i className="fas fa-save"></i> Salvar
                    </button>
               </div>          
           </div>

           {/* Modal Adicionar Ponto */}
           <div className="modal fade" id="addModal1" tabIndex="-1" aria-labelledby="addModalLabel1" aria-hidden="true">
                <AddValidModal resConfig={validConfig} handle={handleAddingNewPoint}/>
           </div> 

           {/* Modal Importar CSV */}
           <div className="modal fade" id="importCsvModal1" tabIndex="-1" aria-labelledby="importModalLabel1" aria-hidden="true">
                <ImportCsvValidModal resConfig={validConfig} handle={handleImportPoints}/>
           </div> 

            {/* Modal Exportar CSV */}
            <div className="modal fade" id="exportCsvModal1" tabIndex="-1" aria-labelledby="exportModalLabel1" aria-hidden="true">
                <ExportCsvValidModal resConfig={validConfig}  getViSelectedPoint={getViSelectedPoint}/>
            </div> 
         
        </div> 
    ) 
}

export default ValidationView