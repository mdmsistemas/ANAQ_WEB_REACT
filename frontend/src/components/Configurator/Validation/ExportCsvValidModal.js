import React, {useState} from 'react'
import SelectViForm from '../SelectViForm';


const ExportCsvValidModal = ({resConfig, getViSelectedPoint})  =>{ 

    const [selectedVi, setSelectedVi] = useState(); 

    const buildArrayCsv = () =>{    
        let csvData = 'ponto Monitorado';
        let csvContent = "data:text/csv;charset=utf-8,";
        let pointsArr = resConfig.ValidacaoConfig.filter(it => it.vi === getViSelectedPoint())
        //console.log('pointsArr=', pointsArr)
        if(pointsArr[0]) {
            pointsArr[0].parametros.map(param =>{       
                csvData += ';' + param.nome   
            })
            pointsArr[0].dependencias.map(vari =>{
                csvData += ';' + 'DEP'
            })
            csvContent += csvData + "\r\n";
        }  

        pointsArr.map(point =>{
            csvContent += point.nomePtoMon + ";" 
            point.parametros.map(param =>{
                csvContent += param.valor + ';'
            })
            point.dependencias.map(vari =>{
                csvContent += vari.nome +';'
            })       
            csvContent +=  "\r\n"
        })
        return csvContent;
    }
   
   const exportCsv = () =>{
        let csvContent = buildArrayCsv();
        console.log(csvContent);
        let encodedUri = encodeURI(csvContent);    
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `csv_${getViSelectedPoint().split('.')[0]}.csv`);
        document.body.appendChild(link); // Required for FF
        link.click();
        document.body.removeChild(link);
   }

 
    return(
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header bg-light">
                    <h4 className="modal-title w-100 text-center" id="addModalLabel">Exportar CSV</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="row justify-content-center"> 
                        <div className="row pb-2">
                            <SelectViForm resConfig={resConfig} selectedVi={selectedVi} setSelectedVi={setSelectedVi}/>                                   
                        </div>                                         
                    </div>                     
                </div>                
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" download="filecsv.csv" onClick={() => exportCsv()}>Exportar</button>
                </div>
            </div> 
        </div>         
    )
}

export default ExportCsvValidModal