import logo from './logo.svg';
import './App.css';
import './components/HeaderBar/HeaderBar'
import HeaderBar from './components/HeaderBar/HeaderBar';
import PageBody from './components/PageBody/PageBody';
import {useState} from 'react';
import AppState from './AppState';



function App() {
  const initAppState = new AppState();
  const [appState, setAppState]= useState(initAppState);


  return (
    <div> 
      <HeaderBar appState={appState} setAppState={setAppState}/>
      <PageBody appState={appState} setAppState={setAppState}/>
    </div>
  );
}

export default App;
