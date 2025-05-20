<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-emerald-800 text-white shadow-md">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">La Baranda</h1>
        <div class="flex items-center gap-4">
          <button 
            class="bg-white text-emerald-800 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
            @click="goBack"
          >
            Volver a reservas
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-6">
      <div class="bg-white rounded-lg shadow">
        <!-- Loading State -->
        <div v-if="loading" class="p-8 flex flex-col items-center justify-center">
          <svg class="animate-spin h-10 w-10 text-emerald-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-500">Cargando información de la reserva...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="p-8 flex flex-col items-center justify-center">
          <div class="rounded-full bg-red-100 p-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-red-500 mb-4">{{ error }}</p>
          <div class="flex gap-3">
            <button 
              @click="fetchReservation" 
              class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            >
              Reintentar
            </button>
            <button 
              @click="goBack" 
              class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Volver
            </button>
          </div>
        </div>

        <!-- Reservation Details -->
        <div v-else-if="reservation" class="divide-y divide-gray-200">
          <!-- Header with Actions -->
          <div class="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-2xl font-bold text-gray-900">Reserva #{{ reservation.reservation_id }}</h2>
                <span 
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-800': reservation.payment_status === 'succeeded',
                    'bg-yellow-100 text-yellow-800': reservation.payment_status === 'pending',
                    'bg-red-100 text-red-800': reservation.payment_status === 'failed'
                  }"
                >
                  {{ getPaymentStatusText(reservation.payment_status) }}
                </span>
              </div>
              <p class="text-sm text-gray-500 mt-1">
                Creada el {{ formatDate(reservation.created_at) }}
              </p>
            </div>
            <div class="flex gap-2">
              <button 
                @click="editReservation" 
                class="flex items-center gap-1 px-3 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar
              </button>
              <button 
                @click="confirmDelete" 
                class="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Eliminar
              </button>
            </div>
          </div>

          <!-- Customer Information -->
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Información del cliente</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p class="text-sm font-medium text-gray-500">Nombre completo</p>
                <p class="mt-1">{{ reservation.name }} {{ reservation.surname }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Email</p>
                <p class="mt-1">{{ reservation.email || 'No especificado' }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Teléfono</p>
                <p class="mt-1">{{ reservation.phone || 'No especificado' }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Idioma</p>
                <p class="mt-1">{{ getLanguageText(reservation.language) }}</p>
              </div>
            </div>
          </div>

          <!-- Reservation Details -->
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Detalles de la reserva</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p class="text-sm font-medium text-gray-500">Fecha</p>
                <p class="mt-1">{{ formatDate(reservation.date) }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Hora</p>
                <p class="mt-1">{{ formatTime(reservation.time) }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Número de personas</p>
                <p class="mt-1">{{ reservation.people_count }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Alergias</p>
                <p class="mt-1">{{ reservation.allergies || 'Ninguna' }}</p>
              </div>
            </div>
          </div>

          <!-- Brunch Details -->
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Brunchs</h3>
            <div class="overflow-hidden bg-white shadow sm:rounded-md">
              <ul class="divide-y divide-gray-200">
                <li v-for="(brunch, index) in parsedBrunches" :key="index" class="px-4 py-4 sm:px-6">
                  <div class="flex items-center justify-between">
                    <p class="font-medium text-emerald-700">{{ brunch.title }}</p>
                    <div class="flex items-center">
                      <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                        {{ brunch.quantity }} unidades
                      </p>
                    </div>
                  </div>
                  <div class="mt-2 sm:flex sm:justify-between">
                    <div class="sm:flex">
                      <p class="flex items-center text-sm text-gray-500">
                        {{ brunch.price ? (brunch.price / 100).toFixed(2) + ' €' : 'Precio no disponible' }}
                      </p>
                    </div>
                    <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        Subtotal: {{ brunch.subtotal ? (brunch.subtotal / 100).toFixed(2) + ' €' : 'N/A' }}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Payment Information -->
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Información de pago</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p class="text-sm font-medium text-gray-500">Método de pago</p>
                <p class="mt-1">{{ reservation.payment_method || 'No especificado' }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Estado del pago</p>
                <p class="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-800': reservation.payment_status === 'succeeded',
                    'bg-yellow-100 text-yellow-800': reservation.payment_status === 'pending',
                    'bg-red-100 text-red-800': reservation.payment_status === 'failed'
                  }">
                  {{ getPaymentStatusText(reservation.payment_status) }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Total brunchs</p>
                <p class="mt-1">{{ reservation.total_brunchs || 0 }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Importe total</p>
                <p class="mt-1 text-lg font-bold text-emerald-700">
                  {{ reservation.total_amount_formatted || formatAmount(reservation.total_amount) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div class="p-6" v-if="reservation.notes">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Notas</h3>
            <div class="bg-gray-50 p-4 rounded-md">
              <p class="text-gray-700 whitespace-pre-line">{{ reservation.notes }}</p>
            </div>
          </div>

          <!-- Actions Footer -->
          <div class="p-6 flex justify-between">
            <button 
              @click="goBack" 
              class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Volver a reservas
            </button>
            <button 
              @click="editReservation" 
              class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            >
              Editar reserva
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getReservation, deleteReservation } from '@/services/api'

const route = useRoute()
const router = useRouter()
const reservation = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(() => {
  fetchReservation()
})

// Obtener los datos de la reserva
const fetchReservation = async () => {
  loading.value = true
  error.value = null
  
  try {
    const data = await getReservation(route.params.id)
    reservation.value = data
    console.log('Datos de la reserva:', data)
  } catch (err) {
    console.error('Error al cargar la reserva:', err)
    error.value = `Error al cargar la información de la reserva: ${err.message}`
  } finally {
    loading.value = false
  }
}

// Formatear fecha
const formatDate = (dateString) => {
  if (!dateString) return 'Fecha no disponible'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } catch (e) {
    console.error('Error al formatear fecha:', e)
    return dateString
  }
}

// Formatear hora
const formatTime = (timeString) => {
  if (!timeString) return 'Hora no disponible'
  
  // Si ya es un string en formato HH:MM:SS, extraer solo HH:MM
  if (typeof timeString === 'string' && timeString.includes(':')) {
    const parts = timeString.split(':')
    return `${parts[0]}:${parts[1]}`
  }
  
  return timeString
}

// Formatear importe
const formatAmount = (amount) => {
  if (amount === undefined || amount === null) return 'No disponible'
  
  // Si el importe está en céntimos, dividir por 100
  return (amount / 100).toFixed(2) + ' €'
}

// Obtener texto de estado de pago
const getPaymentStatusText = (status) => {
  if (!status) return 'No disponible'
  
  switch (status.toLowerCase()) {
    case 'succeeded':
      return 'Pagado'
    case 'pending':
      return 'Pendiente'
    case 'failed':
      return 'Fallido'
    default:
      return status
  }
}

// Obtener texto de idioma
const getLanguageText = (lang) => {
  if (!lang) return 'No especificado'
  
  switch (lang.toLowerCase()) {
    case 'es':
      return 'Español'
    case 'en':
      return 'Inglés'
    default:
      return lang
  }
}

// Parsear brunches
const parsedBrunches = computed(() => {
  if (!reservation.value || !reservation.value.brunches) {
    return []
  }
  
  try {
    let brunches
    
    // Si brunches ya es un objeto, usarlo directamente
    if (typeof reservation.value.brunches === 'object' && !Array.isArray(reservation.value.brunches)) {
      brunches = reservation.value.brunches
    } 
    // Si es un string, intentar parsearlo como JSON
    else if (typeof reservation.value.brunches === 'string') {
      brunches = JSON.parse(reservation.value.brunches)
    } else {
      return []
    }
    
    // Convertir el objeto de brunches a un array para iterar
    return Object.values(brunches).filter(brunch => brunch && brunch.title)
  } catch (e) {
    console.error('Error al parsear brunches', e)
    return []
  }
})

// Navegar a la página de edición
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
      error.value = `Error al eliminar la reserva: ${err.message}`
    }
  }
}

// Volver a la lista de reservas
const goBack = () => {
  router.push('/admin/reservas')
}
</script>
