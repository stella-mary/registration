import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import Home from './components/Home';
import SignUp from './components/SignUp';
import EventList from './components/EventList';
import AddNewEvent from './components/AddNewEvent';
import RegistrationList from './components/RegistrationList'
import EditRegistration from './components/EditRegistration';
import NewRegistration from './components/NewRegistration';
import EditEvent from './components/EditEvent';
import NavBar from "./components/NavBar";
import RegistrationTable from './components/RegistrationTable'



function App() {

  return (
    <div className="App">
      <div className='outer'>
        <div className='inner'>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="SignIn" element={<SignIn />} />
              <Route path="SignUp" element={<SignUp />} />
              <Route path="EventList" element={<EventList />} />
              <Route path="AddNewEvent" element={<AddNewEvent />} />
              <Route path="EditEvent" element={<EditEvent />} />
              <Route path="RegistrationList" element={<RegistrationList />} />
              <Route path="NewRegistration" element={<NewRegistration />} />
              <Route path="EditRegistration" element={<EditRegistration />} />
              <Route path="RegistrationTable" element={<RegistrationTable />} />


            </Routes>

          </Router>
        </div >
      </div>
      {/* <SignInSignUp /> */}
    </div >
  );
}

export default App;
