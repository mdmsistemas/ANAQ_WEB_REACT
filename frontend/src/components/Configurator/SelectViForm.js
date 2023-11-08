import React  from "react";

const SelectViForm = ({resConfig, setResConfig, ptoSel, selectedVi, setSelectedVi, errors, setErrors}) => {

    const updateSelectedVi = (val)=>{         

        let idx =  resConfig.VirtualizacaoConfig.findIndex(it => it.nomeVirtual === ptoSel);
        console.log('idx', idx, val)
        if(idx >= 0){
            setSelectedVi(val);
            resConfig.VirtualizacaoConfig[idx].vi = val;
            resConfig.VirtualizacaoConfig[idx].parametros = getParameters();      
            setResConfig({Plugins: resConfig.Plugins, VirtualizacaoConfig: resConfig.VirtualizacaoConfig})           
        }     
        else{
            setSelectedVi(val);   
            let newState = [...errors];
            newState[1] = '';
            setErrors(newState)      
        }  
       // console.log('updated=', virtConfig.VirtualizacaoConfig[idx])       
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

    const getViSelectedPoint = ()=>{
        let virtArr = resConfig.VirtualizacaoConfig.filter(it => it.nomeVirtual === ptoSel)
       // console.log('virt=',virtArr[0].vi);
        if (virtArr[0]) {return virtArr[0].vi}
        else { return ''}      
    }
   
    return(
        <div>
            <label className="col-3 col-form-label" >VI:</label>
            <div className="col-12">                         
                <select className={errors&&errors[1]?'form-select is-invalid': 'form-select'} defaultValue={'DEFAULT'} value={selectedVi} onChange={(e)=>updateSelectedVi(e.target.value)}>
                    <option value="DEFAULT" >Selecione uma vi</option> 
                    {resConfig.Plugins.map((it, idj) =>                                                                                     
                        <option key={idj} value={it.String}>{it.String}</option>
                    )}
                </select>
            </div>
        </div>
    )


}

export default SelectViForm