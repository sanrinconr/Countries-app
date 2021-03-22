import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";
import Principal from './components/views/Principal/Principal';
import Home from './components/containers/Home';
import DetallePais from './components/containers/DetallePais';
function App() {
  return (
    <Switch>
      {/*https://reactrouter.com/web/api/match*/}
      <Route path="/paises/:id" render={
        ({match})=>{
          return <DetallePais id={match.params.id}/>
        }
      }>
      </Route>
      <Route path="/home">
        <Home/>
      </Route>
      <Route path="/">
        <Principal/>
      </Route>
    </Switch>
  );
}

export default App;
