<template>
  <div>
    <!-- Contenedor siempre presente para el Payment Element -->
    <div id="payment-element"></div>

    <!-- Indicador de carga si aún no hay clientSecret -->
    <div v-if="!clientSecret" class="mt-2 text-gray-500">
      {{ $t('reservation.loading_payment') }}
    </div>

    <!-- Botón y errores solo una vez preparado -->
    <div v-else class="mt-10 text-center">
      <button 
        @click.prevent="handleSubmit"
        :disabled="isLoading || !isReady"
        class="bg-amber-500 hover:bg-amber-600 text-white py-3 px-12 rounded-lg transition-colors">
        <span v-if="isLoading || !isReady" class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ $t('reservation.processing_payment') }}
        </span>
        <span v-else>{{ $t('reservation.submit') }}</span>
      </button>
      <div v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useNuxtApp } from '#app';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

// Router para navegación
const router = useRouter();

// Definimos los eventos que emitirá el componente
const emit = defineEmits(['payment-success', 'payment-error']);

// i18n
const { t: $t } = useI18n();

// Props
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
});

// Stripe instancia del plugin
const { $stripe } = useNuxtApp();

// Estado reactivo
const stripe = ref(null);
const elements = ref(null);
const clientSecret = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const isReady = ref(false);
const paymentIntentId = ref('');

// i18n instance should be used at the top level
const i18n = useI18n();
const t = i18n.t;

onMounted(async () => {
  stripe.value = $stripe;
  await initializePaymentElement();
});

async function initializePaymentElement() {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: props.items })
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    if (!data.clientSecret) throw new Error(t('reservation.payment_intent_error'));
    
    clientSecret.value = data.clientSecret;
    paymentIntentId.value = data.paymentIntentId || '';

    await nextTick();
    elements.value = stripe.value.elements({ clientSecret: data.clientSecret });
    const paymentElement = elements.value.create('payment');
    paymentElement.mount('#payment-element');
    paymentElement.on('ready', () => { isReady.value = true; });
    paymentElement.on('change', (event) => {
      // Limpiar mensajes de error cuando el usuario modifica los datos
      if (event.complete) {
        errorMessage.value = '';
      }
    });
  } catch (err) {
    console.error('Error al inicializar el elemento de pago:', err);
    errorMessage.value = err.message || t('reservation.payment_error');
    emit('payment-error', errorMessage.value);
  } finally {
    isLoading.value = false;
  }
}

async function handleSubmit() {
  if (!stripe.value || !elements.value || !isReady.value) {
    console.warn('Stripe Elements no está listo');
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    // Preparar la URL de retorno
    const returnUrl = `${window.location.origin}/reservas/confirmacion?payment_intent=${paymentIntentId.value || clientSecret.value.split('_secret')[0]}&payment_intent_client_secret=${clientSecret.value}`;
    
    const { error, paymentIntent } = await stripe.value.confirmPayment({
      elements: elements.value,
      confirmParams: { 
        return_url: returnUrl
      },
      redirect: 'if_required'
    });

    // Si llegamos aquí, es porque hubo un error o no se requirió redirección
    if (error) {
      throw error;
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Solo emitir el evento payment-success si el pago ha sido exitoso
      emit('payment-success', {
        paymentIntentId: paymentIntent.id || paymentIntentId.value || clientSecret.value.split('_secret')[0],
        clientSecret: clientSecret.value
      });
      
      // Esperar un breve momento para que el evento se procese
      setTimeout(() => {
        // Redirigir después de un pequeño retraso
        window.location.href = returnUrl;
      }, 500);
    } else {
      // Si el pago no se completó pero no hay error
      errorMessage.value = t('reservation.payment_incomplete');
      emit('payment-error', errorMessage.value);
    }
  } catch (error) {
    console.error('Error al procesar el pago:', error);
    
    if (error.type === 'card_error' || error.type === 'validation_error') {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = t('reservation.unexpected_error');
    }
    
    emit('payment-error', errorMessage.value);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.bg-amber-500 { background-color: #f59e0b; }
.hover\:bg-amber-600:hover { background-color: #d97706; }
.text-white { color: white; }
.py-3 { padding-top: .75rem; padding-bottom: .75rem; }
.px-12 { padding-left: 3rem; padding-right: 3rem; }
.rounded-lg { border-radius: .5rem; }
.transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-duration: .3s; }
.animate-spin { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>