import { useState } from 'react';

export default function UsernameInput({
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
            setError('A username is required');
            setValidated(false);
            clearError();
        } else if (len > 0 && len <= 4) {

            setError("Usernames must be at least 5 characters");
            setValidated(false);
            clearError();
        } else {
            setError(null);
            setValidated(true);
        }
    }
    return (
        <div className='relative'>
            {error !== null && (
                <div class="absolute bottom-0 right-0 z-40 mb-1 mr-1">
                    <p className='text-red-500 '>{error}</p>
                </div>
            )}
            <label htmlFor="username" className="sr-only">
                Username
            </label>
            <input
                id="username"
                name="username"
                type="username"
                onBlur={validate}
                autoComplete="username"
                onChange={onChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-yellow-100 border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                defaultValue={defaultValue}
                formdata={`${validated}`}
            />
        </div>
    );
}