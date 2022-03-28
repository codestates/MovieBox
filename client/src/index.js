import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar';
import './App';
import './index.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          
        <Navbar />
        
      </div>
    )
  }
}

ReactDOM.render(
<BrowserRouter>
<App />
</BrowserRouter>,
document.getElementById('root')
);