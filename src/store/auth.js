import axios from 'axios'

const API_URL = 'https://cloud-ua1.webitel.com/engine';

const state = {
    username: null,
    userToken: null,
    userKey: null
};

const getters = {
    getSession(state) {
        return {
            userToken: state.userToken,
            userKey: state.userKey
        }
    }
};

const actions = {
    login(context, user) {
        const url = API_URL + '/login';
        return axios.post(url, user)
            .then(response => {
                let userToken = response.data.token;
                let userKey = response.data.key;

                //localStorage is used to store user session and, if token isn't expired when user
                //comes back, login him automatically
                localStorage.setItem('user-token', userToken);
                localStorage.setItem('user-key', userKey);

                context.commit('setSession', {user, userToken, userKey});
            }).catch(error => {
                throw error.response.data;
            });

    },

    logout(context) {
        const url = API_URL + '/logout';
        const config = {
            headers: {
                'X-Access-Token': state.userToken,
                'X-Key': state.userKey
            }
        };
        console.log('config', config);
        let data = {
            username: state.username
        };
        return axios.post(url, data, config)
            .then(response => {
                //localStorage is used to store user session and, if token isn't expired when user
                //comes back, login him automatically
                localStorage.removeItem('user-token');
                localStorage.removeItem('user-key');

                context.commit('removeSession');
            }).catch(error => {
                // console.log('error', error.response);
            });
    }
};

const mutations = {
    setSession(state, session) {
        state.username = session.user.username;
        state.userToken = session.userToken;
        state.userKey = session.userKey;
    },
    removeSession(state) {
        state.username = null;
        state.userToken = null;
        state.userKey = null;
        state.userList = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}