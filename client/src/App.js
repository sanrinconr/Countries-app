import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";
import Principal from './components/views/Principal/Principal';
import Home from './components/containers/Home';
function App() {
  return (
    <Switch>
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
