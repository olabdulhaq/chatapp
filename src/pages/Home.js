import React, { useEffect, useState } from 'react';
import { HiOutlinePencilAlt, HiOutlineSearch } from 'react-icons/hi';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoCallOutline } from 'react-icons/io5';
import { IoIosSend } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Home = () => {
  const [friends, setFriends] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:8080/profile');
      const data = await res.json();

      console.log(data.friends);
      setFriends(data.friends);
    };
    fetchData();
  }, []);
  return (
    <div className="flex">
      <div className="p-5 w-full sm:w-full md:w-full lg:w-1/4 max-h-screen overflow-x-scroll">
        {/* Header */}
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

        {Array.isArray(friends) &&
          friends.map((friend) => (
            <figure key={friend.id} className="mt-3">
              <figcaption className="flex items-center">
                <img
                  src={friend.picture}
                  alt="user"
                  className="h-8 w-8 rounded-full mr-3"
                />
                <div>
                  <h2 className="text-sm">{friend.name}</h2>
                  <p className="text-xs font-light">{friend.lastChat}</p>
                </div>
                <div className="ml-auto">
                  <p className="text-xs">{friend.latest_timestamp}</p>
                  <p className="text-xs text-center w-auto h-auto p-0.5 flex items-center justify-center bg-green-500 text-white rounded-full">
                    2
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
      </div>

      <div className="p-5 flex-grow-0 sm:flex-grow-0 md:flex-grow-0 lg:flex-grow border hidden sm:hidden md:hidden lg:flex flex-col border-gray-200 min-h-screen">
        <div>
          <div className="flex border-b border-gray-300 pb-4">
            <figure>
              <figcaption className="flex items-center">
                <img
                  src="https://image.ibb.co/j4Ov3b/darth_vader_1.png"
                  alt="friend pic"
                  className="h-8 w-8 rounded-full mr-3"
                />
                <div className="flex items-center">
                  <h2 className="text-sm">darth vader</h2>
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
              <li className="ml-2 p-1 border text-sm border-gray-300 rounded-lg">
                <Link to="/">Archieve</Link>
              </li>
              <li className="ml-2 p-1 rounded-lg text-white text-sm bg-purple-secondary">
                <Link to="/">view profile</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-auto mt-6">
          <div className="flex flex-row-reverse mb-4">
            <img
              src="https://image.ibb.co/j4Ov3b/darth_vader_1.png"
              alt="user"
              className="h-8 w-8 rounded-full ml-3"
            />
            <div className="bg-purple-secondary p-2 text-white rounded-tl-xl rounded-bl-xl rounded-br-xl">
              <p>I thought that the event was over long</p>
            </div>
          </div>
          <div className="flex mb-4">
            <img
              src="https://image.ibb.co/j4Ov3b/darth_vader_1.png"
              alt="user"
              className="h-8 w-8 rounded-full mr-3"
            />
            <div className="bg-purple-primary p-2 text-white rounded-tr-xl rounded-br-xl rounded-bl-xl">
              <p>Not quite the same</p>
            </div>
          </div>
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="say something"
            className="w-full p-2 border border-gray-400"
          />
          <button className="bg-purple-secondary p-3 ml-2">
            <IoIosSend style={{ fontSize: '20px', color: 'white' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
