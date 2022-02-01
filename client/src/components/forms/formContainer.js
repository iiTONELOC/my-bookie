export default function FormContainer({ action, method, children }) {
    return (
        <div className='w-full max-w-md bg-slate-900 rounded-lg p-3' >
            <form className="mt-8 space-y-6" /*action={action} method={method}*/>
                {children}
            </form>
        </div>
    )
};
