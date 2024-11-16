import React from 'react';
import LoginForm from '../components/users/LoginForm';
import './style.css';
import ModalContainer from './models/common/modals/ModalContainer';

function App() {
  return (
    <div className="App">
      <ModalContainer />
      <LoginForm />
    </div>
  );
}

export default App; 
