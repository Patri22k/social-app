import React from 'react';
import '../../App.css';
import 'antd/dist/antd.min.css';
import { UserOutlined } from '@ant-design/icons';
import { Field, Input, Form, SubmitButton, Form as AntForm } from 'formik-antd';
import { Button as AntButton } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required('This is a required field')
          .min(6, 'Username must be at least 6 characters long')
          .max(20, 'Username must be at most 20 characters long'),
        password: Yup.string()
          .required('This is a required field')
          .min(6, 'Password must be at least 6 characters long')
          .max(20, 'Password must be at most 20 characters long'),
      })}
      onSubmit={(values, actions) => {
        actions.resetForm();

        fetch('http://localhost:5000/auth/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
            body: JSON.stringify(values),
          })
          .catch(err => {
            return;
          })
          .then(res => {
            if (!res || !res.ok || res.status >= 400) {
              return;
            }
            return res.json();
          })
          .then(data => {
            if (!data) {
              return;
            }
            console.log(data);
          });
      }}
    >
      {formik => (
        <Form
          className='h-screen w-full flex flex-col items-center justify-center'
          onFinish={formik.handleSubmit}
          layout='vertical'
        >
          <h1 className='text-4xl font-bold mb-8'>Log In</h1>
          <div className='flex flex-col w-[80%] md:w-1/2 lg:w-2/5'>
            <AntForm.Item name="username" label="Username">
              <Field
                as={Input}
                name="username"
                placeholder='Enter username...'
                size='large'
                prefix={<UserOutlined />}
                autoComplete='off'
              />
            </AntForm.Item>
            <AntForm.Item name="password" label="Password">
              <Field
                as={Input.Password}
                name="password"
                tooltip="This is a required field"
                placeholder='Enter password...'
                size='large'
                autoComplete='off'
              />
            </AntForm.Item>
            <div className='Buttons flex justify-center gap-x-4'>
              <SubmitButton
                name='submit'
                type='primary'
              >
                Log In
              </SubmitButton>
              <AntButton
                name='submit'
                type='primary' 
                onClick={() => {
                    navigate('/signup')
                }}
              >
                Sign Up
              </AntButton>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Login;