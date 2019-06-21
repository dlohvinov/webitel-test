import Login from './components/Login';
import UserList from './components/UserList';

export default [
    {path: '/', component: UserList},
    {path: '/auth', component: Login}
];