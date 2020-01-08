import layouts from '@/layout'
export default [
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: layouts,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/pages/Home')
      },]
  },
]
