import React from 'react';
import InputEmoji from 'react-input-emoji';
import { IoIosSend } from 'react-icons/io';
import { IoAttach } from 'react-icons/io5';

const MessageForm = ({ handleSubmit, text, setText, setImg }) => {
  return (
    <form className="bottom-2 fixed w-full" onSubmit={handleSubmit}>
      <div className="flex message__form">
        <button className=" bg-gray-400 p-3 ml-2">
          <label className="flex items-center justify-center" htmlFor="photo">
            <IoAttach style={{ fontSize: '20px', color: 'white' }} />
          </label>
          {/* {user.avatar ? } */}
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            id="photo"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </button>
        <InputEmoji
          type="text"
          placeholder="say something"
          value={text}
          onChange={setText}
          className=" w-full p-2 border border-gray-400 outline-none"
        />
        <button className="bg-purple-secondary p-3 ml-2">
          <IoIosSend style={{ fontSize: '20px', color: 'white' }} />
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
