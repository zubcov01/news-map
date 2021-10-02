import './Ads.scss'
import data from '../../data.js';
import { useContext } from 'react';
import PinsContext from '../../context';

const Sidebar = () => {
    const {pins, setPins} = useContext(PinsContext)
    return (
        <div className = 'menu' style = {pins.length === 0 ? {opacity: '0'} : {opacity: '1'}}>
           {
               pins.map((news) => (
                   <div key = {news.id} className="ad">
                       <p>{news.text}</p>
                   </div>
               ))
           }
          
        </div>
    );
};

export default Sidebar;