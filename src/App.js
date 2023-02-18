import './App.css';
import Registration from './components/Registration'
import SubmitRegistration from './components/SubmitRegistration'
import EditRegistration from './components/EditRegistration';
import LoginRegister from './components/LoginRegister';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import NewSignUp from './components/NewSignUp';



function App() {

  return (
    <div className="App">
      <div className='outer'>
        <div className='inner'>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/newsignup" element={<NewSignUp />} />
              <Route path="registration" element={<Registration />} />
              <Route path="submit" element={<SubmitRegistration />} />
              <Route path="edit" element={<EditRegistration />} />
            </Routes>
          </BrowserRouter>
        </div >
      </div>
    </div>
  );
}

export default App;
