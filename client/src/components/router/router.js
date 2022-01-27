import { Home } from '../../pages/home';
import { NotFound } from '../notfound';

export default function Router({ path }) {
    /*Handles front end routing */;
    switch (path) {
        case '/':
            return <Home />
        default:
            return <NotFound />
    }
}