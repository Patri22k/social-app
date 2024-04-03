export default function ServiceUnavailable() {
    return (
        <div className='h-screen w-full flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-bold mb-8'>Service Unavailable</h1>
            <div className='flex flex-col w-[80%] md:w-1/2 lg:w-2/5 items-center'>
                <div className='text-lg text-center'>Sorry for this inconvenience, but our servers are currently down. Please try again later.</div>
            </div>
        </div>
    );
};
