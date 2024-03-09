/**
 * Renders the views for the application.
 * @returns {JSX.Element} The rendered views.
 */

import { Routes, Route } from 'react-router-dom';
import ChatContainer from './ChatContainer';
import ChatHistory from './ChatHistory';
import Login from './Login/Login';
import SignUp from './Login/SignUp';

const Views = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="*" element={<Login />} />
            <Route path="/chat" element={<ChatContainer />} />
            <Route path="/history" element={<ChatHistory />} />
        </Routes>
    )
}

export default Views;