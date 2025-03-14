import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../../services/ApiEndpoint';
import { toast } from 'react-hot-toast';
import './login.css';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');   

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await post('/api/auth/register', { name, email, password, role, status });
      const response = request.data;
      if (request.status === 200) {
        toast.success(response.message);
        navigate('/login');
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='register-container'>
        <h2>Register</h2>
        <button className='loginbtn' onClick={() => navigate('/header')}>X</button>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor="username">Username</label>
            <input type="text" onChange={(e) => setName(e.target.value)} id="username" placeholder='your name'required />
          </div>
          <div className='input-group'>
            <label htmlFor="email">Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='your email' id="email" required />
          </div>
          <div className='input-group'>
            <label htmlFor="password">Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='your password' id="password" required />
          </div>
          <div className='input-group'>
            <label htmlFor="role">Role</label>
            <input type="text" onChange={(e) => setRole(e.target.value)} placeholder='your role' id="role" required /> 
          </div>
          
          <div className='input-group'>
            <label htmlFor="status">Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value=" ">select status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button className='reg-btn' type='submit'>Register</button>
          <p className='register-link'>
            Already have an account? <Link to={'/login'}>Login here</Link>
          </p>
        </form>
      </div>
    </>
  );
}
