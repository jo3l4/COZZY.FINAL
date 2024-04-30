// import fetchIntercept from 'fetch-intercept';

const auth = {
    getBearerToken() {
        return localStorage.getItem('bearer-token');
    },
    setBearerToken(val) {
        localStorage.setItem('bearer-token', val);
    }
};



export default auth