<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">Detalle de Reserva</h1>
        <div class="flex items-center space-x-4">
          <router-link to="/admin/reservas" class="text-emerald-600 hover:text-emerald-800">
            Volver a reservas
          </router-link>
        </div>
      </div>
    </header>
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div v-if="loading" class="text-center py-10">
        <div class="flex flex-col items-center justify-center">
          <svg class="animate-spin h-8 w-8 text-emerald-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-500">Cargando información de la reserva...</p>
        </div>
      </div>
      
      <div v-else-if="error" class="text-center py-10">
        <p class="text-red-500">{{ error }}</p>
        <button 
          @click="fetchReservation" 
          class="mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Reintentar
        </button>
      </div>
      
      <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Reserva #{{ reservation.reservation_id }}
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Creada el {{ formatDate(reservation.reservation_date) }}
            </p>
          </div>
          <div class="flex space-x-3">
            <button 
              @click="editReservation" 
              class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Editar
            </button>
            <button 
              @click="confirmDelete" 
              class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Eliminar
            </button>
          </div>
        </div>
        
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Cliente
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ reservation.name }} {{ reservation.surname }}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Contacto
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div>Email: {{ reservation.email }}</div>
                <div>Teléfono: {{ reservation.phone }}</div>
                <div>Idioma: {{ reservation.language === 'es' ? 'Español' : 'Inglés' }}</div>
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Fecha y hora
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ formatDate(reservation.date) }} a las {{ formatTime(reservation.time) }}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Personas
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ reservation.people_count }}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Alergias
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ reservation.allergies || 'Ninguna' }}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Brunchs
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div class="space-y-2">
                  <div v-for="(brunch, index) in parsedBrunches" :key="index" class="flex justify-between">
                    <span>{{ brunch.title }}</span>
                    <span>{{ brunch.quantity }} x {{ brunch.price }}</span>
                  </div>
                  <div class="pt-2 border-t border-gray-200 font-medium">
                    Total brunchs: {{ reservation.total_brunchs }}
                  </div>
                </div>
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Pago
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div>Método: {{ reservation.payment_method }}</div>
                <div>Estado: 
                  <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(reservation.payment_status)">
                    {{ reservation.payment_status === 'succeeded' ? 'Pagado' : 'Pendiente' }}
                  </span>
                </div>
                <div v-if="reservation.payment_intent_id">ID de pago: {{ reservation.payment_intent_id }}</div>
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Importes
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span>Total:</span>
                    <span class="font-medium">{{ reservation.total_amount_formatted }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Depósito:</span>
                    <span>{{ reservation.deposit_amount_formatted }}</span>
                  </div>
                  <div class="flex justify-between pt-2 border-t border-gray-200 font-medium">
                    <span>Ratio depósito/total:</span>
                    <span>{{ calculateDepositRatio() }}%</span>
                  </div>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getReservation, deleteReservation } from '@/services/api'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const reservation = ref({})
    const loading = ref(true)
    const error = ref(null)
    
    // Obtener reserva
    const fetchReservation = async () => {
      loading.value = true
      error.value = null
      
      try {
        const data = await getReservation(route.params.id)
        
        // Verificar si la respuesta es un array y tomar el primer elemento
        if (Array.isArray(data) && data.length > 0) {
          reservation.value = data[0]
          console.log("Reserva cargada:", reservation.value)
        } else if (typeof data === 'object' && data !== null) {
          reservation.value = data
          console.log("Reserva cargada (objeto):", reservation.value)
        } else {
          throw new Error('Formato de respuesta inesperado')
        }
      } catch (err) {
        error.value = 'Error al cargar la información de la reserva'
        console.error('Error completo:', err)
      } finally {
        loading.value = false
      }
    }
    
    // Formatear fecha
    const formatDate = (dateString) => {
      if (!dateString) return ''
      
      const date = new Date(dateString)
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
    
    // Formatear hora
    const formatTime = (timeString) => {
      if (!timeString) return ''
      
      // Si ya es un string en formato HH:MM:SS, extraer solo HH:MM
      if (typeof timeString === 'string' && timeString.includes(':')) {
        const parts = timeString.split(':')
        return `${parts[0]}:${parts[1]}`
      }
      
      return timeString
    }
    
    // Obtener clase de estado
    const getStatusClass = (status) => {
      return status === 'succeeded' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-yellow-100 text-yellow-800'
    }
    
    // Parsear brunches
    const parsedBrunches = computed(() => {
      if (!reservation.value || !reservation.value.brunches) {
        return []
      }
      
      try {
        let brunches
        
        if (typeof reservation.value.brunches === 'object') {
          brunches = reservation.value.brunches
        } else if (typeof reservation.value.brunches === 'string') {
          brunches = JSON.parse(reservation.value.brunches)
        } else {
          return []
        }
        
        return Object.values(brunches)
      } catch (e) {
        console.error('Error parsing brunches', e)
        return []
      }
    })
    
    // Calcular ratio depósito/total
    const calculateDepositRatio = () => {
      if (!reservation.value || !reservation.value.deposit_amount || !reservation.value.total_amount) {
        return 0
      }
      
      return Math.round((reservation.value.deposit_amount / reservation.value.total_amount) * 100)
    }
    
    // Editar reserva
    const editReservation = () => {
      router.push(`/admin/reservas/edit/${route.params.id}`)
    }
    
    // Confirmar eliminación
    const confirmDelete = async () => {
      if (confirm(`¿Estás seguro de que deseas eliminar esta reserva?`)) {
        try {
          await deleteReservation(route.params.id)
          router.push('/admin/reservas')
        } catch (err) {
          alert('Error al eliminar la reserva')
          console.error(err)
        }
      }
    }
    
    onMounted(() => {
      // Verificar autenticación
      if (!localStorage.getItem('auth')) {
        router.push('/')
        return
      }
      
      fetchReservation()
    })
    
    return {
      reservation,
      loading,
      error,
      formatDate,
      formatTime,
      getStatusClass,
      parsedBrunches,
      calculateDepositRatio,
      fetchReservation,
      editReservation,
      confirmDelete
    }
  }
}
</script>