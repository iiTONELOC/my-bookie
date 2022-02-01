import { Home, Login, SignUp } from '../../pages';
import { NotFound } from '../notfound';

export default function Router({ path }) {
    /*Handles front end routing */;
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