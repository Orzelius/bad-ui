import React, { createContext, Dispatch, SetStateAction } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import TestAudio from './TestAudio';

interface GState { started: boolean }

const initState: { gState: GState, setGState: Dispatch<SetStateAction<GState>> } = { gState: { started: false }, setGState: () => undefined }

export const GContext = createContext(initState);

const Page: React.FC = () => {
  const [gState, setGState] = React.useState({ started: false });
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <GContext.Provider value={{ gState, setGState }}>
            <Route exact path="/debug" component={TestAudio} />
            <Route exact path="/" component={App} />
          </GContext.Provider>
        </Switch>
      </Router>
    </React.StrictMode>)
}

ReactDOM.render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
  document.getElementById('root')
);