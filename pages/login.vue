<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Cafetería La Baranda</h1>
        <p class="text-gray-600 mt-2">Sistema de gestión de reservas de brunch</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Usuario</label>
          <input 
            id="username" 
            v-model="username" 
            type="text" 
            required 
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input 
            id="password" 
            v-model="password" 
            type="password" 
            required 
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        
        <div>
          <button 
            type="submit" 
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            :disabled="loading"
          >
            <span v-if="loading">Iniciando sesión...</span>
            <span v-else>Iniciar sesión</span>
          </button>
        </div>
        
        <div v-if="error" class="text-red-500 text-center text-sm">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/api'

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await login(username.value, password.value)
    
    if (response.status === 'successful') {
      // Guardar token o estado de autenticación
      localStorage.setItem('auth', 'true')
      router.push('/admin/dashboard')
    } else {
      error.value = 'Usuario o contraseña incorrectos'
    }
  } catch (err) {
    error.value = 'Error al conectar con el servidor'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>