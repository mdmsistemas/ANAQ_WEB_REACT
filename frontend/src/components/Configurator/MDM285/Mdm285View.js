import React, {useEffect, useState} from 'react'
import axios from 'axios'
//import LoadPageError from '../../Messages/LoadPageError';
//import LoadingSpinner from '../../Messages/LoadingSpinner';
import TableEquipsForm from './TableEquipsForm';
import TableParamsForm from './TableParamsForm';

const Mdm285View = () => { 
   
   // const {refresh, setSpin, lang} = useAutoRefresh(); 
    const [equipSel, setEquipSel] = useState('');  
    const [enable, setEnable] = useState(false);  
    const [mdm285Config, setMdm285Config] = useState({"ListaEquipamentos":[], "MDM285Config":[], "error":''});
       
    const loadMdm285Config = async () =>{         
       let res = await axios.get(`JSON/WS_MDM285_CONFIG`);         
       setMdm285Config(res.data)
    } 
      
    useEffect(() => {
        loadMdm285Config() 
    }, [])  

    useEffect(() => {
        if((enable === false )&& equipSel){
            setEnable(true);
        }      
    }, [mdm285Config])  

        
    const styleBadge = { 
        width:'300px', 
        fontSize: '1.0em', 
        fontWeight: '600',
        padding:'4.5px'         
    } 

    const saveMdm285Config = async() =>{
 
        
        console.log('salvo com sucesso !!')
        try {
          const res = await axios.post(`JSON/WS_MDM285_CONFIG` , mdm285Config.MDM285Config);
        } catch (error) {
            console.log(error.response.data);
        }

    }
   
   
    return(       
        <div className="row"> 
            <div className="col-md-5"> 
                <TableEquipsForm mdm285Config={mdm285Config} setMdm285Config={setMdm285Config} equipSel={equipSel} setEquipSel={setEquipSel} />
           </div>
           <div className="col-md-7">               
                <TableParamsForm mdm285Config={mdm285Config} setMdm285Config={setMdm285Config} equipSel={equipSel} setEquipSel={setEquipSel}/>    
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-sm rounded-pill btn btn-success" disabled={enable?false:true}  onClick={()=>{if(window.confirm('Tem certeza que deseja salvar as configurações?')){ saveMdm285Config()}}} style={styleBadge} type="button">
                        <i className="fas fa-save"></i> Salvar
                    </button>                  
                </div>
           </div>  
        </div> 
    ) 
}

export default Mdm285View