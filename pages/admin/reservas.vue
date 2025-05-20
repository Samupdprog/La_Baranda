<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-emerald-800 text-white shadow-md">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="../admin/dashboard">
          <h1 class="text-2xl font-bold">La Baranda</h1>
        </a>
        <div class="flex items-center gap-4">
          <span class="text-sm">
            Hoy: {{ new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) }}
          </span>
          <button 
            class="bg-white text-emerald-800 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
            @click="navigateToCreateReservation"
          >
            Crear reserva
          </button>
        </div>
      </div>
    </header>

    <!-- Debug Info -->
    <div class="container mx-auto px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md mt-4">
      <p>Total reservas: {{ reservations.length }}</p>
      <p>Fecha seleccionada: {{ formattedDate }}</p>
    </div>

    <!-- Stats Cards -->
    <div class="container mx-auto px-4 py-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white rounded-lg shadow p-4 flex items-center gap-4">
          <div class="bg-emerald-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p class="text-sm text-gray-500">Reservas</p>
            <p class="text-2xl font-bold">{{ reservations.length }}</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4 flex items-center gap-4">
          <div class="bg-blue-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <p class="text-sm text-gray-500">Comensales</p>
            <p class="text-2xl font-bold">{{ totalPeople }}</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4 flex items-center gap-4">
          <div class="bg-amber-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p class="text-sm text-gray-500">Total brunchs</p>
            <p class="text-2xl font-bold">{{ totalBrunchs }}</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4 flex items-center gap-4">
          <div class="bg-green-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-sm text-gray-500">Ventas</p>
            <p class="text-2xl font-bold">{{ totalSales }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Date Navigation and Search -->
    <div class="container mx-auto px-4 pb-6">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-2">
            <button class="p-1.5 rounded border hover:bg-gray-50" @click="navigateDay(-1)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div class="flex items-center gap-2 px-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ formattedDate }}</span>
            </div>

            <button class="p-1.5 rounded border hover:bg-gray-50" @click="navigateDay(1)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div class="flex w-full md:w-auto gap-2">
            <div class="relative w-full md:w-64">
              <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="search" 
                placeholder="Buscar reserva..." 
                class="w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                v-model="searchQuery"
              />
            </div>
            <button class="p-2 border rounded-md hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Filter Tags -->
        <div class="flex flex-wrap gap-2 mt-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Metropolitan: {{ brunchCounts.metropolitan }}
          </span>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Deluxe: {{ brunchCounts.deluxe }}
          </span>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            New York: {{ brunchCounts.newYork }}
          </span>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Tarjeta: {{ paymentCounts.tarjeta }}
          </span>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Efectivo: {{ paymentCounts.efectivo }}
          </span>
        </div>
      </div>
    </div>

    <!-- Reservations Table -->
    <div class="container mx-auto px-4 pb-6">
      <div class="bg-white rounded-lg shadow">
        <div class="p-4 border-b">
          <h2 class="text-lg font-medium">Reservas para {{ formattedDate }}</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 text-xs uppercase">
                <th class="px-4 py-3 text-left">ID</th>
                <th class="px-4 py-3 text-left">Cliente</th>
                <th class="px-4 py-3 text-left">Hora</th>
                <th class="px-4 py-3 text-left">Personas</th>
                <th class="px-4 py-3 text-left">Brunchs</th>
                <th class="px-4 py-3 text-left">Pago</th>
                <th class="px-4 py-3 text-left">Total</th>
                <th class="px-4 py-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="8" class="px-4 py-12 text-center">
                  <div class="flex flex-col items-center justify-center text-gray-500">
                    <svg class="animate-spin h-8 w-8 text-emerald-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p>Cargando reservas...</p>
                  </div>
                </td>
              </tr>
              <tr v-else-if="error">
                <td colspan="8" class="px-4 py-12 text-center">
                  <div class="flex flex-col items-center justify-center text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>{{ error }}</p>
                    <button 
                      @click="fetchReservationsByDate" 
                      class="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                    >
                      Reintentar
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-else-if="filteredReservations.length === 0">
                <td colspan="8" class="px-4 py-12 text-center">
                  <div class="flex flex-col items-center justify-center text-gray-500">
                    <div class="rounded-full bg-gray-100 p-3 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p>No hay reservas para esta fecha</p>
                  </div>
                </td>
              </tr>
              <tr v-else v-for="reservation in filteredReservations" :key="reservation.id" class="border-b hover:bg-gray-50">
                <td class="px-4 py-3 text-sm">{{ reservation.reservation_id }}</td>
                <td class="px-4 py-3 text-sm">{{ reservation.name }} {{ reservation.surname }}</td>
                <td class="px-4 py-3 text-sm">{{ formatTime(reservation.time) }}</td>
                <td class="px-4 py-3 text-sm">{{ reservation.people_count }}</td>
                <td class="px-4 py-3 text-sm">{{ reservation.brunch_summary }}</td>
                <td class="px-4 py-3 text-sm">{{ reservation.payment_method }}</td>
                <td class="px-4 py-3 text-sm">{{ reservation.total_amount_formatted }}</td>
                <td class="px-4 py-3 text-sm">
                  <div class="flex gap-2">
                    <button class="p-1 text-gray-500 hover:text-gray-700" @click="viewReservation(reservation.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button class="p-1 text-gray-500 hover:text-gray-700" @click="editReservation(reservation.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button class="p-1 text-red-500 hover:text-red-700" @click="confirmDelete(reservation)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="p-4 border-t flex items-center justify-between">
          <span class="text-sm text-gray-500">Mostrando {{ filteredReservations.length }} reservas</span>
          <div class="flex gap-1">
            <button 
              class="px-3 py-1 border rounded-md text-sm" 
              :disabled="currentPage === 1"
              @click="currentPage--"
              :class="{'opacity-50 cursor-not-allowed': currentPage === 1}"
            >
              Anterior
            </button>
            <button class="px-3 py-1 bg-emerald-800 text-white rounded-md text-sm">
              {{ currentPage }}
            </button>
            <button 
              class="px-3 py-1 border rounded-md text-sm"
              :disabled="currentPage >= totalPages"
              @click="currentPage++"
              :class="{'opacity-50 cursor-not-allowed': currentPage >= totalPages}"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getReservationsByDate, deleteReservation as apiDeleteReservation, isAuthenticated } from '@/services/api'

export default {
  setup() {
    const router = useRouter()
    const reservations = ref([])
    const loading = ref(true)
    const error = ref(null)
    const searchQuery = ref('')
    const currentDate = ref(new Date())
    const currentPage = ref(1)
    const itemsPerPage = 10

    // Redirigir si no está autenticado
    onMounted(() => {
      if (!isAuthenticated()) {
        router.push('/')
        return
      }
      
      fetchReservationsByDate()
    })

    // Formato de fecha para mostrar
    const formattedDate = computed(() => {
      return currentDate.value.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    })

    // Formatear hora
    const formatTime = (timeString) => {
      if (!timeString) return '';
      
      // Si ya es un string en formato HH:MM:SS, extraer solo HH:MM
      if (typeof timeString === 'string' && timeString.includes(':')) {
        const parts = timeString.split(':');
        return `${parts[0]}:${parts[1]}`;
      }
      
      return timeString;
    }

    // Navegar entre días
    const navigateDay = (direction) => {
      const newDate = new Date(currentDate.value)
      newDate.setDate(newDate.getDate() + direction)
      currentDate.value = newDate
      
      // Cargar las reservas para la nueva fecha
      fetchReservationsByDate()
    }

    // Navegar a crear reserva
    const navigateToCreateReservation = () => {
      router.push('/admin/reservas/create')
    }

    // Obtener reservas por fecha
    const fetchReservationsByDate = async () => {
      loading.value = true;
      error.value = null;
      
      try {
        // Usar la nueva función para obtener reservas por fecha
        const data = await getReservationsByDate(currentDate.value);
        
        // Log para depuración
        console.log(`Reservas cargadas para ${currentDate.value.toISOString().split('T')[0]}:`, data);
        
        // Asegurarse de que data es un array
        if (Array.isArray(data)) {
          reservations.value = data;
        } else {
          console.error('La API no devolvió un array:', data);
          error.value = 'La API devolvió un formato inesperado';
          reservations.value = [];
        }
      } catch (err) {
        error.value = `Error al cargar las reservas: ${err.message}`;
        console.error('Error completo:', err);
        reservations.value = [];
      } finally {
        loading.value = false;
      }
    };

    // Filtrar reservas por búsqueda
    const filteredReservations = computed(() => {
      if (!searchQuery.value) {
        // Paginación
        const start = (currentPage.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return reservations.value.slice(start, end);
      }
      
      const query = searchQuery.value.toLowerCase();
      
      return reservations.value.filter(reservation => {
        return (
          (reservation.name && reservation.name.toLowerCase().includes(query)) ||
          (reservation.surname && reservation.surname.toLowerCase().includes(query)) ||
          (reservation.email && reservation.email.toLowerCase().includes(query)) ||
          (reservation.phone && reservation.phone.includes(query)) ||
          (reservation.reservation_id && reservation.reservation_id.toLowerCase().includes(query))
        );
      });
    });

    // Total de páginas
    const totalPages = computed(() => {
      return Math.ceil(reservations.value.length / itemsPerPage);
    });

    // Estadísticas
    const todayReservations = computed(() => {
      return reservations.value;
    });

    const totalPeople = computed(() => {
      return todayReservations.value.reduce((sum, reservation) => {
        return sum + (reservation.people_count || 0);
      }, 0);
    });

    const totalBrunchs = computed(() => {
      return todayReservations.value.reduce((sum, reservation) => {
        return sum + (reservation.total_brunchs || 0);
      }, 0);
    });

    const totalSales = computed(() => {
      const amount = todayReservations.value.reduce((sum, reservation) => {
        return sum + (reservation.total_amount || 0);
      }, 0);
      
      // Formatear como euros (dividir por 100 si está en céntimos)
      return (amount / 100).toFixed(2) + ' €';
    });

    // Conteo de brunchs
    const brunchCounts = computed(() => {
      const counts = {
        metropolitan: 0,
        deluxe: 0,
        newYork: 0
      };
      
      todayReservations.value.forEach(reservation => {
        if (!reservation || !reservation.brunches) {
          return;
        }
        
        try {
          let brunches;
          
          // Si brunches ya es un objeto, usarlo directamente
          if (typeof reservation.brunches === 'object' && !Array.isArray(reservation.brunches)) {
            brunches = reservation.brunches;
          } 
          // Si es un string, intentar parsearlo como JSON
          else if (typeof reservation.brunches === 'string') {
            brunches = JSON.parse(reservation.brunches);
          } else {
            return;
          }
          
          // Procesar los brunches
          Object.values(brunches).forEach(brunch => {
            if (!brunch || !brunch.title || !brunch.quantity) {
              return;
            }
            
            if (brunch.title === 'Metropolitan') {
              counts.metropolitan += parseInt(brunch.quantity) || 0;
            } else if (brunch.title === 'Deluxe') {
              counts.deluxe += parseInt(brunch.quantity) || 0;
            } else if (brunch.title === 'New York') {
              counts.newYork += parseInt(brunch.quantity) || 0;
            }
          });
        } catch (e) {
          console.error('Error al parsear brunches', e, reservation.brunches);
        }
      });
      
      return counts;
    });

    // Conteo de métodos de pago
    const paymentCounts = computed(() => {
      const counts = {
        tarjeta: 0,
        efectivo: 0
      };
      
      todayReservations.value.forEach(reservation => {
        if (reservation.payment_method === 'Tarjeta') {
          counts.tarjeta++;
        } else if (reservation.payment_method === 'Efectivo') {
          counts.efectivo++;
        }
      });
      
      return counts;
    });

    // Ver reserva
    const viewReservation = (id) => {
      router.push(`/admin/reservas/view/${id}`);
    };

    // Editar reserva
    const editReservation = (id) => {
      router.push(`/admin/reservas/edit/${id}`);
    };

    // Confirmar eliminación
    const confirmDelete = async (reservation) => {
      if (confirm(`¿Estás seguro de que deseas eliminar la reserva de ${reservation.name} ${reservation.surname}?`)) {
        try {
          await apiDeleteReservation(reservation.id);
          // Recargar las reservas después de eliminar
          await fetchReservationsByDate();
        } catch (err) {
          error.value = `Error al eliminar la reserva: ${err.message}`;
        }
      }
    };

    // Observar cambios en la fecha para recargar reservas
    watch(currentDate, () => {
      currentPage.value = 1; // Resetear a la primera página
      // No es necesario llamar a fetchReservationsByDate aquí porque ya se llama en navigateDay
    });

    // Observar cambios en la búsqueda para resetear paginación
    watch(searchQuery, () => {
      currentPage.value = 1;
    });

    return {
      reservations,
      loading,
      error,
      searchQuery,
      currentDate,
      currentPage,
      itemsPerPage,
      formattedDate,
      formatTime,
      navigateDay,
      navigateToCreateReservation,
      fetchReservationsByDate,
      filteredReservations,
      totalPages,
      todayReservations,
      totalPeople,
      totalBrunchs,
      totalSales,
      brunchCounts,
      paymentCounts,
      viewReservation,
      editReservation,
      confirmDelete
    }
  }
}
</script>

<style>
/* Estilos adicionales si son necesarios */
</style>
