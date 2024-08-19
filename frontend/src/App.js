import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import AdminHome from './pages/adminHome';

function App() {
  return (
    <div className="App">
      <div className='App_main-container'>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/admin" element={<AdminHome/>}/>
        </Routes>
      </div>

    </div>
  );
}

export default App;
