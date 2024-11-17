import React, { useState } from 'react';
import { observer } from "mobx-react-lite";
import CreateAccountForm from "./CreateAccountForm";
import ForgetAccountForm from "./ForgetAccountForm";
import { useStore } from '../../app/stores/store';
import { Login } from '../../app/models/Login';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default observer(function LoginForm() {
  const navigate = useNavigate();
  const { modalStore, authStore } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<Login>({
    ws_us_userid: '',
    ws_us_pswd: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await authStore.login(credentials);
      if (authStore.IsLoggedIn) {
        navigate('/dashboard');
      }
    } catch (error) {
      const errorMessage = error as string;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgetPassword = () => {
    setError(null);
    try {
      console.log('Opening forget password modal');
      modalStore.openModal(
        <ForgetAccountForm onClose={() => modalStore.closeModal()} />
      );
    } catch (error) {
      console.error('Error opening forget password modal:', error);
      toast.error('Failed to open forget password form');
    }
  };

  const handleCreateAccount = () => {
    setError(null);
    try {
      console.log('Opening create account modal');
      modalStore.openModal(
        <CreateAccountForm onClose={() => modalStore.closeModal()} />
      );
    } catch (error) {
      console.error('Error opening create account modal:', error);
      toast.error('Failed to open create account form');
    }
  };

  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">
          Login to Supermarket Manager
        </h1>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-2">User ID / Phone</label>
            <input
              type="text"
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 
                ${error ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
              value={credentials.ws_us_userid}
              onChange={(e) => {
                setError(null);
                setCredentials({
                  ...credentials,
                  ws_us_userid: e.target.value
                });
              }}
              placeholder="Enter your User ID or Phone"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 
                ${error ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
              value={credentials.ws_us_pswd}
              onChange={(e) => {
                setError(null);
                setCredentials({
                  ...credentials,
                  ws_us_pswd: e.target.value
                });
              }}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={handleForgetPassword}
            className="text-blue-500 hover:text-blue-600 transition-colors"
          >
            Forgot Password?
          </button>
          <button
            type="button"
            onClick={handleCreateAccount}
            className="text-blue-500 hover:text-blue-600 transition-colors"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>  
  );

});

