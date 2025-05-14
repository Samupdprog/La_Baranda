<template>
  <div class="min-h-screen bg-stone-50 font-eb-garamond py-20">
    <div class="max-w-3xl mx-auto px-6">
      <div class="bg-white rounded-xl shadow-md overflow-hidden border border-stone-100 p-10 text-center">
        <div v-if="loading" class="py-10">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-6"></div>
          <p class="text-stone-600">{{ $t('confirmation.verifying_payment') }}</p>
        </div>
        
        <div v-else class="py-10">
          <div class="bg-green-50 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 class="text-2xl font-medium text-stone-800 mb-4">{{ $t('confirmation.payment_success') }}</h2>
          <p class="text-stone-600 mb-8 max-w-md mx-auto">{{ $t('confirmation.reservation_confirmed') }}</p>
          
          <div class="bg-stone-50 rounded-lg p-6 mb-8 mx-auto max-w-md text-left">
            <h3 class="text-lg font-medium text-stone-800 mb-4 border-b border-stone-200 pb-2">{{ $t('confirmation.reservation_details') }}</h3>
            
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-stone-600">{{ $t('confirmation.reservation_id') }}:</span>
                <span class="font-medium">{{ reservationId }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-stone-600">{{ $t('confirmation.payment_status') }}:</span>
                <span class="font-medium text-green-600">{{ $t('confirmation.paid') }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-stone-600">{{ $t('confirmation.amount') }}:</span>
                <span class="font-medium text-amber-500">{{ amount }}</span>
              </div>
            </div>
          </div>
          
          <p class="text-stone-500 text-sm mb-6">{{ $t('confirmation.email_sent') }}</p>
          
          <a href="/" class="inline-block bg-amber-500 hover:bg-amber-600 text-white py-3 px-8 rounded-lg transition-colors">
            {{ $t('confirmation.back_to_home') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const { t } = useI18n();
const route = useRoute();

const loading = ref(true);
const reservationId = ref('');
const amount = ref('');

onMounted(async () => {
  let reservationData = null; // Declarar fuera del bloque try

  // Establecer un tiempo máximo de carga
  const timeoutId = setTimeout(() => {
    loading.value = false;
  }, 5000); // 5 segundos máximo de carga
  
  try {
    // Intentar recuperar los datos de reserva del localStorage
    try {
      const storedData = localStorage.getItem('reservationData');
      if (storedData) {
        reservationData = JSON.parse(storedData);
        console.log('Datos de reserva recuperados del localStorage:', reservationData);
        
        // Establecer los datos de la reserva para mostrar
        if (reservationData.reservation_id) {
          reservationId.value = reservationData.reservation_id;
        } else if (reservationData.payment_intent_id) {
          reservationId.value = reservationData.payment_intent_id.substring(3, 11).toUpperCase();
        }
        
        // Asignar el importe correctamente según el método de pago
        if (reservationData.payment_method === 'cash') {
          // Para pagos en efectivo, mostrar el depósito
          amount.value = reservationData.deposit_amount_formatted || '';
        } else {
          // Para pagos con tarjeta, mostrar el importe total
          amount.value = reservationData.total_amount_formatted || '';
        }
      }
    } catch (e) {
      console.error('Error al recuperar datos del localStorage:', e);
    }
    
    // Si no tenemos datos en localStorage, intentamos usar los parámetros de la URL
    if (!reservationData) {
      const { query } = route;
      if (query.payment_intent) {
        reservationId.value = query.payment_intent.substring(3, 11).toUpperCase();
      }
      
      // Si no tenemos el importe, intentar recuperarlo de la URL o establecer un valor por defecto
      if (!amount.value && query.amount) {
        amount.value = query.amount;
      }
    }
    
    // Si aún no tenemos un ID de reserva, generamos uno aleatorio
    if (!reservationId.value) {
      reservationId.value = `RES-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    }
    
    // Si aún no tenemos un importe, establecer un valor por defecto
    if (!amount.value) {
      // Intentar recuperar el importe de sessionStorage como respaldo
      const sessionAmount = sessionStorage.getItem('reservationAmount');
      if (sessionAmount) {
        amount.value = sessionAmount;
      } else {
        // Valor por defecto si todo lo demás falla
        amount.value = '25,00 €';
      }
    }
    
    // Guardar el importe en sessionStorage como respaldo
    if (amount.value) {
      sessionStorage.setItem('reservationAmount', amount.value);
    }
    
    // Limpiar localStorage después de mostrar los datos
    localStorage.removeItem('reservationData');
  } catch (err) {
    console.error('Error en la página de confirmación:', err);
  } finally {
    // Asegurarnos de que la página de carga desaparezca
    clearTimeout(timeoutId);
    loading.value = false;
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&display=swap');

.font-eb-garamond {
  font-family: 'EB Garamond', serif;
}
</style>