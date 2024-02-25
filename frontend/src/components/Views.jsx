import { Routes, Route } from 'react-router-dom';

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