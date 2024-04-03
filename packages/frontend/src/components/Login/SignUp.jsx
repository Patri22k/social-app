import React from 'react';
import '../../App.css';
import 'antd/dist/antd.min.css';
import { Button as AntButton } from 'antd';
import { UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Field, Input, Form, SubmitButton, Form as AntForm } from 'formik-antd';
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

const SignUp = () => {
  const navigate = useNavigate();
  const { revalidate } = useUser();

  return (
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          actions.resetForm();

          // TODO: Add func when server is offline
          fetch(getApiUrl('/auth/signup'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          }).catch(err => {
            console.log(err);
            return;
          })
            .then(async (res) => {
              const jsn = await res.json();
              if (res.ok) {
                handleAuthLogin(navigate, revalidate)(jsn);
              } else {
                toast.error(<div className="text-lg">{jsn.message}</div>);
              }
            });
        }}
      >
        {formik => (
          <Form
            className='h-screen w-full flex flex-col items-center justify-center'
            layout='vertical' 
            onFinish={formik.handleSubmit}
          >
            <h1 className='text-4xl font-bold mb-8'>Create Account</h1>
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
                  Create Account
                </SubmitButton>
                <AntButton
                  name="submit"
                  type='primary'
                  onClick={() => {
                    navigate('/login');
                  }}
                >
                  <div className='flex items-center justift-center gap-x-2'>
                    <ArrowLeftOutlined /> Back
                  </div>
                </AntButton>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    );
}

export default SignUp;
