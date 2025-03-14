import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
 
  return (
    <>
      <nav>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </nav>
      <div className="container">
        <h2>Welcome to Header</h2>
        <h4>Everyone can access these..</h4>
        {/* <button onClick={() => navigate('/')} className="back-button">Back</button> */}
      </div>
    </>
  );
};

export default Header;
