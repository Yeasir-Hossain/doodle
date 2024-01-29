import axios from 'axios';
/**
 * Make an HTTP request to a specified URI with optional data.
 * @param {Object} options - The request options.
 * @param {string} options.method - The HTTP method for the request (e.g. 'GET', 'POST').
 * @param {string} options.uri - The URI for the request.
 * @param {Object} [options.data] - The data to send with the request.
 * @return {Promise} - A promise that resolves with the server's response.
 */
const req = ({
    fullUrl,
    method = 'GET',
    uri = '',
    data,
    signal = new AbortController().signal,
    withCredentials = true,
    ...rest
}) => {
    const url = fullUrl || `${import.meta.env.VITE_SERVER_URL || 'http://localhost:4000/api'}/${uri}`;
    const payload = {
        method,
        withCredentials,
        url,
        signal,
        ...['post', 'patch'].includes(method.toLowerCase()) && { data },
        ...rest
    };
    return axios(payload);
};
export default req;