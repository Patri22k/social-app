import React from 'react';
import '../../App.css';
import { Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import TextField from '../TextField';

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
                    <div
                        className='flex flex-col gap-y-3 w-[80%] md:w-1/2 lg:w-1/3'
                    >
                        <TextField
                            help={formik.errors.username && formik.touched.username ? formik.errors.username : null}
                            validateStatus={formik.errors.username && formik.touched.username ? 'error' : null}
                            name="username"
                            label="Username"
                            tooltip="This is a required field"
                            placeholder='Enter username...'
                            size='large'
                            prefix={<UserOutlined />}
                        />
                        <Input.Password
                            help={formik.errors.password && formik.touched.password ? formik.errors.password : null}
                            validateStatus={formik.errors.password && formik.touched.password ? 'error' : null}
                            name="password"
                            label="Password"
                            tooltip="This is a required field"
                            placeholder='Enter password...'

                            size='large'
                        />
                        <div className='Buttons flex justify-center gap-x-4'>
                            <Button className="bg-[#1677ff]"
                                type="primary"
                                htmlType='submit'
                            >
                                Log In
                            </Button>
                            <Button
                                className="bg-[#1677ff]"
                                type="primary"
                                onClick={() => navigate('/signup')}
                            >
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default Login;