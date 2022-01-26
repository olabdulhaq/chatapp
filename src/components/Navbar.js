import { doc, updateDoc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Authcontext } from '../contexts/Authcontext';
import { auth, db } from '../service/Myfirebase';

const Navbar = () => {
  const { user, logout } = useContext(Authcontext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        isOnline: false,
      });
      await logout();
      navigate('/login');
    } catch {
      alert('Failed to signout');
    }
  };

  return (
    <header className="flex items-center w-full h-20 p-3 bg-purple-primary">
      <h2 className="uppercase mr-auto">chatapp</h2>
      <div>
        {user ? (
          <>
            {/* <Link to="/signup" className="mr-6">
              Profile
            </Link> */}
            <button
              onClick={handleLogout}
              className="bg-orange-600 text-white rounded-md hover:scale-105 active:bg-orange-500 py-1 px-3">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup">Register</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
