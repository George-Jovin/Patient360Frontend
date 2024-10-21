import React from 'react';
import { FadeLoader } from 'react-spinners';

interface SpinnerProps {
  loading: boolean;
  children: React.ReactNode;
}

const Spinner: React.FC<SpinnerProps> = ({ loading, children }) => {
  return (
    <div className="relative">
      {children}
      {loading && (
        <>
          <div className="absolute inset-0 bg-white bg-opacity-70" />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <FadeLoader color="#204499"  />
          </div>
        </>
      )}
    </div>
  );
};

export default Spinner;