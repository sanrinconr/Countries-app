import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";
function App() {
  return (
    <Switch>
      <Route path="/">
        Hola! soy la principal
      </Route>
    </Switch>
  );
}

export default App;
