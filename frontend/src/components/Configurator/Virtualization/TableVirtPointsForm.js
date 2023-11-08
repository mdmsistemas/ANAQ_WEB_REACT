import React, {useEffect, useState} from "react";
import AddVirtModal from './AddVirtModal';

const TableVirtPointsForm = ({resConfig, setResConfig, setEnable, ptoSel, setPtoSel, getViSelectedPoint, handleToVirtual}) => {

    const [state, setState] = useState({ show: false });
    

    const showModal = () => {
      setState({ show: true });
    }
    
    const hideModal = () => {
      setState({ show: false });
    }


    const getParameters = () => {
        let arr = resConfig.Plugins.filter(it => ptoSel? (it.String === getViSelectedPoint()):'');
        let params = []
        if(arr[0]){
            arr[0].Array.map((itm, idx) => {
                params.push({ "nome":itm.nome, "valor":itm.valor})
            })
            return params;
        }
        else {return ''}
    }

    const updateSelectedVi = (idx, val)=>{
        resConfig.VirtualizacaoConfig[idx].vi = val;
        resConfig.VirtualizacaoConfig[idx].parametros = getParameters();      
        setResConfig({Plugins: resConfig.Plugins, VirtualizacaoConfig: resConfig.VirtualizacaoConfig})
       // console.log('updated=', virtConfig.VirtualizacaoConfig[idx])       
    } 
 
    const inputPointHandler = (idx, value) =>{
         setPtoSel(value)
         resConfig.VirtualizacaoConfig[idx].nomeVirtual = value;
         setResConfig({Plugins: resConfig.Plugins, VirtualizacaoConfig: resConfig.VirtualizacaoConfig})
         //console.log('updated=', resConfig.VirtualizacaoConfig)  
    }

    const deletePoint = (name) => {      
        let idx = resConfig.VirtualizacaoConfig.findIndex(it => it.nomeVirtual === name);
        let updatedPoints = resConfig.VirtualizacaoConfig;
        updatedPoints.splice(idx, 1); 
        setResConfig({Plugins: resConfig.Plugins, VirtualizacaoConfig: updatedPoints})
        setPtoSel('');
        setEnable(true);
       // console.log('updated=', virtConfig.VirtualizacaoConfig)  
    }

    const handleAddingNewPoint = (item) => {  
        console.log('ptoSel=', ptoSel);    
        console.log('New Item=', item);
       // if(item.)
       if(!ptoSel){
            resConfig.VirtualizacaoConfig.push(item);
            setResConfig({Plugins: resConfig.Plugins, VirtualizacaoConfig: resConfig.VirtualizacaoConfig});
            setPtoSel('');           
       }  
        setEnable(true);
    }

    const tableScroll = { 
        height:'450px',
        overflow:'auto',        
    }

    const styleBadgeSm = { 
        width:'28px',
        fontSize: '0.8em',
        fontWeight: '400',
        padding:'1.0px',
        border: 'solid',  
        marginLeft: '0em'       
    } 

    /*useEffect(() => {
        handleToVirtual(resConfig);
    },) */

    return(
       <div style={tableScroll}>
            <table className="table table-sm table-hover table-bordered">
                <thead className='table-light'>
                    <tr>                    
                        <th scope="col" style={{width: '50%'}}>Ponto Monitorado</th>
                        <th scope="col" style={{width: '41%'}}>Vi</th>    
                        <th scope="col" class="text-center" style={{'width': '9%'}}>
							<a className="btn btn-sm rounded-pill btn-outline-primary" style={styleBadgeSm} title='Adicionar novo ponto' 
                               data-bs-toggle="modal" data-bs-target="#addModal"  onClick={()=>{setPtoSel(''); showModal()}}>
								<i className="fas fa-plus"></i>
							</a>
						</th>                                        
                    </tr>
                </thead>
                <tbody>
                    {resConfig.VirtualizacaoConfig.map((itm, idx) => {                           
                        return  <tr key={idx} className={(ptoSel===itm.nomeVirtual)?'table-active':''} onClick={()=>setPtoSel(itm.nomeVirtual)}> 
                                    <td style={{cursor: 'pointer'}}> 
                                       {itm.nomeVirtual}                                                     
                                    </td> 
                                    <td className="fw-normal text-muted">
                                        {itm.vi} 
                                    </td>  
                                    <td className="align-middle" scope="col">									
                                        <i className="fas fa-edit fa-sm"  style={{"paddingLeft": "0.4em", 'cursor':'pointer', 'color':'#FFC107'}} title='Editar Ponto'
                                           data-bs-toggle="modal" data-bs-target="#addModal"  onClick={()=>setPtoSel(itm.nomeVirtual)}></i>
                                        <i className="fas fa-trash-alt fa-sm " style={{"paddingLeft": "0.5em", 'cursor':'pointer', 'color':'#E6676B'}} title='Remover Ponto' 
                                            onClick={()=>deletePoint(itm.nomeVirtual)} ></i>																	   							         
                                    </td>                                                                    
                                </tr>
                        }
                    )}                                        
                </tbody>
             </table>
          
            {/* Modal Adicionar Ponto */}
            <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
                <AddVirtModal show={state.show} showModal={showModal} handleClose={hideModal} virtConfig={resConfig} setVirtConfig={setResConfig} ptoSel={ptoSel} setPtoSel={setPtoSel}  handle={handleAddingNewPoint}/>
             </div>  
      </div>
    )
    
}


export default TableVirtPointsForm