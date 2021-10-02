import React from 'react';
import Header from '../components/Header/Header.jsx';

import Maps from '../components/Map/Maps';
import Sidebar from '../components/Sidebar/Sidebar';
import './style.scss'


const App = () => {
    return (
      <div className = 'container'>
       <div className="wrapper">
       <Maps />
       <Header/>
         <div className="col">
         <Sidebar/>
         </div>
       </div>
     </div>
    );
      }

export default App