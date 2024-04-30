// import fetchIntercept from 'fetch-intercept';

const auth = {
    getBearerToken() {
        return localStorage.getItem('bearer-token');
    },
    setBearerToken(val) {
        localStorage.setItem('bearer-token', val);
    },
    isLoggedIn() {
        return !!localStorage.getItem('bearer-token');
    },
    logout() {
        localStorage.removeItem('bearer-token');
    }
};



export default auth