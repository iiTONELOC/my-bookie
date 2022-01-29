import { FormContainer } from '.'
import Checkbox, { getRemembered } from './checkbox';
import auth from '../../utils/auth';
import { createNewUser } from "../../api";
import EmailInput from './email_input';
import { useState, useEffect } from 'react';
import PasswordInput from './password_input';
import UsernameInput from './username_input';
import { PlusCircleIcon } from "@heroicons/react/solid";

export default function SignUpForm() {
    const [checked, setChecked] = useState(localStorage.getItem('_remember_me') ? true : false)
    const [formState, setFormState] = useState(getRemembered() === null ? { email: null, password: null }
        : getRemembered())
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    const submitFormHandler = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newUser = {
            email: formState.email,
            username: formState.username,
            password: formState.password
        };
        const response = await createNewUser(newUser);
        if (response.status === 200) {
            const data = await response.json();
            const { error, token, ...rest } = data;
            // set the token in local storage
            if (checked) localStorage.setItem(`_remember_me`, JSON.stringify(rest));
            return auth.login(token);
        } else {
            alert('Wrong username or password');
        };
    };
    useEffect(() => {
        if (checked === false) localStorage.removeItem('_remember_me');
    }, [checked]);
    return (
        <>
            <div className='bg-red-500 rounded-lg'>
                {/* error */}
                {/* <span>This is an error!</span> */}
            </div>
            <FormContainer>
                <h2 className='text-center text-xl text-gray-300 -mt-8'>Sign Up</h2>
                <div className="rounded-md shadow-sm -space-y-px">

                    <EmailInput onChange={handleChange} defaultValue={formState.email} />
                    <UsernameInput onChange={handleChange} defaultValue={formState.username} />
                    <PasswordInput onChange={handleChange} />
                </div>
                <div className="flex items-center justify-between">
                    <Checkbox checked={checked} setChecked={setChecked} />
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.replace('/login') }}
                        className="bg-slate-900 hover:bg-indigo-800 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Login instead
                    </button>
                </div>
                <div>
                    <button
                        onClick={submitFormHandler}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <PlusCircleIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                        </span>
                        Create account
                    </button>
                </div>
            </FormContainer>
        </>
    );
};