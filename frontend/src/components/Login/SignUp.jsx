import React from 'react';
import '../../App.css';
import { Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const SignUp = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('This is a required field')
        .min(6, 'Username must be at least 6 characters long')
        .max(20, 'Username must be at most 20 characters long'),
      password: Yup.string()
        .required('This is a required field')
        .min(6, 'Password must be at least 6 characters long')
        .max(20, 'Password must be at most 20 characters long')
    }),
    onSubmit: (values, actions) => {
      const vals = {...values};
      actions.resetForm();

      fetch ('http://localhost:5000/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vals),
      })
      .catch((err) => {
        return;
      })
      .then((res) => {
        if (!res || !res.ok || res.status >= 400) {
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) {
          return;
        }
        console.log(data);
      });
    },
  });

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold mb-8'>Create Account</h1>
      <Form
        onFinish={formik.handleSubmit}
        className='flex flex-col gap-y-3 w-[80%] md:w-1/2 lg:w-1/3'
        layout='vertical'
      >
        <Form.Item
          help={formik.errors.username && formik.touched.username ? formik.errors.username : null}
          validateStatus={formik.errors.username && formik.touched.username ? 'error' : null}
          name="username"
          label="Username"
          tooltip="This is a required field"
        >
          <Input
            {...formik.getFieldProps('username')}
            placeholder='Enter username...'
            size='large'
            prefix={<UserOutlined />}
            required
          />
        </Form.Item>
        <Form.Item
          help={formik.errors.password && formik.touched.password ? formik.errors.password : null}
          validateStatus={formik.errors.password && formik.touched.password ? 'error' : null}
          name="password"
          label="Password"
          tooltip="This is a required field"
        >
          <Input.Password
            {...formik.getFieldProps('password')}
            placeholder='Enter password...'
            size='large'
            required
          />
        </Form.Item>
        <div className='Buttons flex justify-center gap-x-4'>
          <Button className="bg-[#1677ff]"
            type="primary"
            htmlType='submit'
          >
            Sign Up
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="flex items-center justify-center bg-[#1677ff]"
            type="primary"
          >
            <ArrowLeftOutlined />
            Back
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;