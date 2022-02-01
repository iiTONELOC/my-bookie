import decode from 'jwt-decode';

class AuthService {

    getProfile() {
        try {
            return decode(this.getToken());
        } catch (error) {
            return null
        };
    };

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    };

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        };
    };

    // retrieve token from localStorage
    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('_book_token');
    }

    // set token to localStorage and reload page to homepage
    async login(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('_book_token', idToken);
        setTimeout(async () => {
            const uData = await this.getProfile();
            window.location.replace(`/users/${uData._id}/dashboard`);
            return true
        }, 250);
    };

    logout() {
        localStorage.removeItem('_book_token');
        window.location.replace('/');
    };
};

export default new AuthService();