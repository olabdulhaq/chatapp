import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Loading = () => {
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <TailSpin ariaLabel="loading-indicator" color="#7F6D9F" />
      </div>
    </>
  );
};

export default Loading;
