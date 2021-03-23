import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";
import DetallePais from './components/DetallePais/DetallePais';
import Home from './components/Home/Home';
import Principal from './components/Principal/Principal';
import NavBar from './components/common/NavBar/NavBar';
import NuevaActividad from './components/NuevaActividad/NuevaActividad';
function App() {
  return (
    <Switch>
      <Route path="/nuevaActividad">
        <NavBar/>
        <NuevaActividad/>
      </Route>
      {/*https://reactrouter.com/web/api/match*/}
      <Route path="/paises/:id" render={
        ({match})=>{
          return  <><NavBar/>
          <DetallePais id={match.params.id}/></>
        }
      }>
      </Route>
      <Route path="/home">
        <NavBar/>
        <Home/>
      </Route>
      <Route path="/">
        <Principal/>
      </Route>
    </Switch>
  );
}

export default App;
