// components/Loader.tsx
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
