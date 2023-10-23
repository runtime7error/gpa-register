const AuthenticationLogin = () => import('../views/AuthenticationLogin.vue')
const StudentRegisters = () => import('../views/StudentRegisters.vue')
const App = () => import('../App.vue')

export const routes = [
  {
    path: '/',
    redirect: { path: '/authentication-login' },
    name: 'root',
    component: App
  },
  {
    path: '/authentication-login',
    name: 'Login',
    component: AuthenticationLogin
  },
  {
    path: '/student-registers/:id',
    name: 'Student Registers',
    component: StudentRegisters
  }
]
