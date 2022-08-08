import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import LandigPage from './components/LandigPage';
import VideogameCreate from './components/VideogameCreate';
import Details from './components/Details';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandigPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/videogame" component={VideogameCreate} />
        <Route exact path="/videogame/:id" component={Details} />
      </Switch>
    
    </div>
    
    </Router>
  );
}

export default App;
