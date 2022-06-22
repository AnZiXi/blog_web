import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Index from '@/views/Index'
import Edit from '@/views/Edit'
import Search from '@/views/Search'
import Articles from '@/views/Article/Articles'
import ArticleCategory from '@/views/Article/ArticleCategory'
import ArticleDetail from '@/views/Article/ArticleDetail'
import Backstage from '@/views/Backstage'
import Personl from '@/views/Personl'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',

        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        redirect: '/index',
        children: [
            {
                path: '/index',
                name: 'Index',
                component: Index,
				redirect: '/articles',
				children: [
					{
						path: '/articles',
						component: Articles,
					},
					{
						path: '/articles/categories/:id',
						component: ArticleCategory,
					},
				]
            },
			{
			    path: '/articles/detail/:id',
			    component: ArticleDetail,
			},
            {
                path: '/edit',
                name: 'Edit',
                component: Edit,
            },
            {
                path: '/backstage',
                name: 'Backstage',
                component: Backstage,
            },
			{
			    path: '/search',
			    name: 'Search',
			    component: Search,
			},
            {
                path: '/personl',
                name: 'Personl',
                component: Personl,
            }
        ]
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/About')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
