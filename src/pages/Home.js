import React, { useEffect, useState } from 'react';
import { HiOutlinePencilAlt, HiOutlineSearch } from 'react-icons/hi';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoCallOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
// import { useAuth } from '../contexts/Authcontext';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db, storage } from '../service/Myfirebase';

import User from '../components/User';
import MessageForm from '../components/MessageForm';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Message from '../components/Message';

const Home = () => {
  const [chat, setChat] = useState('');
  const [users, setUsers] = useState([]);
  const [text, setText] = useState('');
  const [img, setImg] = useState('');
  const [msgs, setMsgs] = useState([]);
  // const { currentUser } = useAuth();

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const userRef = collection(db, 'users');

    const q = query(userRef, where('uid', 'not-in', [user1]));

    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub;
  }, []);

  const selectUser = async (user) => {
    setChat(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, 'Messages', id, 'Chat');
    const q = query(msgsRef, orderBy('createdAt', 'asc'));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });

    const docSnap = await getDoc(doc(db, 'lastMsg', id));
    if (docSnap.data() && docSnap.data().from !== user1) {
      await updateDoc(doc(db, 'lastMsg', id), {
        unread: false,
      });
    }
  };

  console.log('ff0', msgs);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const durl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = durl;
    }
    await addDoc(collection(db, 'Messages', id, 'Chat'), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || '',
    });

    await setDoc(doc(db, 'lastMsg', id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || '',
      unread: true,
    });
    setText('');
  };

  return (
    <div className="main-container flex">
      {/* <div className="bg-red-500 w-2/6 mr-1 p-3"> */}
      <div className="p-5 w-full sm:w-full md:w-full lg:w-1/4 overflow-x-scroll">
        <div className="flex items-center justify-between">
          <h1>
            Messages{' '}
            <span className="bg-slate-300 rounded-full p-1 w-3 h-3 text-xs font-light">
              35
            </span>
          </h1>
          <div className="border border-gray-300 p-1 rounded-lg">
            <HiOutlinePencilAlt />
          </div>
        </div>
        {/* search */}
        <div className="my-4 flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-0.5 px-4 -mr-8 border border-gray-300 rounded-2xl"
          />
          <HiOutlineSearch />
        </div>

        {users.map((user) => (
          <User
            key={user.uid}
            user={user}
            selectUser={selectUser}
            user1={user1}
            chat={chat}
          />
        ))}
      </div>

      <div className="p-5 flex-grow-0 sm:flex-grow-0 md:flex-grow-0 lg:flex-grow border hidden sm:hidden md:hidden lg:flex flex-col border-gray-200">
        <div className="w-full">
          {chat ? (
            <div className="flex h-14 border-b border-gray-300 pb-4">
              <figure>
                <figcaption className="flex items-center">
                  <img
                    src={chat.avatar}
                    alt="friend pic"
                    className="h-8 w-8 rounded-full mr-3"
                  />
                  <div className="flex items-center">
                    <h2 className="text-sm">{chat.name}</h2>
                    <div className="text-xs font-light flex items-center ml-2 bg-green-300 py-0.5 px-2">
                      <GoPrimitiveDot style={{ color: 'green' }} />
                      <p>online</p>
                    </div>
                  </div>
                </figcaption>
              </figure>
              <ul className="ml-auto flex items-center">
                <li className="flex items-center ml-2 p-1 bg-gray-200 rounded-lg text-purple-primary">
                  <Link to="/">
                    <IoCallOutline />
                    <span className="ml-1 text-sm">Call</span>
                  </Link>
                </li>
                <li className="ml-2 p-1 rounded-lg text-white text-sm bg-purple-secondary">
                  <Link to="/profile">view profile</Link>
                </li>
                <li className="ml-2 p-1 border text-sm border-gray-300 rounded-lg">
                  <Link to="/">Profile</Link>
                </li>
              </ul>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        {/* chatbox */}
        {chat ? (
          <div className="overflow-y-scroll">
            {msgs.length
              ? msgs.map((msg, i) => (
                  <Message key={i} msg={msg} user1={user1} />
                ))
              : null}
          </div>
        ) : (
          <div className="flex h-full justify-center items-center">
            Select a user to start a conversation
          </div>
        )}

        <MessageForm
          handleSubmit={handleSubmit}
          text={text}
          setText={setText}
          setImg={setImg}
        />
      </div>
    </div>
  );
};

export default Home;
