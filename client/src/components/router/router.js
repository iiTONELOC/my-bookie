import { Home, Login } from '../../pages';
import { NotFound } from '../notfound';

export default function Router({ path }) {
    /*Handles front end routing */;
    switch (path) {
        case '/':
            return <Home />
        case '/login':
            return <Login />
        default:
            return <NotFound />
    }
}