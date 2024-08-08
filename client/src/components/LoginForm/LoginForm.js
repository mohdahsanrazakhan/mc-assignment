import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const onSubmit = async (data) => {
    try {
      console.log('Sending data:', data);
      const res = await axios.post('http://localhost:3000/api/users', data);
      console.log('Response: ', res);
      if (res.status === 200) {
        alert('Login successful');
        reset();
        navigate('/home'); // Navigate to /home on successful login
      }
    } catch (error) {
      console.error("Error: ", error);
      if (error.response) {
        console.error("Error response data: ", error.response.data);
      }
    }
  };

  return (
    <div className='form-parent'>
      <div>
        <Form className='form-container' onSubmit={handleSubmit(onSubmit)}>
          <h1 className='text-white text-center mb-4'>Login to <br/> Maxlence Consulting</h1>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Invalid email address'
                }
              })} 
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long'
                }
              })} 
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <p className='text-end'>Don't have an account? <Link className='anchor-color text-decoration-none' to="/">Sign up</Link></p>

          <Button variant="primary" type="submit">
            Log In
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
