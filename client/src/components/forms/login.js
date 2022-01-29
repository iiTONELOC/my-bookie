import { LockClosedIcon } from '@heroicons/react/solid'
import { FormContainer } from '.'
import { loginUser } from "../../api"
import { useState, useEffect } from 'react'

function getRemembered() {
    const remembered = localStorage.getItem('_remember_me');
    if (remembered) {
        const data = JSON.parse(remembered);
        return { email: data.email, password: null }
    };
    return null;
};
export default function LoginForm() {
    const [checked, setChecked] = useState(false)
    const [formState, setFormState] = useState(getRemembered() || { email: null, password: null })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    const handleRemember = (e) => {
        const { checked } = e.target;
        setChecked(checked);
    };
    const submitFormHandler = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const user = {
            email: formState.email,
            password: formState.password
        };
        const response = await loginUser(user);
        if (response.status === 200) {
            const data = await response.json();
            const { error, token, ...rest } = data
            // set the token in local storage
            localStorage.setItem('_book_token', data.token);
            //  if the user wants to be remembered
            if (checked) {
                localStorage.setItem(`_remember_me`, JSON.stringify(rest));
            }
            // window.location.href = '/';
        } else {
            alert('Wrong username or password');
        };
    };
    return (
        <FormContainer>
            <h2 className='text-center text-xl text-gray-400 -mt-8'>Login</h2>
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={handleChange}
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        onChange={handleRemember}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                        Remember me
                    </label>
                </div>


            </div>

            <div>
                <button
                    onClick={submitFormHandler}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                    </span>
                    Sign in
                </button>
            </div>
        </FormContainer>
    )
}