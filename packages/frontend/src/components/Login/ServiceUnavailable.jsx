export default function ServiceUnavailable() {
    return (
        <div className='h-screen w-full flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-bold mb-8'>Service Unavailable</h1>
            <div className='flex flex-col w-[80%] md:w-1/2 lg:w-2/5'>
                <div className='text-lg'>Failed to connect to the server. Please check your connection.</div>
            </div>
        </div>
    );
};
