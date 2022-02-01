import { FormContainer } from '.'
import auth from '../../utils/auth';
import { loginUser } from "../../api";
import EmailInput from './email_input';
import { useState, useEffect } from 'react';
import PasswordInput from './password_input';
import Checkbox, { getRemembered } from './checkbox';
import { LockClosedIcon, ExclamationCircleIcon as AlertIcon } from '@heroicons/react/solid'

export function isFormValidated(formState) {
    if (formState) {
        const fields = document.querySelectorAll('[formdata]');
        let valid = []
        console.log(fields)
        console.log(document.querySelectorAll('[formdata]'))
        document.querySelectorAll('[formdata]').forEach(field => {

            const val = field?.attributes?.formdata?.value;
            valid.push(val)
        });

        [...Object.values(formState)].forEach(value => {

            if (value === null || value.trim() === '') {
                valid.push(false)
            } else {
                valid.push(true)
            }
        });
        let res
        for (let i = 0; i < valid.length; i++) {
            const el = valid[i];
            if (el === false || el === 'false') {
                res = false
                break
            } else {
                res = true
            }
        }
        return res
    } else {
        return false
    }
}


export default function LoginForm() {
    const [checked, setChecked] = useState(localStorage.getItem('_remember_me') ? true : false)
    const [errorMessage, setErrorMessage] = useState(null)
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
        const user = {
            email: formState.email,
            password: formState.password
        };
        // check form stats

        const response = await loginUser(user);
        const data = await response.json();
        if (response.status === 200) {
            const { token, ...rest } = data;
            // set the token in local storage
            if (checked) localStorage.setItem(`_remember_me`, JSON.stringify(rest));
            return auth.login(token);
        } else {
            const { error } = data;
            if (error) {
                setErrorMessage(error);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3500)
            }
        }

    };
    useEffect(() => {
        if (checked === false) localStorage.removeItem('_remember_me');
    }, [checked]);
    return (
        <>
            <div className='bg-red-500 rounded-lg text-white flex flex-row justify-between drop-shadow-lg'>
                {errorMessage && <><AlertIcon className='ml-1 w-7 h-7 self-center' /><span className='p-2 ml-1 content-center'>{errorMessage.message}</span></>}
            </div>
            <FormContainer>
                <h2 className='text-center text-xl text-gray-300 -mt-8'>Login</h2>
                <div className="rounded-md shadow-sm -space-y-px">
                    <EmailInput onChange={handleChange} defaultValue={formState.email} />
                    <PasswordInput onChange={handleChange} />
                </div>
                <div className="flex items-center justify-between">
                    <Checkbox checked={checked} setChecked={setChecked} />
                    <span
                        tabIndex={-1}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.replace('/sign-up') }}
                        className="bg-slate-900 hover:bg-indigo-800 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Create account instead
                    </span>
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
        </>
    );
};