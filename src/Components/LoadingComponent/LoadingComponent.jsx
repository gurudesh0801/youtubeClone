import React from 'react';
import "./LoadingComponent.css"
import logo from '../../assets/logo.png'

const LoadingComponent = () => {
  return (
    <div className="loading-container">
      <img src={logo} alt="Loading..." className="loading-image" />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingComponent;
