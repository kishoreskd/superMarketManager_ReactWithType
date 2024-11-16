import './style.css';
import ModalContainer from './common/modals/ModalContainer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <ModalContainer />  
      <Outlet />  
    </div>
  );
}

export default App; 
