import React, { useState } from 'react';
import { observer } from "mobx-react-lite";
import CreateAccountForm from "./CreateAccountForm";
import ForgetAccountForm from "./ForgetAccountForm";
import { useStore } from '../../app/stores/store';

const LoginForm: React.FC = observer(() => {
  const { modalStore } = useStore();
  const [credentials, setCredentials] = useState({
    userIdOrPhone: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted with:', credentials);
  };

  const handleCreateAccount = () => {
    modalStore.openModal(<CreateAccountForm onClose={modalStore.closeModal} />);
  };

  const handleForgotPassword = () => {
    modalStore.openModal(<ForgetAccountForm onClose={modalStore.closeModal} />);
  };

  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">
          Login to Supermarket Manager
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">User ID / Phone</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={credentials.userIdOrPhone}
              onChange={(e) => setCredentials({
                ...credentials,
                userIdOrPhone: e.target.value
              })}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={credentials.password}
              onChange={(e) => setCredentials({
                ...credentials,
                password: e.target.value
              })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <div className="mt-4 flex justify-between">
          <button
            onClick={handleForgotPassword}
            className="text-blue-500 hover:text-blue-600"
          >
            Forgot Password?
          </button>
          <button
            onClick={handleCreateAccount}
            className="text-blue-500 hover:text-blue-600"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
});

export default LoginForm;
