import React, {useEffect, useState} from 'react'
import axios from 'axios'
//import LoadPageError from '../../Messages/LoadPageError';
//import LoadingSpinner from '../../Messages/LoadingSpinner';
import { useAutoRefresh } from '../../../context/AutoRefresh';
import AddVirtModal from './AddVirtModal';
import ImportCsvVirtModal from './ImportCsvVirtModal';
import ExportCsvVirtModal from './ExportCsvVirtModal';
import TableVirtPointsForm from './TableVirtPointsForm';
import TableVirtParamsForm from './TableVirtParamsForm';
import TableVirtDepsForm from './TableVirtDepsForm';
import TableVirtEquipForm from './TableVirtEquipForm';

const VirtualizationView = () => { 
   
    //const {refresh, setSpin, lang} = useAutoRefresh(); 
    const [ptoSel, setPtoSel] = useState('');
    const [paramSel, setParamSel] = useState('');
    //const [textArea, setTextArea] = useState('');
    const [enable, setEnable] = useState(false);  
    const [copyVirt, setCopyVirt] = useState();   
    //const [virtConfig, setVirtConfig] = useState({"Plugins":[], "VirtualizacaoConfig":[]});
    
   /* const loadVirtualConfig = async () =>{         
        let res = await axios.get(`JSON/WS_VIRT_CONFIG`);      
        setVirtConfig(res.data); 
    } */

    const [virtConfig, setVirtConfig] = useState(
        {
            "Plugins":[
                {
                    "String": "FET.vi",
                    "Array":
                    [
                        {
                            "nome":"",
                            "valor":"",
                            "descricao":"" 
                        } 
                    ]                    
                },
                {
                    "String": "Operador.vi",
                    "Array":
                    [
                        {
                            "nome":"",
                            "valor":"",
                            "descricao":"" 
                        } 
                    ]
                },
                {
                    "String": "subtracao.vi",
                    "Array":
                    [
                        {
                            "nome":"",
                            "valor":"",
                            "descricao":"" 
                        } 
                    ]

                },
                {
                    "String": "estatico_dinamico.vi",
                    "Array":
                    [
                        {
                            "nome":"TAXA_AMOSTRAGEM",
                            "valor":"186",
                            "descricao":"Taxa de amostragem para o sinal dinâmico resultante" 
                        } ,
                        {
                            "nome":"NUMERO_AMOSTRAS",
                            "valor":"186",
                            "descricao":"Número de amostras para o sinal dinâmico resultante" 
                        } 
                    ]

                },
                {
                    "String": "fasor-simulado.vi",
                    "Array":
                    [
                        {
                            "nome":"novo",
                            "valor":"666",
                            "descricao":"tste descriçao novo" 
                        } 
                    ]

                }
            ], 
            "VirtualizacaoConfig":[
                {
                    "nomeVirtual": "Queda",
                    "vi": "subtracao.vi",
                    "parametros":
                    [],
                    "variaveis":
                    [
                        {
                            "nome": "TN-UG-MON"
                        },
                        {
                            "nome": "TN-UG-JUS"
                        }
                    ],
                    "equipamentos":
                    [],
                    "variaveisDisjuntivas": false
                },
                {
                    "nomeVirtual": "Potência_Ativa_Virtual",
                    "vi": "estatico_dinamico.vi",
                    "parametros":
                    [
                        {
                            "nome": "TAXA_AMOSTRAGEM",
                            "valor": "186"
                        },
                        {
                            "nome": "NUMERO_AMOSTRAS",
                            "valor": "186"
                        }
                    ],
                    "variaveis":
                    [
                        {
                            "nome": "Potência_Ativa"
                        }
                    ],
                    "equipamentos":
                    [
                        {
                            "nome":"equipamneto1"
                        }
                    ],
                    "variaveisDisjuntivas": false
                },
                {
                    "nomeVirtual": "TO-TUR-PA_DIST_VIRTUAL",
                    "vi": "estatico_dinamico.vi",
                    "parametros":
                    [
                        {
                            "nome": "TAXA_AMOSTRAGEM",
                            "valor": "186"
                        },
                        {
                            "nome": "NUMERO_AMOSTRAS",
                            "valor": "186"
                        }
                    ],
                    "variaveis":
                    [
                        {
                            "nome": "TO-TUR-PA_DIST"
                        }
                    ],
                    "equipamentos":
                    [],
                    "variaveisDisjuntivas": false
                },
                {
                    "nomeVirtual": "TO-TUR-PA_KAP_VIRTUAL",
                    "vi": "estatico_dinamico.vi",
                    "parametros":
                    [
                        {
                            "nome": "TAXA_AMOSTRAGEM",
                            "valor": "186"
                        },
                        {
                            "nome": "NUMERO_AMOSTRAS",
                            "valor": "186"
                        }
                    ],
                    "variaveis":
                    [
                        {
                            "nome": "TO-TUR-PA_KAP"
                        }
                    ],
                    "equipamentos":
                    [],
                    "variaveisDisjuntivas": false
                }
            ]
        }
    );
      
  /*  useEffect(() => {
        loadVirtualConfig()
    }, [])  */ 


    const styleBadge = { 
        width:'28px',
        fontSize: '0.8em',
        fontWeight: '400',
        padding:'1.0px',
        border: 'solid',  
        marginLeft: '0em'       
    } 

    const styleBadgeLong = { 
        width:'115px', 
        fontSize: '1.0em', 
        fontWeight: '600',
        padding:'4.5px'               
    } 

    const getViSelectedPoint = ()=>{
        let virtArr = virtConfig.VirtualizacaoConfig.filter(it => it.nomeVirtual === ptoSel)
       // console.log('virt=',virtArr[0].vi);
        if (virtArr[0]) {return virtArr[0].vi}
        else { return ''}      
    }

    const getDescription = ()=>{    
       let arr = virtConfig.Plugins.filter(it => (ptoSel)? (it.String === getViSelectedPoint()):'')
       if(arr[0]){
          // console.log('arrParam1=',arr[0]);
           let arr1 = arr[0].Array.filter(ip => ip.nome === paramSel);         
           if (arr1[0]){
                return arr1[0].descricao;
           } else {return ''}
       } else {return ''} 
    }  

    const deleteItemKey = (key, name) => {
      //  if (key === 'parametros') {setcleanTextArea(true); console.log('cleanTextArea=',cleanTextArea)}
        let arr = virtConfig.VirtualizacaoConfig.filter(it => it.nomeVirtual === ptoSel);
        let idx = virtConfig.VirtualizacaoConfig.findIndex(it => it.nomeVirtual === ptoSel)
        let newArr;
        if(arr[0]){ 
            newArr = arr[0][key].filter(item => item.nome !== name) 
        }
        virtConfig.VirtualizacaoConfig[idx][key] = newArr;
        setVirtConfig({Plugins: virtConfig.Plugins, VirtualizacaoConfig: virtConfig.VirtualizacaoConfig});        
        setEnable(true);
       // console.log('updated=', virtConfig.VirtualizacaoConfig)  
    }    

    const handleAddingNewPoint = (item) => {      
        //console.log('New Item=', item);
        virtConfig.VirtualizacaoConfig.push(item);
        setVirtConfig({Plugins: virtConfig.Plugins, VirtualizacaoConfig: virtConfig.VirtualizacaoConfig});
        setPtoSel('');
        setEnable(true);
    }
    const handleImportPoints = (items)=>{
       // console.log('New items=', items);
        items.map(item =>{
            virtConfig.VirtualizacaoConfig.push(item);
            setVirtConfig({Plugins: virtConfig.Plugins, VirtualizacaoConfig: virtConfig.VirtualizacaoConfig});
        })        
        setPtoSel('');
        if (items.length>0){setEnable(true)};   
    }

    const deletePoint = () => {      
        let idx = virtConfig.VirtualizacaoConfig.findIndex(it => it.nomeVirtual === ptoSel);
        let updatedPoints = virtConfig.VirtualizacaoConfig;
        updatedPoints.splice(idx, 1); 
        setVirtConfig({Plugins: virtConfig.Plugins, VirtualizacaoConfig: updatedPoints})
        setPtoSel('');
        setEnable(true);
       // console.log('updated=', virtConfig.VirtualizacaoConfig)  
    }

    const copyPoint = () => { 
        const copyArr = virtConfig.VirtualizacaoConfig.map(item => ({...item}));   
        let idx = copyArr.findIndex(it => it.nomeVirtual === ptoSel);
        let point = copyArr[idx];
        point.nomeVirtual+='_copy';    
        //console.log('point=', point) 
        return point;
    }

    const pastePoint = () => {
        let updatedPoints = virtConfig.VirtualizacaoConfig;        
        updatedPoints.push(copyVirt)      
        setVirtConfig({Plugins: virtConfig.Plugins, VirtualizacaoConfig: updatedPoints})
        setCopyVirt('');   
        //console.log('updated2=', virtConfig.VirtualizacaoConfig) 
    }   

    const saveVirtConfig = async() =>{         
        console.log('salvo com sucesso !!')
        try {
          const res = await axios.post(`JSON/WS_VIRT_CONFIG` , virtConfig);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const updatedPoints = (items) => {  
        console.log('items:', items)
        //setVirtConfig(items)
    }
 


    return(       
        <div className="row">  
           <div className="col-md-7"> 
             <div className="d-flex row pb-2"> 
                <div className="col">
                  <button className="btn btn-sm rounded-pill btn-outline-dark me-md-4" title='Copiar novo ponto' disabled={ptoSel?false:true} style={styleBadge} onClick={()=>setCopyVirt(copyPoint())}><i className="fas fa-copy "></i></button>
                   <button className="btn btn-sm rounded-pill btn-outline-dark me-md-4" title='Colar novo ponto' disabled={copyVirt?false:true} style={styleBadge} onClick={()=>pastePoint()}><i className="fas fa-paste "></i></button>
                </div> 
                <div className="col" style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <button className="btn btn-sm rounded-pill btn-outline-dark me-md-2" data-bs-toggle="modal" title='Importar CSV' data-bs-target="#importCsvModal" style={styleBadge}><i className="fas fa-file-import"></i></button>                   
                    <button className="btn btn-sm rounded-pill btn-outline-dark me-md-2" disabled={ptoSel?false:true} title='Exportar CSV' data-bs-toggle="modal" data-bs-target="#exportCsvModal" style={styleBadge}><i className="fas fa-file-export"></i></button> 
                </div>
             </div>  
             <TableVirtPointsForm resConfig={virtConfig} setResConfig={setVirtConfig} setEnable={setEnable} ptoSel={ptoSel} setPtoSel={setPtoSel} getViSelectedPoint={getViSelectedPoint} handleToVirtual={updatedPoints}/>
             <div className="d-grid gap-2 mx-auto justify-content-center">
                    <button className="btn btn-sm rounded-pill btn btn-primary" disabled={enable?false:true}  onClick={()=>{if(window.confirm('Deseja salvar as configurações?')){saveVirtConfig()}}} style={styleBadgeLong} type="button">
                        <i className=""></i> Salvar
                    </button>
              </div>   
           </div>  

           <div className="col-md-5"  style={{paddingTop:'34px'}}>              
              <TableVirtParamsForm resConfig={virtConfig} setResConfig={setVirtConfig} setEnable={setEnable} ptoSel={ptoSel} paramSel={paramSel} setParamSel={setParamSel} deleteItemKey={deleteItemKey}/>
              <table className="table table-sm table-bordered">
                <thead className='table-light'>
                    <tr>  
                        <th scope="col" className="text-center" style={{width: '30%'}}>Dependências</th>    
                        <th scope="col" className="text-center" style={{width: '30%'}}>Equipamento</th>                                          
                    </tr>
                </thead>
                <tbody>
                  <tr>  
                   <td> 
                     <TableVirtDepsForm resConfig={virtConfig} setResConfig={setVirtConfig} setEnable={setEnable} ptoSel={ptoSel} deleteItemKey={deleteItemKey}/>
                   </td> 
                   <td> 
                     <TableVirtEquipForm resConfig={virtConfig} setResConfig={setVirtConfig} setEnable={setEnable} ptoSel={ptoSel} deleteItemKey={deleteItemKey}/>
                   </td>                   
                  </tr>
                </tbody>
              </table>
              <div className="pt-2">
                    <label  className="form-label">Descrição</label>
                    <textarea className="form-control" readOnly rows="2" value={getDescription()}></textarea>               
              </div> 
           </div>         

           {/* Modal Importar CSV */}
           <div className="modal fade" id="importCsvModal" tabIndex="-1" aria-labelledby="importModalLabel" aria-hidden="true">
               <ImportCsvVirtModal virtConfig={virtConfig} handle={handleImportPoints}/>
           </div> 

            {/* Modal Exportar CSV */}
            <div className="modal fade" id="exportCsvModal" tabIndex="-1" aria-labelledby="exportModalLabel" aria-hidden="true">
               <ExportCsvVirtModal virtConfig={virtConfig} getViSelectedPoint={getViSelectedPoint}/>
           </div> 
         
        </div> 
    ) 
}

export default VirtualizationView