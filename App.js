import React, { useState } from 'react';
import { FcHome, FcAbout } from "react-icons/fc";
import { IoSettings, IoLogOut, } from "react-icons/io5";
import { FaRegRegistered } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import './index.css'; 

function Home() {
  return <h2></h2>;
}

function About({ registrationData }) {
  return (
    <div className="raj">
      <h2> Page</h2>
      <h3>Registration Data</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Place</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {registrationData.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.gender}</td>
              <td>{data.place}</td>
              <td>{data.phNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Settings() {
  return <h2>What ever you want you can edit</h2>;
}

function RegisterForm({ onRegistration, redirectToAbout }) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [place, setPlace] = useState('');
  const [phNo, setPhNo] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newData = { name, gender, place, phNo };
    onRegistration(newData); 
    setName('');
    setGender('');
    setPlace('');
    setPhNo('');
    redirectToAbout(); // Redirect to About page after submission
  };

  return (
    <div className="guru">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="regi">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="regi">
          <label htmlFor="gender">Gender:</label>
          <input type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required />
        </div>
        <div className="regi">
          <label htmlFor="place">Place:</label>
          <input type="text" id="place" value={place} onChange={(e) => setPlace(e.target.value)} required />
        </div>
        <div className="regi">
          <label htmlFor="phNo">Phone Number:</label>
          <input type="text" id="phNo" value={phNo} onChange={(e) => setPhNo(e.target.value)} required />
        </div>
        <button className="second" type="submit">Submit</button>
      </form>
    </div>
  );
}

function LoginForm() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedPage, setSelectedPage] = useState('home');
  const [registrationData, setRegistrationData] = useState([]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleRegistration = (data) => {
    setRegistrationData([...registrationData, data]);
  };

  const redirectToAbout = () => {
    setSelectedPage('about');
  };

  return (
    <div className="container">
      {!loggedIn ? (
        <div className="initialpage">
          <h1><center>Login Form</center></h1>
          <form onSubmit={handleLogin}>
            <div className="first">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" required />
            </div>
            <div className="first">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" required />
            </div>
            <button className="fourth" type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <CiMenuKebab onClick={() => setSidebarVisible(!sidebarVisible)} style={{ cursor: 'pointer' }} />
          {sidebarVisible && (
            <div>
              <ul className="content">
                <li onClick={() => setSelectedPage('home')}><FcHome /> Home</li>
                <li onClick={() => setSelectedPage('about')}><FcAbout /> About</li>
                <li onClick={() => setSelectedPage('register')}><FaRegRegistered /> Register</li>
                <li onClick={() => setSelectedPage('settings')}><IoSettings /> Settings</li>
                <li onClick={handleLogout}><IoLogOut style={{ cursor: 'pointer' }} /> Logout</li>
              </ul>
            </div>
          )}
          {/* Render different components based on selectedPage */}
          {selectedPage === 'home' && <Home />}
          {selectedPage === 'about' && <About registrationData={registrationData} />}
          {selectedPage === 'register' && <RegisterForm onRegistration={handleRegistration} redirectToAbout={redirectToAbout} />}
          {selectedPage === 'settings' && <Settings />}
        </div>
      )}
    </div>
  );
}

export default LoginForm;
