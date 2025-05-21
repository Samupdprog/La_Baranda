<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">Nueva Reserva</h1>
        <div class="flex items-center space-x-4">
          <router-link to="/admin/reservas" class="text-emerald-600 hover:text-emerald-800">
            Volver a reservas
          </router-link>
        </div>
      </div>
    </header>
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <form @submit.prevent="saveReservation" class="space-y-6 p-6">
          <!-- Información del cliente -->
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Información del cliente</h3>
            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
                <div class="mt-1">
                  <input 
                    type="text" 
                    id="name" 
                    v-model="form.name" 
                    required
                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div class="sm:col-span-3">
                <label for="surname" class="block text-sm font-medium text-gray-700">Apellido</label>
                <div class="mt-1">
                  <input 
                    type="text" 
                    id="surname" 
                    v-model="form.surname" 
                    required
                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div class="sm:col-span-3">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <div class="mt-1">
                  <input 
                    type="email" 
                    id="email" 
                    v-model="form.email" 
                    required
                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div class="sm:col-span-3">
                <label for="phone" class="block text-sm font-medium text-gray-700">Teléfono</label>
                <div class="mt-1">
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="form.phone" 
                    required
                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div class="sm:col-span-3">
                <label for="language" class="block text-sm font-medium text-gray-700">Idioma</label>
                <div class="mt-1">
                  <select 
                    id="language" 
                    v-model="form.language" 
                    required
                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="es">Español</option>
                    <option value="en">Inglés</option>
                  </select>
                </div>
              </div>
              
              <div class="sm:col-span-3">
                <label for="people_count" class="block text-sm font-medium text-gray-700">Número de personas</label>
                <div class="mt-1">
                  <input 
                    type="number" 
                    id="people_count" 
                    v-model="form.people_count" 
                    min="1"
                    required
                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div class="sm:col-span-6">
                <label for="allergies" class="block text-sm font-medium text-gray-700">Alergias</label>
                <div class="mt-1">
                  <textarea 
                    id="allergies" 
                    v-model="form.allergies" 
                    rows="3"
                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Información de la reserva -->
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Información de la reserva</h3>
            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label for="date" class="block text-sm font-medium text-gray-700">Fecha</label>
                <div class="mt-1">
                  <input 
                    type="date" 
                    id="date" 
                    v-model="form.date" 
                    required
                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div class="sm:col-span-3">
                <label for="time" class="block text-sm font-medium text-gray-700">Hora</label>
                <div class="mt-1">
                  <select 
                    id="time" 
                    v-model="form.time" 
                    required
                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="10:00:00">10:00</option>
                    <option value="10:15:00">10:15</option>
                    <option value="10:30:00">10:30</option>
                    <option value="10:45:00">10:45</option>
                    <option value="11:00:00">11:00</option>
                    <option value="11:15:00">11:15</option>
                    <option value="11:30:00">11:30</option>
                    <option value="11:45:00">11:45</option>
                    <option value="12:00:00">12:00</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Brunchs -->
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Brunchs</h3>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                <div>
                  <h4 class="font-medium text-gray-900">Metropolitan</h4>
                  <p class="text-sm text-gray-500">25,00 €</p>
                </div>
                <div class="w-24">
                  <input 
                    type="number" 
                    v-model="form.brunches.metropolitan" 
                    min="0"
                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div class="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                <div>
                  <h4 class="font-medium text-gray-900">Deluxe</h4>
                  <p class="text-sm text-gray-500">25,00 €</p>
                </div>
                <div class="w-24">
                  <input 
                    type="number" 
                    v-model="form.brunches.deluxe" 
                    min="0"
                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div class="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                <div>
                  <h4 class="font-medium text-gray-900">New York</h4>
                  <p class="text-sm text-gray-500">25,00 €</p>
                </div>
                <div class="w-24">
                  <input 
                    type="number" 
                    v-model="form.brunches.newYork" 
                    min="0"
                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            
            <div class="mt-4 p-4 bg-gray-50 rounded-md">
              <div class="flex justify-between">
                <span class="font-medium">Total brunchs:</span>
                <span>{{ totalBrunchs }}</span>
              </div>
              <div class="flex justify-between mt-2">
                <span class="font-medium">Total:</span>
                <span>{{ totalAmount }} €</span>
              </div>
              <div class="flex justify-between mt-2">
                <span class="font-medium">Depósito (24%):</span>
                <span>{{ depositAmount }} €</span>
              </div>
            </div>
          </div>
          
          <!-- Información de pago -->
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Información de pago</h3>
            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label for="payment_method" class="block text-sm font-medium text-gray-700">Método de pago</label>
                <div class="mt-1">
                  <select 
                    id="payment_method" 
                    v-model="form.payment_method" 
                    required
                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="Tarjeta">Tarjeta</option>
                    <option value="Efectivo">Efectivo</option>
                  </select>
                </div>
              </div>
              
              <div class="sm:col-span-3">
                <label for="payment_status" class="block text-sm font-medium text-gray-700">Estado del pago</label>
                <div class="mt-1">
                  <select 
                    id="payment_status" 
                    v-model="form.payment_status" 
                    required
                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="succeeded">Pagado</option>
                    <option value="pending">Pendiente</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3">
            <router-link 
              to="/admin/reservas" 
              class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Cancelar
            </router-link>
            <button 
              type="submit" 
              class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              :disabled="saving"
            >
              {{ saving ? 'Guardando...' : 'Guardar' }}
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createReservation, isAuthenticated } from '@/services/api'

export default {
  setup() {
    const router = useRouter()
    const saving = ref(false)
    
    // Formulario
    const form = ref({
      name: '',
      surname: '',
      email: '',
      phone: '',
      language: 'es',
      people_count: 1,
      date: new Date().toISOString().split('T')[0],
      time: '10:00:00',
      brunches: {
        metropolitan: 0,
        deluxe: 0,
        newYork: 0
      },
      allergies: '',
      payment_method: 'Tarjeta',
      payment_status: 'succeeded'
    })
    
    // Calcular totales
    const totalBrunchs = computed(() => {
      return parseInt(form.value.brunches.metropolitan) + 
             parseInt(form.value.brunches.deluxe) + 
             parseInt(form.value.brunches.newYork)
    })
    
    const totalAmount = computed(() => {
      return totalBrunchs.value * 25
    })
    
    const depositAmount = computed(() => {
      return Math.round(totalAmount.value * 0.24 * 100) / 100
    })
    
    // Guardar reserva
    const saveReservation = async () => {
      if (totalBrunchs.value === 0) {
        alert('Debe seleccionar al menos un brunch')
        return
      }
      
      saving.value = true
      
      try {
        // Preparar datos para enviar
        const brunchesData = {}
        
        if (parseInt(form.value.brunches.metropolitan) > 0) {
          brunchesData['1'] = {
            title: 'Metropolitan',
            quantity: parseInt(form.value.brunches.metropolitan),
            price: '25,00 €'
          }
        }
        
        if (parseInt(form.value.brunches.deluxe) > 0) {
          brunchesData['2'] = {
            title: 'Deluxe',
            quantity: parseInt(form.value.brunches.deluxe),
            price: '25,00 €'
          }
        }
        
        if (parseInt(form.value.brunches.newYork) > 0) {
          brunchesData['3'] = {
            title: 'New York',
            quantity: parseInt(form.value.brunches.newYork),
            price: '25,00 €'
          }
        }
        
        // Generar resumen de brunchs
        const brunchSummary = []
        if (parseInt(form.value.brunches.metropolitan) > 0) {
          brunchSummary.push(`Metropolitan (${form.value.brunches.metropolitan})`)
        }
        if (parseInt(form.value.brunches.deluxe) > 0) {
          brunchSummary.push(`Deluxe (${form.value.brunches.deluxe})`)
        }
        if (parseInt(form.value.brunches.newYork) > 0) {
          brunchSummary.push(`New York (${form.value.brunches.newYork})`)
        }
        
        const reservationData = {
          name: form.value.name,
          surname: form.value.surname,
          email: form.value.email,
          phone: form.value.phone,
          language: form.value.language,
          people_count: parseInt(form.value.people_count),
          date: form.value.date,
          time: form.value.time,
          brunch_summary: brunchSummary.join(', '),
          brunches: JSON.stringify(brunchesData),
          total_brunchs: totalBrunchs.value,
          payment_method: form.value.payment_method,
          payment_status: form.value.payment_status,
          payment_type: form.value.payment_method,
          total_amount: totalAmount.value * 100,
          total_amount_formatted: `${totalAmount.value.toFixed(2)} €`,
          deposit_amount: depositAmount.value * 100,
          deposit_amount_formatted: `${depositAmount.value.toFixed(2)} €`,
          allergies: form.value.allergies
        }
        
        // Crear nueva reserva
        await createReservation(reservationData)
        
        // Redirigir a la lista de reservas
        router.push('/admin/reservas')
      } catch (err) {
        alert('Error al guardar la reserva')
        console.error(err)
      } finally {
        saving.value = false
      }
    }
    
    // Verificar autenticación al montar el componente
    onMounted(() => {
      if (!isAuthenticated()) {
        router.push('/')
        return
      }
    })
    
    return {
      form,
      saving,
      totalBrunchs,
      totalAmount,
      depositAmount,
      saveReservation
    }
  }
}
</script>