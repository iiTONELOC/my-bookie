export function getRemembered() {
    const remembered = localStorage.getItem('_remember_me');
    if (remembered) {
        const data = JSON.parse(remembered);
        return { email: data.email, password: null }
    };
    return null;
};

export default function Checkbox({ checked, setChecked }) {
    const handleCheck = (e) => {
        const { checked } = e.target;
        setChecked(checked);
    };
    return (
        <div className="flex items-center">
            <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                onChange={handleCheck}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                defaultChecked={checked}
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
            </label>
        </div>
    )
}