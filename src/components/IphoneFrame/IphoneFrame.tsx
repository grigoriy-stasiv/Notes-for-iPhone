import React from 'react';
import './IphoneFrame.module.css';

interface IphoneFrameProps {
  children: React.ReactNode;
}

export const IphoneFrame: React.FC<IphoneFrameProps> = ({ children }) => {
  return (
    <div className="iphone-container">
      <div className="iphone">
        <div className="dynamic-island"></div>
        <div className="iphone-screen">
          {children}
        </div>
        <div className="iphone-home-indicator"></div>
      </div>
    </div>
  );
};
