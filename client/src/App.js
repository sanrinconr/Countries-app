import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";
import Principal from './components/views/Principal/Principal';
function App() {
  return (
    <Switch>
      <Route path="/home">
        Hola!soy home
      </Route>
      <Route path="/">
        <Principal/>
      </Route>
    </Switch>
  );
}

export default App;
