import React, {useEffect, useState} from 'react'
import axios from 'axios'
//import LoadPageError from '../../Messages/LoadPageError';
//import LoadingSpinner from '../../Messages/LoadingSpinner';
import TableUadsForm from './TableUadsForm';
import TableParamsUadsForm from "./TableParamsUadsForm";

const DriversView = () => { 
   
   // const {refresh, setSpin, lang} = useAutoRefresh(); 
    const [uadSel, setUadSel] = useState('');
    const [selectedDriver, setSelectedDriver] = useState('');
    const [enable, setEnable] = useState(false);  
  
   // const [DriversConfig, setDriversConfig] = useState({"Plugins":[], "UADsConfig":[], "error":''});
    
  /*  const loadDriversConfig = async () =>{         
        let res = await axios.get(`JSON/WS_UADS_CONFIG`);          
        setDriversConfig(res.data)
    } */

    const [DriversConfig, setDriversConfig] = useState({
        "Plugins":[
            {
                "String":"UAD_DSEstaticos.lvlibp",
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
                "String":"UAD_DSBaixa.lvlibp",
                "Array":
                [
                    {
                    "nome":"",
                    "valor":"",
                    "descricao":"" 
                    }         
                ]                
            }            
        ], 
        "UADsConfig":[ 
            {
            "Nome": "UAD_MODBUS_CRIO02",
            "Driver": "UAD_DSEstaticos.lvlibp",
            "Habilitado" : true,
            "Parametros":
            [
                {
                    "Nome": "ip",
                    "Valor": "localhost"
                },
                {
                    "Nome": "porta",
                    "Valor": "22071"
                }
            ]
        },
        {
            "Nome": "UAD_CRIO1_BAIXA",
            "Driver": "",
            "Parametros":
            [
                {
                    "Nome": "ip",
                    "Valor": "localhost"
                },
                {
                    "Nome": "porta",
                    "Valor": "22071"
                },
                {
                    "Nome": "numblocos",
                    "Valor": "21"
                }
            ]
        },
        {
            "Nome": "UAD_PLC_UG01",
            "Driver": "UAD_DSEstaticos.lvlibp",
            "Habilitado" : true,
            "Parametros":
            [
                {
                    "Nome": "ip",
                    "Valor": "localhost"
                },
                {
                    "Nome": "porta",
                    "Valor": "22071"
                }
            ]
        },
        {
            "Nome": "UAD_MODBUS_CRIO01",
            "Driver": "UAD_DSEstaticos.lvlibp",
            "Parametros":
            [
                {
                    "Nome": "ip",
                    "Valor": "localhost"
                },
                {
                    "Nome": "porta",
                    "Valor": "22071"
                }
            ]
        },
        {
            "Nome": "UAD_PLC_SA",
            "Driver": "UAD_DSEstaticos.lvlibp",
            "Parametros":
            [
                {
                    "Nome": "ip",
                    "Valor": "localhost"
                },
                {
                    "Nome": "porta",
                    "Valor": "22071"
                }
            ]
        },
        {
            "Nome": "UAD_CRIO2_BAIXA",
            "Driver": "UAD_DSBaixa.lvlibp",
            "Habilitado" : true,
            "Parametros":
            [
                {
                    "Nome": "ip",
                    "Valor": "localhost"
                },
                {
                    "Nome": "porta",
                    "Valor": "22071"
                },
                {
                    "Nome": "numblocos",
                    "Valor": "21"
                }
            ]
        },
        {
            "Nome": "UAD_PLC_UG02",
            "Driver": "UAD_DSEstaticos.lvlibp",
            "Parametros":
            [
                {
                    "Nome": "ip",
                    "Valor": "localhost"
                },
                {
                    "Nome": "porta",
                    "Valor": "22071"
                }
            ]
        }],
        "error":{
            "code":"", 
            "source":"", 
            "status":""
    }});
      
  /*  useEffect(() => {
        loadDriversConfig()
    }, [])  */

   /* const toogleOnOff = () => {   
        let uad = DriversConfig.UADsConfig.filter(it => it.Nome === uadSel)        
        if (uad[0]){
           uad[0].Habilitado = !uad[0].Habilitado;            
        }   
        setDriversConfig({Plugins: DriversConfig.Plugins, UADsConfig: DriversConfig.UADsConfig, error:DriversConfig.error})
    }

    function setButtonToogle() {        
  
        let uad = DriversConfig.UADsConfig.filter(it => it.Nome === uadSel);
        let bool = uad[0].Habilitado;
        
        if (bool) {    
            return <button className="btn btn-sm rounded-pill btn-outline-danger" style={styleBadge} onClick={()=>toogleOnOff()}>
                        <i className="fas fa-power-off"></i> Desabilitar
                   </button>  
        } else{
            return <button className="btn btn-sm rounded-pill btn-outline-success" style={styleBadge} onClick={()=>toogleOnOff()}>
                        <i className="fas fa-power-off"></i> Habilitar
                   </button>  
        }          
    }*/

    useEffect(() => {
        if((enable === false )&& uadSel){
            setEnable(true);
        }      
    }, [DriversConfig]) 

   /*useEffect(() => {
        if((isChecked === true )){
            toogleOnOff()
        }      
    }, ) */

    const styleBadge = { 
        width:'115px', 
        fontSize: '1.0em', 
        fontWeight: '600',
        padding:'4.5px'         
    } 

    const styleBadgeSave = { 
        width:'240px', 
        fontSize: '1.0em', 
        fontWeight: '600',
        padding:'4.7px'         
    } 

    const saveDriversConfig = async() =>{ 
        
        console.log('salvo com sucesso !!')
        try {
          const res = await axios.post(`JSON/WS_UADS_CONFIG` , DriversConfig.UADsConfig);
        } catch (error) {
            console.log(error.response.data);
        }

    }
   
    return(       
        <div className="row"> 
           <div className="col-md-7"> 
                <TableUadsForm DriversConfig={DriversConfig} setDriversConfig={setDriversConfig} uadSel={uadSel} setUadSel={setUadSel}/>
           </div>
           <div className="col-md-5">            
                <table className="table table-sm " style={{cursor: 'pointer'}}>
                    <thead className=''>
                        <tr>                    
                          <th scope="col" className="text-center" >Parâmetros</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr> 
                           <td> 
                            <TableParamsUadsForm DriversConfig={DriversConfig} setDriversConfig={setDriversConfig} uadSel={uadSel} />
                           </td>
                        </tr>
                    </tbody>
                </table>  
                <div className="d-grid gap-2 col-6 mx-auto justify-content-center">
                    <button className="btn btn-sm rounded-pill btn btn-primary" disabled={enable?false:true} style={styleBadge} type="button"
                            onClick={()=>{if(window.confirm('Deseja salvar as configurações?')){saveDriversConfig()}}} >
                        <i className=""></i> Salvar
                    </button>
                </div>
                     
           </div>  
        </div> 
    ) 
}

export default DriversView