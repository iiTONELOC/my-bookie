import { useState } from 'react';

export default function PasswordInput({
    onChange,
}) {
    const [error, setError] = useState(null);
    const clearError = () => {
        setTimeout(() => {
            setError(null);
        }, 10000);
    };
    const validate = (e) => {
        const len = e.target.value.length;
        if (len === 0) {
            setError('A password is required');
            clearError();
        } else if (len <= 7) {
            setError("Passwords must be at least 8 characters");
            clearError();
        } else if (len >= 8) {
            setError(null);
        };
    };

    return (
        <div className='relative'>
            {error !== null && (
                <div class="absolute bottom-0 right-0 z-40 mb-1 mr-1">
                    <p className='text-red-500 '>{error}</p>
                </div>
            )}
            <label htmlFor="password" className="sr-only">
                Password
            </label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={onChange}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-yellow-100 border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onBlur={validate}
            />
        </div>
    );
}