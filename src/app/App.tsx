import './style.css';
import ModalContainer from './common/modals/ModalContainer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { observer } from 'mobx-react-lite';

export default observer(function App() {
  return (
    <div className="App">
      <ModalContainer />
      <ToastContainer position='bottom-right' theme='colored' autoClose={5000} hideProgressBar={false} />`
      <Outlet />
    </div>
  );
});

