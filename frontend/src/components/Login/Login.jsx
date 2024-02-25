import 'tailwindcss/tailwind.css';

const Login = () => {
  return (
    <div className="h-full">
        {/* Form elements go here */}
        <form className='flex flex-col'>
            <label>
                Username
                <input type="text" name="name" placeholder="Enter username..." required />
            </label>
            <label>
                Password
                <input type="password" name="password" placeholder="Enter password..." required />
            </label>
            <div className='flex'>
                <button className='py-2 bg-blue-500'>Log In</button>
                <button className='py-2 bg-blue-500'>Create Account</button>
            </div>
        </form>
    </div>
  )
}

export default Login;