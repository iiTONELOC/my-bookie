import { useState, useEffect } from 'react';
import { Button, Label, Page, Box } from 'tailstrap'

export default function TestPage() {
    const [apiCalls, setApiCalls] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [users, setApiData] = useState(null);
    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, [])

    const handleClick = async () => {
        if (isMounted) {
            setApiCalls(apiCalls + 1);
            const response = await fetch(`/api/users`, {
                method: 'GET',
                // body: JSON.stringify({
                //     'email': 'test@test.com',
                //     'username': 'test',
                //     'password': 'test'
                // }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            setApiData(data);
        }
    };
    return (
        <Page variant='start-center' className='bg-gray-300 dark:bg-slate-900 gap-7 text-center h-screen'>
            <h1 className='text-6xl '>
                Welcome to React-Flask
            </h1>
            <Button
                variant='success-outline'
                label='Click to get all users'
                props={{
                    onClick: handleClick
                }}
            />

            <Label label={'Number of API CALLS: ' + apiCalls} variant='dark' rounded='rounded-lg' />
            {users &&
                (<Box className='bg-black text-white text-left py-3 rounded-lg px-5 overflow-y-scroll mb-5'>
                    <pre>{JSON.stringify({ users }, null, 2)}</pre>
                </Box>)}
        </Page>
    )
}