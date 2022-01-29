import { Nav as TailNav, Button } from 'tailstrap'


const navData = [
    {
        name:
            `${window.location.pathname === '/' ? 'Login' : 'Home'}`,
        props: {
            onClick: () => {
                window.location.replace(
                    `${window.location.pathname === '/' ? '/login' : '/'}`
                )
            }
        }
    },
    { name: 'Create Account', props: { onClick: () => window.location.replace('/sign-up') } },
    { name: 'Testing Grounds', props: { onClick: () => window.location.replace('/test') } },
];
export default function Nav() {
    return (
        <TailNav.Bar
            variant='right'
            spacing='gap-8 p-4 items-center'
            className='bg-gray-900 border-b-1 border-indigo-600 w-full text-xl place-content-center'
        >
            {navData.map(item => (
                <TailNav.Item key={item.name}>
                    <Button
                        override={true}
                        label={item.name}
                        props={item.props}
                        className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg p-3'
                    />
                </TailNav.Item>
            ))}
        </TailNav.Bar>
    );
}