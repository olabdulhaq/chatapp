import React, { useEffect, useRef } from 'react';
import Moment from 'react-moment';

const Message = ({ msg, user1 }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msg]);
  return (
    <>
      <div className="mb-auto mt-6">
        <div
          className={`flex ${
            msg.from === user1 ? 'flex-row-reverse mb-4' : 'mb-4'
          }`}
          ref={scrollRef}>
          <img
            src="https://image.ibb.co/j4Ov3b/darth_vader_1.png"
            alt="user"
            className="h-8 w-8 rounded-full ml-3"
          />
          <div
            className={`p-2 text-white ${
              msg.from === user1
                ? 'bg-purple-secondary rounded-tl-xl rounded-bl-xl rounded-br-xl'
                : 'bg-purple-primary rounded-tr-xl rounded-br-xl rounded-bl-xl'
            } `}>
            <p>
              {msg.media ? (
                <img src={msg.media} alt={msg.text} className="w-40 h-400" />
              ) : null}
              {msg.text}
              <br />
              <small>
                <Moment fromNow>{msg.createdAt.toDate()}</Moment>
              </small>
            </p>
          </div>
        </div>

        {/* //   <div className="flex mb-4">
        //     <img
        //       src="https://image.ibb.co/j4Ov3b/darth_vader_1.png"
        //       alt="user"
        //       className="h-8 w-8 rounded-full mr-3"
        //     />
        //     <div className="bg-purple-primary p-2 text-white rounded-tr-xl rounded-br-xl rounded-bl-xl">
        //       <p>
        //         {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
        //         {msg.text}
        //         <br />
        //         <small>
        //           <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        //         </small>
        //       </p>
        //     </div>
        //   </div> */}
      </div>
      {/* <div>
      {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
      {msg.text}
      <br />
      <small>
        <Moment fromNow>{msg.createdAt.toDate()}</Moment>
      </small>
    </div> */}
    </>
  );
};

export default Message;
