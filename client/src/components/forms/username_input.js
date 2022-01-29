
export default function UsernameInput({
    onChange,
    defaultValue,
}) {
    return (
        <div>
            <label htmlFor="username" className="sr-only">
                Username
            </label>
            <input
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                onChange={onChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-yellow-100 border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                defaultValue={defaultValue}
            />
        </div>
    );
}