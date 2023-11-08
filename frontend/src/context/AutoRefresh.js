import React, {createContext, useState, useContext, useEffect} from "react";

const RefreshContext = createContext();

export default function RefreshProvider({ children }){
    
    const [refresh, setRefresh] = useState(true);
    const [spin, setSpin] = useState(true);
    const [lang, setLang] = useState('POR');

    //console.log('refresh=', refresh) 
   
    useEffect(() => {      
            const timeOutId = setTimeout(() => setSpin(false), 2000);
           // console.log('init autoRefresh')
            return () => clearTimeout(timeOutId);        
    }, []);  

    return(
        <RefreshContext.Provider value={{ refresh, setRefresh, spin, setSpin, lang, setLang }}>
            {children}
        </RefreshContext.Provider>
    );
}

export function useAutoRefresh(){
    const context = useContext(RefreshContext);
    const { refresh, setRefresh, spin, setSpin, lang, setLang } = context;
    return {refresh, setRefresh, spin, setSpin, lang, setLang}
}