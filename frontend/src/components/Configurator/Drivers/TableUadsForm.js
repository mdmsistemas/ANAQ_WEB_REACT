import React, {useState, useEffect}  from "react";

const TableUadsForm = ({DriversConfig, setDriversConfig, uadSel, setUadSel}) => {

    const [isHover, setIsHover] = useState('');
    const [showEnable, setshowEnable] = useState('');
    const [rowColors, setRowColors] = useState([]);
    
    useEffect(() => {
        let arr = [];
        DriversConfig.UADsConfig.map((it, idx) => {            
            arr[idx] = it.Habilitado; 
        });  
        setRowColors(arr)
    },[DriversConfig]) 

    const handleMouseEnter = (uadSelected, enable) => {
        setIsHover(uadSelected);
        if(enable == false){
            setshowEnable('Desabilitar')
        }else {setshowEnable('Habilitar')}
        
     };
     const handleMouseLeave = (uadSelected, enable) => {
        setIsHover('');
     };
     
    const getDriverSelected = ()=>{
        let uad = DriversConfig.UADsConfig.filter(it => it.Nome === uadSel)
        console.log('uad=', uad);
        if (uad[0]) {return uad[0].Driver}
        else { return ''}      
    }

    const getParameters = () => {
        console.log('uadSel',uadSel)
        let arr = DriversConfig.Plugins.filter(it => uadSel? (it.String === getDriverSelected()):'');
        console.log('arr',arr)
        let params = []
        if(arr[0]){
            arr[0].Array.map((itm, idx) => {
                if(itm.nome && itm.valor)
                     params.push({ "Nome":itm.nome, "Valor":itm.valor})
            })
            return params;
        }
        else {return params}
    }

    const updateSelectedDriver = (idx, val)=>{
        DriversConfig.UADsConfig[idx].Driver = val;
        let newParams = getParameters();
        console.log('newParams: ', idx, val, newParams)
        if(newParams.length > 0){
           DriversConfig.UADsConfig[idx].Parametros = newParams;
        }              
        setDriversConfig({Plugins: DriversConfig.Plugins, UADsConfig: DriversConfig.UADsConfig, error:DriversConfig.error})
        //console.log('updated=', DriversConfig.UADsConfig[idx])       
    } 

    const enableformSelect = (uadId) => {      
        let uad = DriversConfig.UADsConfig.filter(it => it.Nome === uadId)        
        if (!uad[0].Habilitado){
            uad[0].Habilitado = true;            
        } else{
            uad[0].Habilitado = false;
        }
        setUadSel(uadId)
    }

    const handleOnChange = event => {
        if (event.target.checked) {                   
            let uadChecked = event.target.id     
            console.log(' Checkbox is checked', uadChecked);    
            enableformSelect(uadChecked) 
            
        } else {           
            let uadNottChecked = event.target.id   
            console.log(' Checkbox is not checked', uadNottChecked);
            enableformSelect(uadNottChecked) 
        }
        setDriversConfig({Plugins: DriversConfig.Plugins, UADsConfig: DriversConfig.UADsConfig, error:DriversConfig.error})
       
    };

    const toogleOnOff = (uadSel) => {   
        let uad = DriversConfig.UADsConfig.filter(it => it.Nome === uadSel)        
        if (uad[0]){
           // console.log('hab', uad[0].Habilitado)           
            uad[0].Habilitado = !uad[0].Habilitado; 
            if (uad[0].Habilitado  == true){setshowEnable('Desabilitar')}  
            else{setshowEnable('Habilitar')}         
        }   
        setDriversConfig({Plugins: DriversConfig.Plugins, UADsConfig: DriversConfig.UADsConfig, error:DriversConfig.error})
    }

    function setButtonToogle(uadSelected, idx) {        
       // console.log('uadSelected= ', uadSelected);
        let uad = DriversConfig.UADsConfig.filter(it => it.Nome === uadSelected);
        let bool = uad[0].Habilitado;
        rowColors[idx] = bool;
       // console.log('bool= ', bool);
        if (bool) {    
            return  <button className="btn btn-sm rounded-pill btn-outline-success" style={styleBadge}
                            onMouseEnter={()=>handleMouseEnter(uadSelected, false)} 
                            onMouseLeave={()=>handleMouseLeave(uadSelected, false)}   
                            onClick={()=>toogleOnOff(uadSelected)}>

                            <i className="fas fa-power-off fa-sm"></i>  
                    </button>  
                   
        } else{
            return <button className="btn btn-sm rounded-pill btn-outline-secondary" style={styleBadge} 
                           onMouseEnter={()=>handleMouseEnter(uadSelected, true)} 
                           onMouseLeave={()=>handleMouseLeave(uadSelected, true)} 
                           onClick={()=>toogleOnOff(uadSelected)}>

                        <i className="fas fa-power-off fa-sm"></i>                                             
                   </button>  
        }          
    }   

    const styleBadge = { 
       // display:'block',
        height: '27px',
        width:'27px',
        padding:'0.0em',
        paddingBottom:'0.3em',
        borderRadius: '30%',
        //marginRight:'2.0px',
        border: 'solid',            
    } 
    const tableScroll = { 
        height:'450px',
        overflow:'auto',        
    }

    return(
       <div style={tableScroll}>
            <table className="table table-sm table-hover ">
                <thead className=''>
                    <tr>      
                        <th scope="col" className="text-center" style={{width: '5%'}}>  </th>              
                        <th scope="col" style={{width: '50%'}}>UADs</th>
                        <th scope="col" style={{width: '45%'}}>Driver Ativo</th>                      
                    </tr>
                </thead>
                <tbody>
                    {DriversConfig.UADsConfig.map((itm, idx) => {                           
                        return  <tr key={idx} className={(uadSel===itm.Nome)?'table-active':''} style={{cursor:'pointer', backgroundColor: rowColors[idx] ? '#d4edda' : ''}} onClick={()=>setUadSel(itm.Nome)}> 
                                    <td className="align-middle" >
                                        {setButtonToogle(itm.Nome, idx)}   
                                        {isHover==itm.Nome?
                                            <span style={{marginTop: '-7px', marginLeft:'10px'}} className="position-absolute translate-middle badge rounded-pill bg-dark">
                                                {showEnable}                 
                                            </span>  
                                            :''
                                        }                                                                       
                                    </td>
                                    <td className="align-middle"> 
                                        {itm.Nome}                                          
                                    </td>                                  
                                    <td>
                                      <select className="form-select" defaultValue={itm.Driver} onChange={(e)=>updateSelectedDriver(idx, e.target.value)} disabled={!itm.Habilitado}>
                                          {DriversConfig.Plugins.map((it, idj) =>                                                                                     
                                             <option key={idj} value={it.String}>{itm.Habilitado?it.String:''}</option>
                                          )}
                                      </select>
                                    </td>                                                                                                       
                                </tr>
                        }
                    )}                                        
                </tbody>
             </table>
      </div>
    )
    
}

export default TableUadsForm