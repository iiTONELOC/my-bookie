// import {useState, useEffect} from 'react';
import { Box } from 'tailstrap';
export default function Login() {
    console.log('LOGIN PAGE')
    return (
        <Box
            className='bg-gray-200 dark:bg-gray-500 text-black dark:text-gray-300 w-full min-h-full justify-items-center flex-col'
        >
            <h1 className='block text-center'>
                Login
            </h1>

            {/* login form */}
            <form className='w-full max-w-sm bg-gray-500 dark:bg-slate-700'>

            </form>
        </Box>
    )
}