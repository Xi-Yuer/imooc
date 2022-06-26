export default [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/main/index.vue'),
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        // 标记当前页面之后用户登录才能进入
        meta: {
          user: true,
        },
      },
      {
        path: '/member',
        name: 'member',
        component: () => import('@/views/member/index.vue'),
      },
    ],
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
]
