/**
 * Renders the views for the application.
 * @returns {JSX.Element} The rendered views.
 */

import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './Login/SignUp';

const Views = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="*" element={<Login />} />
        </Routes>
    )
}

export default Views;