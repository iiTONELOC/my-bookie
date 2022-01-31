import { useState } from 'react';
import { getRemembered } from './checkbox';
import { validateEmail } from '../../utils/validateEmail';
export default function EmailInput({
    onChange,
    defaultValue,
}) {
    const [error, setError] = useState(null);
    const [validated, setValidated] = useState(false);
    const clearError = () => {
        setTimeout(() => {
            setError(null);
        }, 10000);
    };
    const validate = (e) => {
        const len = e.target.value.length;
        if (len === 0) {
            setError('Email is required');
            setValidated(false);
            clearError();
        } else if (len > 0) {
            const isValid = validateEmail(e.target.value);
            console.log('EMAIL CHECK', isValid);
            if (!isValid) {
                setError('Please enter a valid email address');
                setValidated(false);
                clearError();
            }
        } else {
            setError(null);
            setValidated(true);
        }
    }

    return (
        <div className="relative">
            {error !== null && (
                <div class="absolute bottom-0 right-0 z-40 mb-1 mr-1">
                    <p className='text-red-500 '>{error}</p>
                </div>
            )}
            <label htmlFor="email-address" className="sr-only" >
                Email address
            </label>
            <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                onBlur={validate}
                onChange={onChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-yellow-100 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                defaultValue={defaultValue}
                formdata={`${getRemembered() !== null ? true : validated}`}
            />
        </div>
    );
}