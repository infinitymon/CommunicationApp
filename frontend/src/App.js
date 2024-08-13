// import logo from './logo.svg';

import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';

function App() {
  return (
    <div className="App">
      <div className='App_main-container'>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
      </div>

    </div>
  );
}

export default App;
