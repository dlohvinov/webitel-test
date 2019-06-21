<template>
    <v-app>
        <section class="user-list section green lighten-3">
            <header class="user-list-header section-header">
                <h2 class="user-list-header__header">User List: </h2>
                <v-btn class="user-list-header__logout" v-if="isAuth" @click="logout" type="button">logout</v-btn>
                <v-text-field
                        class="user-list__search-input"
                        v-if="isAuth"
                        type="text"
                        placeholder="search by name.."
                        v-model="searchByName"
                ></v-text-field>
            </header>

            <v-expansion-panel class="user-list__list" v-if="isAuth">
                <v-expansion-panel-content
                        v-for="(item, i) in filterUsers"
                        :key="i"
                >
                    <template v-slot:header>
                        <h3 class="user-list__list__header">{{filterUsers[i].name}}</h3>
                    </template>
                    <user-list-item
                            class="user-list-item"
                            :userItem=item
                    ></user-list-item>
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-card v-if="!isAuth" class="green accent-1">
                <v-card-title>Whoops..</v-card-title>
                <v-card-text>Seems that you're not logged in!</v-card-text>
            </v-card>
        </section>
    </v-app>
</template>

<script>
    import UserListItem from './UserListItem';

    export default {
        name: "UserList",
        components: {
            'user-list-item': UserListItem
        },
        data() {
            return {
                userList: [],
                isAuth: false,
                searchByName: ''
            }
        },
        created() {
            let session = this.$store.getters.getSession;

            if (session.userToken !== null) {
                this.isAuth = true;
                let userList = this.$store.getters.getAllUsers;
                if (userList.length == 0) {
                    session = {
                        'X-Access-Token': session.userToken,
                        'X-Key': session.userKey
                    };
                    this.$store.dispatch('loadAllUsers', session).then(() => {
                        let userList = this.$store.getters.getAllUsers;
                        this.convertUsersToArray(userList);
                    });
                } else {
                    this.convertUsersToArray(userList);
                }
            } else {
                this.isAuth = false;
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout').then(() => {
                    this.isAuth = false;
                    this.$router.push('/auth');
                });
            },
            convertUsersToArray(usersObj) {
                for (let property in usersObj) {
                    if (usersObj.hasOwnProperty(property)) this.userList.push(usersObj[property]);
                }
            }
        },
        computed: {
            filterUsers() {
                return this.userList.filter(user => {
                    return !this.searchByName || user.name.toLowerCase().indexOf(this.searchByName.toLowerCase()) > -1
                });
            }
        }
    }
</script>

<style scoped>

    .user-list-header__header {
        flex-grow: 100;
    }

    .user-list__search-input {
        width: 200px;
        margin-left: 20px;
    }

    .user-list-header__logout {
        float: right;
        margin-right: 20px;
    }

    .user-list__list {
        padding: 0 30px;
        background: #fff;
    }

    .user-list__list__header {
        position: relative;
        color: #388E3C;
    }

    .user-list-item {
        padding: 0 30px;
        background: transparent;
    }
</style>