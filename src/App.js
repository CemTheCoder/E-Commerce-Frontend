import './App.css';
import Dashboard from './layouts/Dashboard';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import Navi from './layouts/Navi';
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Auth from "./layouts/Auth"
import NaviTwo from './layouts/NaviTwo';

function App() {
  return (
    <div className="App">
      <Navi/>
      <NaviTwo/>
      <Container className="main">
         <Dashboard/>
      </Container>    
    </div>
  );
}

export default App;
