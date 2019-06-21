<template>
    <v-app>
        <v-card class="user-list-item elevation-0">
            <v-card-text>
                <div class="user-list-item__item">role: <b>{{userItem.role}}</b></div>
                <div class="user-list-item__item">status: <b>{{computeOnlineStatus}}</b></div>
                <div class="user-list-item__item">description:
                    <b>{{userItem.description || 'there is no description :('}}</b></div>
            </v-card-text>
            <span v-show="showAll">{{userItem}}</span>
            <button class="user-list-item__show-all" @click="toggleText">Show all..</button>
        </v-card>
    </v-app>
</template>

<script>
    export default {
        name: "UserListItem",
        props: {
            userItem: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                showAll: false
            }
        },
        methods: {
            toggleText() {
                this.showAll = !this.showAll;
            }
        },
        computed: {
            computeOnlineStatus() {
                return this.userItem.online ? 'online' : 'offline';
            }

        }
    }
</script>

<style scoped>
    .user-list-item {
        margin-bottom: 10px;
    }

    .user-list-item__item {
        font-size: 1.2em;
    }

    .user-list-item__show-all {
        display: block;
        margin: 10px 5px 0;
        color: #00C853;
        font-size: 1.2em;
        font-weight: bold;
        text-decoration: underline;
        outline: none;
    }
</style>