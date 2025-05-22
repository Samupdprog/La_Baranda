import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  // Solo aplicar a rutas que comiencen con /admin
  if (to.path.startsWith('/admin')) {
    // Verificar si estamos en el cliente (navegador)
    if (process.client) {
      // Verificar si el usuario está autenticado
      const isAuth = localStorage.getItem('auth') === 'true'
      
      // Si no está autenticado, redirigir a la página de login
      if (!isAuth) {
        return navigateTo('/login')
      }
    } else {
      // En el servidor, redirigir a login por defecto
      // Esto evita problemas con SSR ya que localStorage no está disponible
      return navigateTo('/login')
    }
  }
})