import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../../components/Home/Home';
import AudioVisualizer from '../AudioVisualizer/AudioVisualizer';
import './App.scss';

function App() {

  return (
    <Router>
      <div className="App">
        <Redirect
          from="/"
          to="/home" />

        {/*usar basename en el switch para la publicación en github pages*/
        //LINK DE LA PÁGINA-TUTORIAL DE PUBLICACIÓN EN GITHUB PAGES
        //https://github.com/gitname/react-gh-pages
        }
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/audiovisualizer" component={AudioVisualizer} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
