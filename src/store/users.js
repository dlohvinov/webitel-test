import axios from 'axios'

const API_URL = 'https://cloud-ua1.webitel.com/engine';

const state = {
    userList: []
};

const getters = {
    getAllUsers(state) {
        return state.userList;
    }
};

const actions = {
    loadAllUsers(context, headers) {
        const url = API_URL + '/api/v2/accounts';
        const config = {
            headers
        };
        return axios.get(url, config)
            .then(response => {
                    context.commit('setAllUsers', response.data.info);
                },
                error => {
                    // console.log(error.response);
                });
    }
};

const mutations = {
    setAllUsers(state, userList) {
        state.userList = userList;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
