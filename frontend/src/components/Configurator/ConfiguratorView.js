import React, {useEffect, useState} from 'react'
import axios from 'axios'
import LoadPageError from '../Messages/LoadPageError';
import LoadingSpinner from '../Messages/LoadingSpinner';
import VirtualizationView from './Virtualization/VirtualizationView';
import ValidationView from './Validation/ValidationView';
import Mdm285View from './MDM285/Mdm285View';
import DriversView from './Drivers/DriversView'
import { useAutoRefresh } from '../../context/AutoRefresh';

const ConfiguratorView = ()=>{ 
   
    const [activeTab, setActiveTab] = useState(''); 
    const {refresh, setSpin, lang} = useAutoRefresh();
    const [saveBtns, setSaveBtns] = useState({ showing: false });
  
      const styleBadge = { 
        width:'90px', 
        fontSize: '1.0em', 
        fontWeight: '600',
        padding:'4.5px',
        marginLeft:'460px'                 
    } 
  
  
    return( 
      <div>
        <div className="row pb-3" style={{borderStyle: 'none none solid none', borderWidth: '2px'}}>
            <h3 className="card-title text-center">Configurador ANAQ</h3>
        </div>
        <ul className="nav nav-tabs pt-2" id="myTab" role="tablist">
            <li className="nav-item" role="presentation"  style={{borderStyle: 'solid none none solid', borderWidth: '0px'}}>
                <button className="nav-link active " id="drivers-tab" data-bs-toggle="tab" data-bs-target="#drivers" type="button" role="tab" aria-controls="drivers" aria-selected="true">
                    <h5>Drivers</h5>
                </button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="virtualization-tab" data-bs-toggle="tab" data-bs-target="#virtualization" type="button" role="tab" aria-controls="virtualization" aria-selected="false">
                    <h5>{lang==='POR'?'Virtualização':'Virtualización'}</h5>
                </button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="Validation-tab" data-bs-toggle="tab" data-bs-target="#Validation" type="button" role="tab" aria-controls="Validation" aria-selected="false">
                    <h5>{lang==='POR'?'Validação':'Validación'}</h5>
                </button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="Mdm285-tab" data-bs-toggle="tab" data-bs-target="#Mdm285" type="button" role="tab" aria-controls="Mdm285" aria-selected="false">
                    <h5>MDM285</h5>
                </button>
            </li>
        </ul>
        <div className="tab-content container p-4" id="myTabContent" style={{borderStyle: 'none ridge ridge ridge', borderWidth: '0.123rem'}}>
            <div className="tab-pane fade show active" id="drivers" role="tabpanel" aria-labelledby="drivers-tab">
                <DriversView></DriversView>
            </div>
            <div className="tab-pane fade" id="virtualization" role="tabpanel" aria-labelledby="virtualization-tab">
                <VirtualizationView></VirtualizationView>
            </div>
            <div className="tab-pane fade" id="Validation" role="tabpanel" aria-labelledby="Validation-tab">
                <ValidationView></ValidationView>
            </div>
            <div className="tab-pane fade" id="Mdm285" role="tabpanel" aria-labelledby="Mdm285-tab">
                <Mdm285View></Mdm285View>
            </div>
        </div>       
      </div>  
    ) 
}

export default ConfiguratorView