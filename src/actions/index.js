import types from './types';
import axios from 'axios';

export const signUp = (userInfo) => {
    return async (dispatch) => {
        try {
            const resp = await axios.post('http://api.reactprototypes.com/signup', userInfo);

            localStorage.setItem('token', resp.data.token);  //localStorage is save log ins

            dispatch({
                type: types.SIGN_UP
            });
        } catch (err) {
            //err.response.data //Node backend error
            dispatch({
                type: types.SIGN_UP_ERROR,
                error: 'Error creating account'
            });
        }
    }
}

export const signIn = userInfo => async dispatch => {
    try {
        const resp = await axios.post('http://api.reactprototypes.com/signin', userInfo);

        console.log('Sign In Response:', resp);

        localStorage.setItem('token', resp.data.token);  //localStorage is save log ins

        dispatch({
            type: types.SIGN_IN
        });
    } catch (err) {
        dispatch({
            type: types.SIGN_IN_ERROR,
            error: 'Invalid Email and/or Password'
        });
    }
}

export const signOut = () => {
    localStorage.removeItem('token');

    return {
        type: types.SIGN_OUT
    };
}

export const getMovieQuote = () => async dispatch => {
    try {

        const axiosConfig = {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }

        const resp = await axios.get('http://api.reactprototypes.com', axiosConfig);
        
        dispatch({
            type: types.GET_MOVIE_QUOTE,
            quote: resp.data.message
        })

    } catch(err) {
        console.log('Movie Quote Error', err.message);
    }
}