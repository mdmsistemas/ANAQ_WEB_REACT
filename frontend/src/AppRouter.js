import {Redirect, Route, Switch ,HashRouter} from 'react-router-dom';
import AnalyseView from './components/Analyse/AnalyseView';
import DaqView from './components/DAQ/DaqView';
import Alarms from './components/Analyse/Alarms';
import MonitoredPoints from './components/Analyse/MonitoredPoints';
import SignalPlot from './components/Analyse/SignalPlot';
import Tests from './components/Analyse/Tests';
import LogView from './components/Log/LogView';
import ErrorView from './components/Error/ErrorView';
import StatisticsView from './components/Statistics/StatisticsView';
import VersionView from './components/Version/VersionView';
import ConfiguratorView from './components/Configurator/ConfiguratorView';
import DriverView from './components/Configurator/Drivers/DriversView';
import VirtualizationView from './components/Configurator/Virtualization/VirtualizationView';
import Navbar from './components/Navbar/Navbar';



const AppRouter = ()=>{
    return (
        <HashRouter >
            <Navbar/>
            <Switch>
                <Redirect exact from="/" to="/analyses" />
                <Route exact path="/analyses" component={AnalyseView}/>
                <Route exact path="/analyses/alarms/:nome" component={Alarms}/>
                <Route exact path="/analyses/points/:nome" component={MonitoredPoints}/>
                <Route exact path="/analyses/points/:nome/:nome" component={SignalPlot}/>
                <Route exact path="/analyses/tests/:nome" component={Tests}/>
                <Route exact path="/daq" component={DaqView}/>
                <Route exact path="/log" component={LogView}/>
                <Route exact path="/error" component={ErrorView}/>
                <Route exact path="/statistics" component={StatisticsView}/>
                <Route exact path="/configurator" component={ConfiguratorView}/>
                {/* <Route exact path="/configurator/Drivers" component={DriverView}/> 
                <Route exact path="/configurator/Virtualization" component={VirtualizationView}/> */}
                <Route exact path="/version" component={VersionView}/>
            </Switch>
        </HashRouter>
       
    )
}

export default AppRouter