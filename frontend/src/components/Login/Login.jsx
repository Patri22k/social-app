import React from 'react';
import { Button, Form, Input } from 'antd';

const Login = () => {
    return (
        <div className='h-screen w-full flex flex-col items-center justify-center'>
            <Form
                layout='vertical'
            >
                <Form.Item
                    name="username"
                    label="Username"
                    tooltip="This is a required field"
                >
                    <Input placeholder='Enter username...' required/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    tooltip="This is a required field"
                >
                    <Input placeholder='Enter password...' required/>
                </Form.Item>
            </Form>
            <div className='Buttons flex w-full justify-center gap-x-4'>
                <Button className="bg-[#1677ff]"
                    type="primary">
                    Log In
                </Button>
                <Button className="bg-[#1677ff]"
                    type="primary">
                    Sign Up
                </Button>
            </div>
        </div>
    );
}

export default Login;