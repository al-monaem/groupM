import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div className='flex justify-center mt-24 w-screen h-screen'>
            <div className='flex flex-col items-center space-y-5'>
                <p className='text-2xl font-semibold text-gray-400'>Page Not Found :{"("}</p>
                <p className='tracking-wider'>Oops! 😖 The requested URL was not found on this server.</p>
                <Link
                    to={"/"}
                    className='rounded-md px-3 py-2 text-white font-semibold bg-gradient-to-r from-[#7169e8] to-[#9c95ef] shadow-md shadow-[#9c95ef]'>Go Back Home</Link>
            </div>
        </div>
    )
}

export default Error