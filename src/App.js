import React from "react";
import {UseState} from './UseState.js'
import {UseReducer} from './UseReducer.js'
import {ClassState} from './ClassState.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <UseState name="UseState"/>
      <UseReducer name="UseReducer"/>
      <ClassState name="ClassState"/>
    </div>
  );
}

export default App;
