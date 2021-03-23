import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";
import DetallePais from './components/DetallePais/DetallePais';
import Home from './components/Home/Home';
import Principal from './components/Principal/Principal';
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
