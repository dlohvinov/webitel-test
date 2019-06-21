<template>
    <v-app>
        <header class="app-header green darken-1 elevation-3">
            <h1 class="app-header__header">Webitel test work by Daniil Lohvinov</h1>
            <nav class="app-header__nav">
                <router-link to="/" class="app-header__nav__link">
                    <v-btn class="app-header__nav__link__button green darken-3">to list</v-btn>
                </router-link>

                <router-link to="/auth" class="app-header__nav__link">
                    <v-btn class="app-header__nav__link__button green darken-3">to auth</v-btn>
                </router-link>
            </nav>
        </header>
        <router-view class="app-content"></router-view>
    </v-app>
</template>

<script>

    export default {
        name: 'App',
        data() {
            return {}
        }
    }
</script>

<style>
    @import "assets/css/main.css";

    .app-header {
        text-align: center;
        padding: 25px 0 15px;
        font-size: 1.6em;
        color: #ffffff;
        text-shadow: 1px 1px 3px #2E7D32;
    }

    .app-header__nav__link {
        text-decoration: none;
    }

    .app-header__nav__link .app-header__nav__link__button {
        color: #fff;
    }

    .app-content {
        width: 60%;
        margin: 0 auto 30px;
    }
</style>