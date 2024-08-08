// import React from 'react';
// import { Button, Form } from 'react-bootstrap';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import './AuthForm.css';

// function AuthForm() {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const res = await axios.post('http://localhost:3000/api/users', data);
//       if (res.status === 201) {
//         // Clear fields by resetting the form
//         reset();
//       }
//     } catch (error) {
//       console.error("Error: ", error);
//     }
//   };

//   return (
//     <div className='form-parent'>
//       <div>
//         <Form className='form-container' onSubmit={handleSubmit(onSubmit)}>
//           <h1 className='text-white text-center mb-4'>Welcome to <br/> Maxlence Consulting</h1>

//           <Form.Group className="mb-3" controlId="formBasicUsername">
//             <Form.Label>Username</Form.Label>
//             <Form.Control 
//               type="text" 
//               placeholder="Username" 
//               {...register('username', { required: 'Username is required' })} 
//               isInvalid={!!errors.username}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.username?.message}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control 
//               type="email" 
//               placeholder="Enter email" 
//               {...register('email', { 
//                 required: 'Email is required',
//                 pattern: {
//                   value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
//                   message: 'Invalid email address'
//                 }
//               })} 
//               isInvalid={!!errors.email}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.email?.message}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control 
//               type="password" 
//               placeholder="Password"
//               {...register('password', { 
//                 required: 'Password is required',
//                 minLength: {
//                   value: 6,
//                   message: 'Password must be at least 6 characters long'
//                 }
//               })} 
//               isInvalid={!!errors.password}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.password?.message}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <p className='text-end'>Already have an account? <a className='anchor-color text-decoration-none' href="">log in</a></p>

//           <Button 
//             variant="primary" 
//             type="submit"
//           >
//             Sign Up
//           </Button>
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default AuthForm;


import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './AuthForm.css';
import { Link } from 'react-router-dom'

function AuthForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [email, setEmail] = useState('');

  const onSubmit = async (data) => {
    try {
      console.log('Sending data:', data);
      const res = await axios.post('http://localhost:3000/api/signup', data);
      console.log('Response: ', res);
      if (res.status === 200) {
        setEmail(data.email);
        setShowOtpForm(true);
      }
    } catch (error) {
      console.error("Error: ", error);
      if (error.response) {
        console.error("Error response data: ", error.response.data);
      }
    }
  };
  

  const handleOtpSubmit = async (otpData) => {
    try {
      const res = await axios.post('http://localhost:3000/api/verify-otp', { email, otp: otpData.otp });
      if (res.status === 200) {
        alert('Email verified, signup complete');
        reset();
        setShowOtpForm(false);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className='form-parent'>
      <div>
        {showOtpForm ? (
          <Form className='form-container' onSubmit={handleSubmit(handleOtpSubmit)}>
            <h1 className='text-white text-center mb-4'>Verify Your Email</h1>

            <Form.Group className="mb-3" controlId="formBasicOtp">
              <Form.Label>OTP</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter OTP" 
                {...register('otp', { required: 'OTP is required' })} 
                isInvalid={!!errors.otp}
              />
              <Form.Control.Feedback type="invalid">
                {errors.otp?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Verify OTP
            </Button>
          </Form>
        ) : (
          <Form className='form-container' onSubmit={handleSubmit(onSubmit)}>
            <h1 className='text-white text-center mb-4'>Welcome to <br/> Maxlence Consulting</h1>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Username" 
                {...register('username', { required: 'Username is required' })} 
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username?.message}
              </Form.Control.Feedback>
            </Form.Group>

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

            <p className='text-end'>Already have an account? <Link className='anchor-color text-decoration-none' to="/login">log in</Link></p>

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
