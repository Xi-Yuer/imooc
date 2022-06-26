export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/main/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/index.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile/index.vue'),
  },
  {
    path: '/member',
    name: 'member',
    component: () => import('@/views/member/index.vue'),
  },
]
