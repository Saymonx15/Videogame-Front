import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import LandigPage from './components/LandigPage';
import VideogameCreate from './components/VideogameCreate';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandigPage} />
        <Route  path="/home" component={Home} />
        <Route path="/videogame" component={VideogameCreate} />
      </Switch>
    
    </div>
    
    </Router>
  );
}

export default App;
