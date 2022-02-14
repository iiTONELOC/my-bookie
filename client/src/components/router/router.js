import { Home, Login, SignUp, Dashboard } from '../../pages';
import { WithAuthorization, DatabaseProvider } from '../../providers';
import { NotFound } from '../notfound';

export default function Router({ path }) {
    const userDash = path.split('/');
    if (userDash[3] === 'dashboard') {
        return (
            <WithAuthorization>
                <DatabaseProvider>
                    <Dashboard />
                </DatabaseProvider>
            </WithAuthorization>
        )
    } else {
        switch (path) {
            case '/':
                return <Home />
            case '/login':
                return <Login />
            case '/sign-up':
                return <SignUp />
            default:
                return <NotFound />
        }
    }
}