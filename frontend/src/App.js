// import logo from './logo.svg';

import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css';
import LoginPage from './pages/loginPage';

function App() {
  return (
    <div className="App">
      <div className='App_main-container'>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
        </Routes>
      </div>

    </div>
  );
}

export default App;
