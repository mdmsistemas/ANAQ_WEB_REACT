import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams, useRouteMatch } from "react-router-dom";
//import Plot from 'react-plotly.js';
import Plotly from 'plotly.js-basic-dist'
import createPlotlyComponent from 'react-plotly.js/factory'
import { useAutoRefresh } from '../../context/AutoRefresh';

const SignalPlot = ()=>{ 

    const { nome } = useParams();  
    const {refresh, setSpin, lang} = useAutoRefresh();

    let { url } = useRouteMatch();
    const urlArr = url.split('/');
    
    const Plot = createPlotlyComponent(Plotly);
    
    
    //console.log(`ANAQ/WS_SINAL/${urlArr[3]}/${urlArr[4]}`)
   
    //const [signal, setSignal] = useState({'sinal':[], 'error':{'code':'', 'source':'', 'status':''}, 'dt':'', 'timestamp':''});
    const [signal, setSignal] = useState({'sinal':[], 'fft':[],'error':{'code':'', 'source':'', 'status':''}, 'dt':1, 'df':1, 'timestamp':''});
    
    const loadSignal = async () =>{  
        const res = await axios.get(`JSON/WS_SINAL_FFT/${urlArr[3]}/${urlArr[4]}`);
        setSignal(res.data);
    }
    
    setTimeout(()=>{
        if(refresh)
            loadSignal();
    },5000);
      
    useEffect(() => {
        loadSignal();
    }, [])

    const LocalDate= () => {
        let ldate = new Date(Date.now());  
        return ldate.toLocaleString("en-GB");
    } 
    

    const setArrX = () => {
        const arrX = [];  
        let ele = 0; 
        for (let i = 0; i < signal.sinal.length; i++) {
            arrX.push(ele);
            ele+=signal.dt;
        }
        return arrX;
    }

    const setArrFFT = () => {
        const arrFFT = [];  
        let ele = 0; 
        for (let i = 0; i < signal.fft.length; i++) {
            arrFFT.push(ele);
            ele+=signal.df;
        }
        return arrFFT;
    }

    return (
        <div className="justify-content-center">    
            <div className="col justify-content-center ">             
                <div className="row">
                    <label className="col-2 col-form-label" style={{width:'160px'}}>{lang==='POR'?'Nome':'Nombre'}</label>
                    <div className="col-10">
                        <input type="text" readOnly className="form-control-plaintext fw-bold" style={{fontSize:'18px'}} value={urlArr[3]} disabled></input>
                    </div>
                </div> 
                <div className="row">
                    <label className="col-2 col-form-label" style={{width:'159px'}}>'Última {lang==='POR'?'Atualização':'Actualización'}</label>
                    <div className="col-10">
                        <input type="text" readOnly className="form-control-plaintext" value={LocalDate()} disabled></input>
                    </div>
                </div>                          
            </div>

            { (signal.sinal.length>10)?(
                <div>
                    <Plot
                        data={[
                        {
                            x: setArrX(),
                            y: signal.sinal,
                            type: 'scatter',
                            mode: 'lines', //lines+markers
                            marker: {color: '#537bc4'},
                        },                                            
                        ]}
                        layout={ 
                            {   width: 1250, height: 550, title: nome, font: { size: 14},
                                xaxis: { linecolor: 'black', linewidth: 1, mirror: true,},
                                yaxis: {linecolor: 'black', linewidth: 1, mirror: true,}
                            }             
                        }
                    />    
                    <Plot
                        data={[
                        {
                            x: setArrFFT(),
                            y: signal.fft,
                            type: 'scatter',
                            mode: 'lines', //lines+markers
                            marker: {color: '#537bc4'},
                        },                                            
                        ]}
                        layout={ 
                            {   width: 1250, height: 550, title: nome, font: { size: 14},
                                xaxis: { linecolor: 'black', linewidth: 1, mirror: true,},
                                yaxis: {linecolor: 'black', linewidth: 1, mirror: true,}
                            }             
                        }
                    />                    
                </div>
                               
            ):(
                <span>Scalar</span>
            )
            
            }
            
        </div>    
    )
}

export default SignalPlot