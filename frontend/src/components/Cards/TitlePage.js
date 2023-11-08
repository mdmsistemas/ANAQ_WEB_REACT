import React from 'react'

const TitlePage = ({ title, labelNome , nome , labelDataUpdate, dataUpdate}) => {

    return (
        <div className="col justify-content-center">
            <div className="row pb-3" style={{borderStyle: 'none none solid none', borderWidth: '2px'}}>
                <h3 className="card-title text-center">{title}</h3>
            </div>
            <div className="row">
                <label className="col-2 col-form-label" style={{width:'160px'}}>{labelNome}</label>
                <div className="col-10">
                    <input type="text" readOnly className="form-control-plaintext fw-bold" style={{fontSize:'18px'}} value={nome} disabled></input>
                </div>
            </div> 
            <div className="row">
                <label className="col-2 col-form-label" style={{width:'159px'}}>{labelDataUpdate}</label>
                <div className="col-10">
                    <input type="text" readOnly className="form-control-plaintext" value={dataUpdate} disabled></input>
                </div>
            </div>                          
        </div>
    )
}



export default TitlePage