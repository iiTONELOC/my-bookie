export default function Checkbox({ onChange, defaultChecked }) {
    return (
        <div className="flex items-center">
            <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                onChange={onChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                defaultChecked={defaultChecked}
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
            </label>
        </div>
    )
}