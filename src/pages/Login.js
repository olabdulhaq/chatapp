import { doc, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Authcontext } from '../contexts/Authcontext';
import { db } from '../service/Myfirebase';
import { TailSpin } from 'react-loader-spinner';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(Authcontext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    try {
      setLoading(true);
      const result = await login(email, password);
      await updateDoc(doc(db, 'users', result.user.uid), {
        isOnline: true,
      });
      navigate('/');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-2/4 h-2/4 p-5 my-20 mx-auto border border-gray-400 rounded-md">
      <h2 className="text-center uppercase text-xl">Login</h2>
      {error && <h3 className="text-red-600">{error}</h3>}
      <form onSubmit={handleSubmit}>
        <div className="mt-6">
          <input
            type="email"
            placeholder="email"
            className="p-3 bg-gray-200 w-full outline-none border focus:border focus:border-purple-primary"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <input
            type="password"
            placeholder="passowrd"
            className="p-3 bg-gray-200 w-full outline-none border focus:border focus:border-purple-primary"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!loading && (
          <button className="mt-6 py-2 px-5 bg-orange-500 text-white rounded-md hover:scale-105 active:bg-orange-400">
            Login
          </button>
        )}
        {loading && <TailSpin ariaLabel="loading-indicator" color="#7F6D9F" />}
      </form>
      <p>
        Create new account{' '}
        <Link to="/signup" className="text-orange-500 underline">
          signup
        </Link>
      </p>
    </div>
  );
};

export default Login;
