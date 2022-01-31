import { FormContainer } from '.'
import auth from '../../utils/auth';
import EmailInput from './email_input';
import { isFormValidated } from './login';
import { createNewUser } from "../../api";
import { getRemembered } from './checkbox';
import { useState, } from 'react';
import PasswordInput from './password_input';
import UsernameInput from './username_input';

import { PlusCircleIcon, ExclamationCircleIcon as AlertIcon } from "@heroicons/react/solid";

export default function SignUpForm() {
    const [errorMessage, setErrorMessage] = useState(null)
    const [formState, setFormState] = useState(getRemembered() !== !null ? { email: null, username: null, password: null }
        : { email: getRemembered().email, username: null, password: null })
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
        const validated = isFormValidated(formState);
        if (validated === true || validated === 'true') {
            const response = await createNewUser(newUser);
            const data = await response.json();
            const { token } = data;
            if (response.status === 200) {
                return auth.login(token);
            } else {
                const { error } = data;
                if (error) {
                    setErrorMessage(error);
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 3500)
                }
            };
        }
    };

    return (
        <>
            <div className='bg-red-500 rounded-lg text-white flex flex-row justify-between drop-shadow-lg'>
                {errorMessage && <><AlertIcon className='ml-1 w-7 h-7 self-center' /><span className='p-2 ml-1 content-center'>{errorMessage.message}</span></>}
            </div>
            <FormContainer>
                <h2 className='text-center text-xl text-gray-300 -mt-8'>Sign Up</h2>
                <div className="rounded-md shadow-sm -space-y-px">

                    <EmailInput onChange={handleChange} defaultValue={formState.email} />
                    <UsernameInput onChange={handleChange} defaultValue={formState.username} />
                    <PasswordInput onChange={handleChange} />
                </div>
                <div className="flex items-center justify-between">
                    <span
                        tabIndex={-1}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.replace('/login') }}
                        className="bg-slate-900 hover:bg-indigo-800 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Login instead
                    </span>
                </div>
                <div>
                    <button
                        disabled={!isFormValidated(formState)}
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