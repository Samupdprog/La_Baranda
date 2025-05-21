<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-emerald-800 text-white shadow-md">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-bold">Brunch Dashboard</h1>
          <span class="text-sm">
            {{ new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}
          </span>
        </div>
        <div class="flex items-center gap-4">
          <button 
            class="bg-white text-emerald-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
            @click="navigateToReservations"
          >
            Ver Reservas
          </button>

        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-6">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <!-- Total Reservations -->
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500">Total Reservas</p>
              <p class="text-2xl font-bold">{{ totalReservations }}</p>
              <p class="text-xs text-gray-500">Pro. Grupo: {{ avgGroupSize }}</p>
            </div>
            <div class="bg-blue-100 p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Total People -->
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500">Total Personas</p>
              <p class="text-2xl font-bold">{{ totalPeople }}</p>
              <p class="text-xs text-gray-500">Pro. Grupo: {{ avgGroupSize }}</p>
            </div>
            <div class="bg-purple-100 p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Total Revenue -->
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500">Total Ingresos</p>
              <p class="text-2xl font-bold">{{ formatCurrency(totalRevenue) }}</p>
              <p class="text-xs text-gray-500">Pro. por Persona: {{ formatCurrency(avgRevenuePerPerson) }}</p>
            </div>
            <div class="bg-green-100 p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Lead Time -->
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500">Pro. Tiempo de entreg</p>
              <p class="text-2xl font-bold">{{ avgLeadTime }} días</p>
              <p class="text-xs text-gray-500">Tasa de éxito del pago: {{ paymentSuccessRate }}%</p>
            </div>
            <div class="bg-amber-100 p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts and Data Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Reservations by Date -->
          <div class="bg-white rounded-lg shadow p-4">
            <h2 class="text-lg font-medium mb-4">Reservas por Fecha</h2>
            <div class="h-64">
              <canvas ref="reservationsByDateChart"></canvas>
            </div>
          </div>

          <!-- Today's and Upcoming Reservations -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow p-4">
              <h2 class="text-lg font-medium mb-4">Reservas de Hoy</h2>
              <div v-if="todayReservations.length === 0" class="text-center py-8 text-gray-500">
                No hay Reservas para hoy
              </div>
              <div v-else class="space-y-3">
                <div v-for="reservation in todayReservations" :key="reservation.id" class="border-b pb-3 last:border-0">
                  <div class="flex justify-between">
                    <div>
                      <p class="font-medium">{{ reservation.name }} {{ reservation.surname }}</p>
                      <p class="text-sm text-gray-500">{{ reservation.people_count }} personas • {{ formatTime(reservation.time) }}</p>
                    </div>
                    <div class="flex items-center">
                      <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(reservation.payment_status)">
                        {{ reservation.payment_status === 'succeeded' ? 'Pagado' : 'Pendiente' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow p-4">
              <h2 class="text-lg font-medium mb-4">Próximas Reservas</h2>
              <div v-if="upcomingReservations.length === 0" class="text-center py-8 text-gray-500">
                No hay próximas Reservas
              </div>
              <div v-else class="space-y-3">
                <div v-for="reservation in upcomingReservations" :key="reservation.id" class="border-b pb-3 last:border-0">
                  <div class="flex justify-between">
                    <div>
                      <p class="font-medium">{{ reservation.name }} {{ reservation.surname }}</p>
                      <p class="text-sm text-gray-500">
                        {{ formatDate(reservation.date) }} • {{ reservation.people_count }} personas • {{ formatTime(reservation.time) }}
                      </p>
                      <p class="text-xs text-gray-500">{{ reservation.brunch_summary }}</p>
                    </div>
                    <div class="flex items-center">
                      <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(reservation.payment_status)">
                        {{ reservation.payment_status === 'succeeded' ? 'Pagado' : 'Pendiente' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4 text-center">
                <a href="./reservas">
                    <button class="text-sm text-emerald-600 hover:text-emerald-800">
                    Ver todas las Reservas
                    </button>
                </a>
              </div>
            </div>
          </div>

          <!-- Time Slot Distribution and Financial Metrics -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow p-4">
              <h2 class="text-lg font-medium mb-4">Distribución por Hora</h2>
              <div class="h-48">
                <canvas ref="timeSlotChart"></canvas>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow p-4">
              <h2 class="text-lg font-medium mb-4">Métricas Financieras</h2>
              <div class="space-y-4">
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-sm">Ingreso Medio por Reserva</span>
                    <span class="font-medium">{{ formatCurrency(avgRevenuePerReservation) }}</span>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-sm">Depósito Medio</span>
                    <span class="font-medium">{{ formatCurrency(avgDeposit) }}</span>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-sm">Ratio Depósito/Total</span>
                    <span class="font-medium">{{ depositRatio }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-emerald-600 h-2 rounded-full" :style="`width: ${depositRatio}%`"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Payment Methods -->
          <div class="bg-white rounded-lg shadow p-4">
            <h2 class="text-lg font-medium mb-4">Métodos de Pago</h2>
            <div class="h-48">
              <canvas ref="paymentMethodsChart"></canvas>
            </div>
          </div>

          <!-- Brunch Types -->
          <div class="bg-white rounded-lg shadow p-4">
            <h2 class="text-lg font-medium mb-4">Tipos de Brunch</h2>
            <div class="space-y-4">
              <div v-for="(count, type) in brunchCounts" :key="type" class="border-b pb-3 last:border-0">
                <div class="flex justify-between mb-1">
                  <span class="font-medium">{{ type }}</span>
                  <span>{{ count }} unidades</span>
                </div>
                <div class="flex justify-between text-sm text-gray-500">
                  <span>Ingresos</span>
                  <span>{{ formatCurrency(brunchRevenue[type] || 0) }}</span>
                </div>
              </div>
              <div class="pt-2">
                <h3 class="font-medium mb-2">Brunch Más Popular</h3>
                <div class="flex items-center gap-2 bg-emerald-50 p-2 rounded-md">
                  <div class="bg-emerald-100 p-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium">{{ mostPopularBrunch.name }}</p>
                    <p class="text-xs text-gray-500">{{ mostPopularBrunch.count }} unidades vendidas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Lead Time Metrics -->
          <div class="bg-white rounded-lg shadow p-4">
            <h2 class="text-lg font-medium mb-4">Tiempo de entrega</h2>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span>Reservas de última hora</span>
                <span class="font-medium">{{ lastMinuteReservations }} ({{ lastMinutePercentage }}%)</span>
              </div>
              <div class="flex justify-between">
                <span>Reservas anticipadas</span>
                <span class="font-medium">{{ advanceReservations }} ({{ advancePercentage }}%)</span>
              </div>
              <div class="mt-4">
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full" :style="`width: ${lastMinutePercentage}%`"></div>
                </div>
                <div class="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Última hora (0-2 días)</span>
                  <span>Anticipadas (3+ días)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getReservations } from '@/services/api'
import Chart from 'chart.js/auto'

export default {
  setup() {
    const router = useRouter()
    const reservations = ref([])
    const loading = ref(true)
    const error = ref(null)

    // Chart refs
    const reservationsByDateChart = ref(null)
    const paymentMethodsChart = ref(null)
    const timeSlotChart = ref(null)

    // Fetch reservations
    const fetchReservations = async () => {
      try {
        loading.value = true
        const data = await getReservations()
        reservations.value = data
        loading.value = false
      } catch (err) {
        error.value = err.message
        loading.value = false
      }
    }

    // Format currency
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
      }).format(amount / 100)
    }

    // Format date
    const formatDate = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short'
      })
    }

    // Format time
    const formatTime = (timeString) => {
      if (!timeString) return ''
      
      // If it's already a string in HH:MM:SS format, extract only HH:MM
      if (typeof timeString === 'string' && timeString.includes(':')) {
        const parts = timeString.split(':')
        return `${parts[0]}:${parts[1]}`
      }
      
      return timeString
    }

    // Get status class
    const getStatusClass = (status) => {
      return status === 'succeeded' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-yellow-100 text-yellow-800'
    }

    // Navigate to reservations page
    const navigateToReservations = () => {
      router.push('reservas')
    }

    // Computed properties for metrics
    const totalReservations = computed(() => reservations.value.length)
    
    const totalPeople = computed(() => {
      return reservations.value.reduce((sum, reservation) => {
        return sum + (reservation.people_count || 0)
      }, 0)
    })
    
    const avgGroupSize = computed(() => {
      if (totalReservations.value === 0) return '0'
      return (totalPeople.value / totalReservations.value).toFixed(1)
    })
    
    const totalRevenue = computed(() => {
      return reservations.value.reduce((sum, reservation) => {
        return sum + (reservation.total_amount || 0)
      }, 0)
    })
    
    const avgRevenuePerReservation = computed(() => {
      if (totalReservations.value === 0) return 0
      return totalRevenue.value / totalReservations.value
    })
    
    const avgRevenuePerPerson = computed(() => {
      if (totalPeople.value === 0) return 0
      return totalRevenue.value / totalPeople.value
    })
    
    const totalDeposit = computed(() => {
      return reservations.value.reduce((sum, reservation) => {
        return sum + (reservation.deposit_amount || 0)
      }, 0)
    })
    
    const avgDeposit = computed(() => {
      if (totalReservations.value === 0) return 0
      return totalDeposit.value / totalReservations.value
    })
    
    const depositRatio = computed(() => {
      if (totalRevenue.value === 0) return 0
      return Math.round((totalDeposit.value / totalRevenue.value) * 100)
    })
    
    const paymentMethods = computed(() => {
      const methods = {
        Tarjeta: 0,
        Efectivo: 0
      }
      
      reservations.value.forEach(reservation => {
        if (reservation.payment_method === 'Tarjeta') {
          methods.Tarjeta++
        } else if (reservation.payment_method === 'Efectivo') {
          methods.Efectivo++
        }
      })
      
      return methods
    })
    
    const paymentSuccessRate = computed(() => {
      const succeeded = reservations.value.filter(r => r.payment_status === 'succeeded').length
      if (totalReservations.value === 0) return 0
      return Math.round((succeeded / totalReservations.value) * 100)
    })
    
    // Lead time metrics
    const avgLeadTime = computed(() => {
      let totalDays = 0
      let count = 0
      
      reservations.value.forEach(reservation => {
        if (reservation.reservation_date && reservation.date) {
          const reservationDate = new Date(reservation.reservation_date)
          const serviceDate = new Date(reservation.date)
          const diffTime = Math.abs(serviceDate - reservationDate)
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          
          totalDays += diffDays
          count++
        }
      })
      
      if (count === 0) return 0
      return (totalDays / count).toFixed(1)
    })
    
    const lastMinuteReservations = computed(() => {
      return reservations.value.filter(reservation => {
        if (reservation.reservation_date && reservation.date) {
          const reservationDate = new Date(reservation.reservation_date)
          const serviceDate = new Date(reservation.date)
          const diffTime = Math.abs(serviceDate - reservationDate)
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          
          return diffDays <= 2
        }
        return false
      }).length
    })
    
    const advanceReservations = computed(() => {
      return reservations.value.filter(reservation => {
        if (reservation.reservation_date && reservation.date) {
          const reservationDate = new Date(reservation.reservation_date)
          const serviceDate = new Date(reservation.date)
          const diffTime = Math.abs(serviceDate - reservationDate)
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          
          return diffDays > 2
        }
        return false
      }).length
    })
    
    const lastMinutePercentage = computed(() => {
      if (totalReservations.value === 0) return 0
      return Math.round((lastMinuteReservations.value / totalReservations.value) * 100)
    })
    
    const advancePercentage = computed(() => {
      if (totalReservations.value === 0) return 0
      return Math.round((advanceReservations.value / totalReservations.value) * 100)
    })
    
    // Time slot distribution
    const timeSlotDistribution = computed(() => {
      const before1030 = reservations.value.filter(r => {
        const time = r.time
        if (!time) return false
        
        const [hours, minutes] = time.split(':').map(Number)
        return hours < 11 || (hours === 11 && minutes <= 30)
      }).length
      
      const after1030 = totalReservations.value - before1030
      
      return {
        'Antes de 11:30': before1030,
        'Después de 11:30': after1030
      }
    })
    
    // Brunch metrics
    const brunchCounts = computed(() => {
      const counts = {
        'Metropolitan': 0,
        'Deluxe': 0,
        'New York': 0
      }
      
      reservations.value.forEach(reservation => {
        if (!reservation.brunches) return
        
        try {
          let brunches
          
          if (typeof reservation.brunches === 'object') {
            brunches = reservation.brunches
          } else if (typeof reservation.brunches === 'string') {
            brunches = JSON.parse(reservation.brunches)
          } else {
            return
          }
          
          Object.values(brunches).forEach(brunch => {
            if (!brunch || !brunch.title || !brunch.quantity) return
            
            const title = brunch.title
            const quantity = parseInt(brunch.quantity) || 0
            
            if (counts[title] !== undefined) {
              counts[title] += quantity
            }
          })
        } catch (e) {
          console.error('Error parsing brunches', e)
        }
      })
      
      return counts
    })
    
    const brunchRevenue = computed(() => {
      const revenue = {
        'Metropolitan': 0,
        'Deluxe': 0,
        'New York': 0
      }
      
      reservations.value.forEach(reservation => {
        if (!reservation.brunches) return
        
        try {
          let brunches
          
          if (typeof reservation.brunches === 'object') {
            brunches = reservation.brunches
          } else if (typeof reservation.brunches === 'string') {
            brunches = JSON.parse(reservation.brunches)
          } else {
            return
          }
          
          Object.values(brunches).forEach(brunch => {
            if (!brunch || !brunch.title || !brunch.quantity || !brunch.price) return
            
            const title = brunch.title
            const quantity = parseInt(brunch.quantity) || 0
            let price = 0
            
            // Extract price from string like "25,00 €"
            if (typeof brunch.price === 'string') {
              const priceMatch = brunch.price.match(/(\d+),(\d+)/)
              if (priceMatch) {
                price = parseInt(priceMatch[1]) * 100 + parseInt(priceMatch[2])
              }
            } else if (typeof brunch.price === 'number') {
              price = brunch.price * 100
            }
            
            if (revenue[title] !== undefined) {
              revenue[title] += quantity * price
            }
          })
        } catch (e) {
          console.error('Error calculating brunch revenue', e)
        }
      })
      
      return revenue
    })
    
    const mostPopularBrunch = computed(() => {
      const counts = brunchCounts.value
      let maxCount = 0
      let maxBrunch = ''
      
      Object.entries(counts).forEach(([brunch, count]) => {
        if (count > maxCount) {
          maxCount = count
          maxBrunch = brunch
        }
      })
      
      return {
        name: maxBrunch,
        count: maxCount
      }
    })
    
    // Today's and upcoming reservations
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const todayReservations = computed(() => {
      return reservations.value.filter(reservation => {
        if (!reservation.date) return false
        
        const reservationDate = new Date(reservation.date)
        reservationDate.setHours(0, 0, 0, 0)
        
        return reservationDate.getTime() === today.getTime()
      }).slice(0, 3) // Limit to 3 for display
    })
    
    const upcomingReservations = computed(() => {
      return reservations.value.filter(reservation => {
        if (!reservation.date) return false
        
        const reservationDate = new Date(reservation.date)
        reservationDate.setHours(0, 0, 0, 0)
        
        return reservationDate.getTime() > today.getTime()
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3) // Limit to 3 for display
    })
    
    // Reservations by date
    const reservationsByDate = computed(() => {
      const dateMap = {}
      
      reservations.value.forEach(reservation => {
        if (!reservation.date) return
        
        const date = new Date(reservation.date)
        const dateString = date.toISOString().split('T')[0]
        
        if (!dateMap[dateString]) {
          dateMap[dateString] = 0
        }
        
        dateMap[dateString]++
      })
      
      // Sort by date
      const sortedDates = Object.keys(dateMap).sort()
      
      return {
        labels: sortedDates.map(date => {
          const d = new Date(date)
          return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
        }),
        data: sortedDates.map(date => dateMap[date])
      }
    })

    // Initialize charts
    const initCharts = () => {
      // Reservations by date chart
      if (reservationsByDateChart.value) {
        new Chart(reservationsByDateChart.value, {
          type: 'bar',
          data: {
            labels: reservationsByDate.value.labels,
            datasets: [{
              label: 'Reservas',
              data: reservationsByDate.value.data,
              backgroundColor: '#4f46e5',
              borderRadius: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  precision: 0
                }
              }
            }
          }
        })
      }
      
      // Payment methods chart
      if (paymentMethodsChart.value) {
        new Chart(paymentMethodsChart.value, {
          type: 'doughnut',
          data: {
            labels: Object.keys(paymentMethods.value),
            datasets: [{
              data: Object.values(paymentMethods.value),
              backgroundColor: ['#3b82f6', '#10b981']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              }
            },
            cutout: '70%'
          }
        })
      }
      
      // Time slot distribution chart
      if (timeSlotChart.value) {
        new Chart(timeSlotChart.value, {
          type: 'pie',
          data: {
            labels: Object.keys(timeSlotDistribution.value),
            datasets: [{
              data: Object.values(timeSlotDistribution.value),
              backgroundColor: ['#3b82f6', '#10b981']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }
        })
      }
    }

    onMounted(async () => {
      await fetchReservations()
      initCharts()
    })

    return {
      reservations,
      loading,
      error,
      reservationsByDateChart,
      paymentMethodsChart,
      timeSlotChart,
      formatCurrency,
      formatDate,
      formatTime,
      getStatusClass,
      navigateToReservations,
      totalReservations,
      totalPeople,
      avgGroupSize,
      totalRevenue,
      avgRevenuePerReservation,
      avgRevenuePerPerson,
      avgDeposit,
      depositRatio,
      paymentSuccessRate,
      avgLeadTime,
      lastMinuteReservations,
      advanceReservations,
      lastMinutePercentage,
      advancePercentage,
      brunchCounts,
      brunchRevenue,
      mostPopularBrunch,
      todayReservations,
      upcomingReservations
    }
  }
}
</script>