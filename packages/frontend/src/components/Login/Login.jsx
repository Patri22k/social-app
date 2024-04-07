import React from 'react';
import '../../App.css';
import 'antd/dist/antd.min.css';
import { UserOutlined } from '@ant-design/icons';
import { Field, Input, Form, SubmitButton, Form as AntForm } from 'formik-antd';
import { Button as AntButton } from 'antd';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { schema } from '@socialapp-clone/shared/validationSchema';
import { handleAuthLogin } from '../../handlers/auth';
import { getApiUrl } from '../../util';
import { useUser } from '../../hooks/user';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleArrowDownClick } from '../../handlers/key/arrowDown';
import { handleArrowUpClick } from '../../handlers/key/arrowUp';

const Login = () => {
  const navigate = useNavigate();
  const { revalidate } = useUser();

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        actions.resetForm();
        // const token = localStorage.getItem('jwt');

        fetch(getApiUrl('/auth/login'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(values),
          //credentials: 'include',
        })
          .then(async (res) => {
            const jsn = await res.json();
            if (res.ok) {
              handleAuthLogin(navigate, revalidate)(res);
            } else if (jsn.message) {
              toast.error(<div className='text-lg'>{jsn.message}</div>);
            }
          })
          //.then(res => res.json())
          //.then(data => {
            //if (data.token) {
            //  const jwt = data.token;
            //  handleAuthLogin(navigate, revalidate)(jwt);
            //} else if (data.message) {
            //  toast.error(<div className='text-lg'>{data.message}</div>);
            //}
          .catch((err) => {
            console.error(err);
            toast.error(<div className='text-lg'>Failed to connect to the server. Please check your connection.</div>);
            /*
            if (err.message === 'Failed to fetch') {
              navigate('/service-unavailable');
            } else if (err.message === 'Invalid token' || err.message === 'Unauthorized') {
              navigate('/login');
            } else {
              toast.error(<div className='text-lg'>Failed to connect to the server. Please check your connection.</div>);
            }
            */
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
                onKeyDown={handleArrowDownClick}
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
                onKeyDown={handleArrowUpClick}
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
                type='primary'
                name='submit'
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
