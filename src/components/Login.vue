<template>
    <v-app>
        <section class="auth section green lighten-3">
            <header class="auth-header section-header">
                <h2 class="auth-header__header">Auth: </h2>
            </header>
            <v-form v-if="!isAuth" class="auth-from elevation-3">
                <v-alert
                        class="auth-form__error"
                        :value="errorMessage"
                        type="error"
                >
                    {{this.errorMessage}}
                </v-alert>
                <v-text-field
                        class="auth-from__input"
                        type="text"
                        placeholder="username"
                        v-model="user.username"
                        required
                ></v-text-field>
                <v-text-field
                        class="auth-from__input"
                        type="password"
                        placeholder="password"
                        v-model="user.password"
                        required
                ></v-text-field>
                <v-btn class="auth-from__button green lighten-5" @click="login" type="button">login</v-btn>
            </v-form>
            <v-card v-if="isAuth" class="green accent-1">
                <v-card-title>Whoops..</v-card-title>
                <v-card-text>Seems that you're already logged in!</v-card-text>
            </v-card>
        </section>
    </v-app>
</template>

<script>

    export default {
        name: 'Login',
        data() {
            return {
                user: {
                    username: 'test@demo.webitel.com',
                    password: 'T2eDYGfhy0rL3nW3'
                },
                isAuth: false,
                errorMessage: ''
            }
        },
        created() {
            let session = this.$store.getters.getSession;
            session.userToken !== null ? this.isAuth = true : this.isAuth = false;
        },
        methods: {
            login() {
                this.$store.dispatch('login', this.user)
                    .then(
                        () => {
                            this.isAuth = true;
                            this.$router.push("/");
                        },
                        (reject) => {
                            this.errorMessage = reject.info;
                            setTimeout(() => {
                                this.errorMessage = '';
                            }, 4000);
                        });
            },
        }
    }
</script>

<style scoped>
    .auth-from {
        position: relative;
        width: 400px;
        padding: 30px;
        margin: 30px auto;
        background: #fff;
        border-radius: 5px;
    }

    .auth-form__error {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 20px;
    }
</style>
