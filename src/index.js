import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App/App.jsx';
import PinsContext from './context';
function Main() {

  const [pins, setPins] = useState([]);
return(
  <React.StrictMode>
  <PinsContext.Provider value={{ pins, setPins }}>
    <App />
      </PinsContext.Provider>
  </React.StrictMode>
 );
}
ReactDOM.render(<Main/>, document.getElementById('root'));
  
