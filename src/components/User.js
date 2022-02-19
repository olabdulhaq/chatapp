import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../service/Myfirebase';

const User = ({ user, selectUser, user1, chat }) => {
  const user2 = user?.uid;
  const [data, setData] = useState('');

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, 'lastMsg', id), (doc) => {
      setData(doc.data());
    });
    return () => unsub;
  }, []);

  return (
    <figure
      key={user.id}
      className={`mt-3 p-2 ${chat.name === user.name && 'bg-gray-200'}`}
      onClick={() => selectUser(user)}>
      <figcaption className="flex items-center">
        <img
          src={user.avatar}
          alt="user"
          className="h-8 w-8 rounded-full mr-3"
        />
        <div>
          <h2 className="hidden md:block lg:block text-sm">{user.name}</h2>
        </div>
        <div className="ml-auto">
          <p className="text-xs">{user.latest_timestamp}</p>

          {data?.from !== user1 && data?.unread && (
            <small className="bg-blue-700 text-white rounded-lg py-0.5 px-1">
              New
            </small>
          )}

          <div
            className={`w-1 h-1 rounded-full ${
              user.isOnline ? 'bg-green-700' : 'bg-red-700'
            }`}></div>
        </div>
      </figcaption>
      {data && (
        <p className="text-sm truncate whitespace-nowrap hidden sm:hidden md:block lg:block">
          {data.text}
        </p>
      )}
    </figure>
  );
};

export default User;
