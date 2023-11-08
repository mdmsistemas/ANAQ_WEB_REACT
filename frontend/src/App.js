import './index.css';
import RefreshProvider from './context/AutoRefresh';
import AppRouter from './AppRouter';
import '@fortawesome/fontawesome-free/css/all.css';

const App=()=>{
    return (
        <RefreshProvider>  
            <div className="container pt-4">
                <AppRouter/>
            </div>   
        </RefreshProvider>
    )
}

export default App;