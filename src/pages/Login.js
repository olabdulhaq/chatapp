import { doc, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Authcontext } from '../contexts/Authcontext';
import { db } from '../service/Myfirebase';
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
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="w-2/4 h-2/4 p-5 my-20 mx-auto border border-gray-400 rounded-md">
      <h2 className="text-center">Login</h2>
      {error && <h3>{error}</h3>}
      <form onSubmit={handleSubmit}>
        <div className="mt-6">
          <input
            type="email"
            placeholder="email"
            className="p-3 bg-gray-200 w-full"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <input
            type="password"
            placeholder="passowrd"
            className="p-3 bg-gray-200 w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!loading && (
          <button className="mt-6 py-2 px-5 bg-orange-500 text-white rounded-md hover:scale-105 active:bg-orange-400">
            Login
          </button>
        )}
        {loading && (
          <button className="mt-6 py-2 px-5 bg-orange-300 text-white rounded-md hover:scale-105 active:bg-orange-400">
            Login...
          </button>
        )}
      </form>
      <p>
        Already have an account?{' '}
        <Link to="/login" className="text-orange-500 underline">
          login
        </Link>
      </p>
    </div>
  );
};

export default Login;
