import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auth from '@/components/Auth'
import UserList from '@/components/UserList'
import UserCreate from '@/components/UserCreate'
import BookList from '@/components/BookList'
import BookCreate from '@/components/BookCreate'
import AuthorList from '@/components/AuthorList'
import AuthorCreate from '@/components/AuthorCreate'
import UserBookList from '@/components/UserBookList'
import UserBookCreate from '@/components/UserBookCreate'
import Signup from '@/components/Signup'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/user-list',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/user-list/:msg',
      name: 'UserUpdatedList',
      component: UserList
    },
    {
      path: '/user-create',
      name: 'UserCreate',
      component: UserCreate
    },
    {
      path: '/user-create/:pk',
      name: 'UserUpdate',
      component: UserCreate
    },
    {
      path: '/author-list',
      name: 'AuthorList',
      component: AuthorList
    },
    {
      path: '/author-list/:msg',
      name: 'AuthorUpdatedList',
      component: AuthorList
    },
    {
      path: '/author-create',
      name: 'AuthorCreate',
      component: AuthorCreate
    },
    {
      path: '/author-create/:pk',
      name: 'AuthorUpdate',
      component: AuthorCreate
    },


    {
      path: '/book-list',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/book-list/:msg',
      name: 'BookUpdatedList',
      component: BookList
    },
    {
      path: '/book-create',
      name: 'BookCreate',
      component: BookCreate
    },
    {
      path: '/book-create/:pk',
      name: 'BookUpdate',
      component: BookCreate
    },
    
    {
      path: '/userBook-list',
      name: 'UserBookList',
      component: UserBookList
    },
    {
      path: '/userBook-list/:msg',
      name: 'UserBookUpdatedList',
      component: UserBookList
    },
    {
      path: '/userBook-create',
      name: 'UserBookCreate',
      component: UserBookCreate
    },
    {
      path: '/userBook-create/:pk',
      name: 'UserBookUpdate',
      component: UserBookCreate
    },


    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },

    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }, 

  ]
})
