<template>
  <div class="min-h-screen bg-stone-50 font-eb-garamond">
    <!-- Header -->
    <header class="bg-white shadow-sm fixed w-full z-10">
      <div class="max-w-5xl mx-auto py-5 px-6 flex items-center justify-between">
        <img src="/img/logo.png" alt="La Baranda" class="h-14">
        <h1 class="text-2xl font-normal text-stone-800">{{ $t('reservation.title') }}</h1>
      </div>
    </header>

    <!-- Reservation Form Section -->
    <section class="pt-36 pb-24">
      <div class="max-w-3xl mx-auto px-6">
        <div class="bg-white rounded-xl shadow-md overflow-hidden border border-stone-100">
          <form @submit.prevent="handleSubmit" class="p-10 space-y-10" novalidate>
            <!-- Form Sections -->
            <div class="space-y-10">
              <!-- Personal Information Section -->
              <div>
                <h2 class="text-xl text-stone-800 mb-6 border-b border-stone-200 pb-2">{{ $t('reservation.personal_info') }}</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="name" class="block text-stone-700 mb-2">{{ $t('reservation.name') }} *</label>
                    <div class="relative">
                      <input 
                        id="name"
                        name="name"
                        type="text" 
                        v-model="formData.name" 
                        :class="{ 'border-red-500': errors.name, 'border-green-500': valid.name }"
                        class="w-full bg-stone-50 border rounded-lg py-3 px-4 focus:ring-1 focus:ring-amber-500 focus:bg-white transition-colors"
                        @blur="validateField('name')"
                        @input="handleFormChange"
                        required
                      >
                      <span v-if="valid.name" class="absolute right-3 top-3 text-green-500">✓</span>
                      <span v-if="errors.name" class="absolute right-3 top-3 text-red-500">✗</span>
                    </div>
                    <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
                  </div>
                  <div>
                    <label for="surname" class="block text-stone-700 mb-2">{{ $t('reservation.surname') }} *</label>
                    <div class="relative">
                      <input 
                        id="surname"
                        name="surname"
                        type="text" 
                        v-model="formData.surname" 
                        :class="{ 'border-red-500': errors.surname, 'border-green-500': valid.surname }"
                        class="w-full bg-stone-50 border rounded-lg py-3 px-4 focus:ring-1 focus:ring-amber-500 focus:bg-white transition-colors"
                        @blur="validateField('surname')"
                        @input="handleFormChange"
                        required
                      >
                      <span v-if="valid.surname" class="absolute right-3 top-3 text-green-500">✓</span>
                      <span v-if="errors.surname" class="absolute right-3 top-3 text-red-500">✗</span>
                    </div>
                    <p v-if="errors.surname" class="text-red-500 text-sm mt-1">{{ errors.surname }}</p>
                  </div>
                  <div>
                    <label for="email" class="block text-stone-700 mb-2">{{ $t('reservation.email') }} *</label>
                    <div class="relative">
                      <input 
                        id="email"
                        name="email"
                        type="email" 
                        v-model="formData.email" 
                        :class="{ 'border-red-500': errors.email, 'border-green-500': valid.email }"
                        class="w-full bg-stone-50 border rounded-lg py-3 px-4 focus:ring-1 focus:ring-amber-500 focus:bg-white transition-colors"
                        @blur="validateField('email')"
                        @input="handleFormChange"
                        required
                      >
                      <span v-if="valid.email" class="absolute right-3 top-3 text-green-500">✓</span>
                      <span v-if="errors.email" class="absolute right-3 top-3 text-red-500">✗</span>
                    </div>
                    <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
                  </div>
                  <div>
                    <label for="phone" class="block text-stone-700 mb-2">{{ $t('reservation.phone') }} *</label>
                    <div class="relative">
                      <input 
                        id="phone"
                        name="phone"
                        type="tel" 
                        v-model="formData.phone" 
                        :class="{ 'border-red-500': errors.phone, 'border-green-500': valid.phone }"
                        class="w-full bg-stone-50 border rounded-lg py-3 px-4 focus:ring-1 focus:ring-amber-500 focus:bg-white transition-colors"
                        @blur="validateField('phone')"
                        @input="handleFormChange"
                        required
                      >
                      <span v-if="valid.phone" class="absolute right-3 top-3 text-green-500">✓</span>
                      <span v-if="errors.phone" class="absolute right-3 top-3 text-red-500">✗</span>
                    </div>
                    <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
                  </div>
                </div>
              </div>

              <!-- Reservation Details Section -->
              <div>
                <h2 class="text-xl text-stone-800 mb-6 border-b border-stone-200 pb-2">{{ $t('reservation.details') }}</h2>
                
                <!-- Number of People - FIXED STRUCTURE -->
                <div class="mb-6">
                  <label for="people_count" class="block text-stone-700 mb-2">{{ $t('reservation.people_count') }} *</label>
                  <div class="relative">
                    <div class="flex items-center w-full max-w-xs bg-stone-50 rounded-lg overflow-hidden border" :class="{ 'border-red-500': errors.people_count, 'border-green-500': valid.people_count }">
                      <button 
                        type="button" 
                        class="px-4 py-3 text-stone-500 hover:text-amber-600 transition-colors" 
                        @click="decrementPeople"
                        :disabled="formData.people_count <= 1"
                      >
                        <span class="text-xl">−</span>
                      </button>
                      <input 
                        id="people_count"
                        name="people_count"
                        type="number" 
                        v-model.number="formData.people_count" 
                        min="1" 
                        max="10"
                        class="w-full bg-transparent border-none focus:ring-0 text-center"
                        @blur="validateField('people_count')"
                        @input="handleFormChange"
                        required
                      >
                      <button 
                        type="button" 
                        class="px-4 py-3 text-stone-500 hover:text-amber-600 transition-colors" 
                        @click="incrementPeople"
                        :disabled="formData.people_count >= 10"
                      >
                        <span class="text-xl">+</span>
                      </button>
                    </div>
                    <p v-if="errors.people_count" class="text-red-500 text-sm mt-1">{{ errors.people_count }}</p>
                  </div>
                </div>

                <!-- Date and Time -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label for="date" class="block text-stone-700 mb-2">{{ $t('reservation.date') }} *</label>
                    <div class="relative">
                      <input 
                        id="date"
                        name="date"
                        type="date" 
                        v-model="formData.date" 
                        :min="minDate" 
                        :class="{ 'border-red-500': errors.date, 'border-green-500': valid.date }"
                        class="w-full bg-stone-50 border rounded-lg py-3 px-4 focus:ring-1 focus:ring-amber-500 focus:bg-white transition-colors"
                        @blur="validateField('date')"
                        @input="handleFormChange"
                        required
                      >
                      <span v-if="valid.date" class="absolute right-3 top-3 text-green-500">✓</span>
                      <span v-if="errors.date" class="absolute right-3 top-3 text-red-500">✗</span>
                    </div>
                    <p v-if="errors.date" class="text-red-500 text-sm mt-1">{{ errors.date }}</p>
                    <p class="text-sm text-gray-500 mt-1">{{ $t('reservation.date_min_notice') }}</p>
                  </div>
                  <div>
                    <label for="time" class="block text-stone-700 mb-2">{{ $t('reservation.time') }} *</label>
                    <div class="relative">
                      <select 
                        id="time"
                        name="time"
                        v-model="formData.time" 
                        :class="{ 'border-red-500': errors.time, 'border-green-500': valid.time }"
                        class="w-full bg-stone-50 border rounded-lg py-3 px-4 focus:ring-1 focus:ring-amber-500 focus:bg-white transition-colors appearance-none"
                        @blur="validateField('time')"
                        @change="handleFormChange"
                        required
                      >
                        <option value="" disabled selected>{{ $t('reservation.select_time') }}</option>
                        <option v-for="time in availableTimes" :key="time" :value="time">
                          {{ time }}
                        </option>
                      </select>
                      <span v-if="valid.time" class="absolute right-8 top-3 text-green-500">✓</span>
                      <span v-if="errors.time" class="absolute right-8 top-3 text-red-500">✗</span>
                    </div>
                    <p v-if="errors.time" class="text-red-500 text-sm mt-1">{{ errors.time }}</p>
                  </div>
                </div>
              </div>

              <!-- Brunch Selection Section -->
              <div>
                <h2 class="text-xl text-stone-800 mb-6 border-b border-stone-200 pb-2">
                  {{ $t('reservation.brunch_type') }} *
                  <span v-if="valid.brunches" class="ml-2 text-green-500">✓</span>
                  <span v-if="errors.brunches" class="ml-2 text-red-500">✗</span>
                </h2>
                
                <!-- Precio por brunch -->
                <div class="mb-4 text-sm text-stone-600">
                  {{ $t('reservation.price_per_brunch') }}
                </div>
                
                <div class="space-y-4">
                  <div v-for="brunch in brunchOptions" :key="brunch.id" class="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                    <div class="flex items-center space-x-2">
                      <span class="text-stone-700">{{ brunch.title }}</span>
                      <!-- Tooltip Icon -->
                      <div class="relative group">
                        <span 
                          class="text-amber-500 cursor-pointer"
                          @click="toggleTooltip(brunch.id)"
                        >
                          ?
                        </span>
                        <div 
                          v-if="tooltipVisible === brunch.id" 
                          class="absolute top-full left-0 mt-2 w-64 bg-white text-stone-700 text-sm shadow-lg rounded-lg p-4 z-10"
                        >
                          <ul class="list-disc pl-4">
                            <li v-for="(item, index) in brunch.items" :key="index">
                              {{ item }}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <button 
                        type="button" 
                        class="px-3 py-1 text-stone-500 hover:text-amber-600 transition-colors" 
                        @click="decrementBrunch(brunch.id)"
                      >
                        <span class="text-xl">−</span>
                      </button>
                      <input 
                        type="number" 
                        v-model.number="formData.brunches[brunch.id]" 
                        min="0" 
                        class="w-12 bg-transparent border-none focus:ring-0 text-center"
                        placeholder="0"
                        @change="handleBrunchChange(brunch.id)"
                      >
                      <button 
                        type="button" 
                        class="px-3 py-1 text-stone-500 hover:text-amber-600 transition-colors" 
                        @click="incrementBrunch(brunch.id)"
                      >
                        <span class="text-xl">+</span>
                      </button>
                    </div>
                  </div>
                  <p v-if="errors.brunches" class="text-red-500 text-sm mt-1">{{ errors.brunches }}</p>
                </div>
                
                <!-- Resumen de brunchs y total -->
                <div v-if="totalBrunchs > 0" class="mt-6 p-4 bg-stone-50 rounded-lg border border-stone-200">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-stone-700">{{ $t('reservation.total_brunchs') }}</span>
                    <span class="font-medium">{{ totalBrunchs }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-stone-700 font-medium">{{ $t('reservation.total_amount') }}</span>
                    <span class="text-lg font-semibold text-amber-500">{{ formattedTotalAmount }}</span>
                  </div>
                </div>
              </div>

              <!-- Additional Information Section -->
              <div>
                <h2 class="text-xl text-stone-800 mb-6 border-b border-stone-200 pb-2">{{ $t('reservation.additional_info') }}</h2>
                
                <!-- Payment Method -->
                <div class="mb-6">
                  <label class="block text-stone-700 mb-3">{{ $t('reservation.payment_method') }} *</label>
                  <div class="flex space-x-6">
                    <label class="flex items-center group cursor-pointer">
                      <div class="relative">
                        <input 
                          type="radio" 
                          v-model="formData.payment_method" 
                          value="card" 
                          class="sr-only"
                          @change="handlePaymentMethodChange"
                        >
                        <div class="w-5 h-5 border-2 border-stone-300 rounded-full group-hover:border-amber-500 transition-colors"></div>
                        <div v-if="formData.payment_method === 'card'" class="absolute inset-0 flex items-center justify-center">
                          <div class="w-3 h-3 bg-amber-500 rounded-full"></div>
                        </div>
                      </div>
                      <span class="ml-2 text-stone-700">{{ $t('reservation.card') }}</span>
                    </label>
                    <label class="flex items-center group cursor-pointer">
                      <div class="relative">
                        <input 
                          type="radio" 
                          v-model="formData.payment_method" 
                          value="cash" 
                          class="sr-only"
                          @change="handlePaymentMethodChange"
                        >
                        <div class="w-5 h-5 border-2 border-stone-300 rounded-full group-hover:border-amber-500 transition-colors"></div>
                        <div v-if="formData.payment_method === 'cash'" class="absolute inset-0 flex items-center justify-center">
                          <div class="w-3 h-3 bg-amber-500 rounded-full"></div>
                        </div>
                      </div>
                      <span class="ml-2 text-stone-700">{{ $t('reservation.cash') }}</span>
                    </label>
                  </div>
                  <p v-if="errors.payment_method" class="text-red-500 text-sm mt-1">{{ errors.payment_method }}</p>

                  <!-- Aviso de depósito o total -->
                  <div v-if="formData.payment_method && totalBrunchs > 0" class="mt-4 p-4 bg-stone-50 border border-stone-200 rounded-lg">
                    <template v-if="formData.payment_method === 'cash'">
                      <p class="text-sm text-stone-700">
                        {{ $t('reservation.cash_deposit_notice') }}
                      </p>
                      <p class="mt-2 font-medium">
                        {{ $t('reservation.total_payment_notice') }} 
                        <span class="text-amber-500 font-semibold">{{ formattedDepositAmount }}</span>
                      </p>
                      
                    </template>
                    <template v-else-if="formData.payment_method === 'card'">
                      <p class="text-sm text-stone-700">
                        {{ $t('reservation.total_payment_notice') }}
                        <span class="text-amber-500 font-semibold">{{ formattedTotalAmount }}</span>
                      </p>
                    </template>
                  </div>
                </div>

                <!-- Allergies -->
                <div>
                  <label for="allergies" class="block text-stone-700 mb-2">{{ $t('reservation.allergies') }}</label>
                  <textarea
                    id="allergies"
                    name="allergies"
                    v-model="formData.allergies"
                    rows="3"
                    :class="{ 'border-red-500': charCount > maxChars, 'border-green-500': charCount <= maxChars && formData.allergies.trim() !== '' }"
                    class="w-full bg-stone-50 border rounded-lg py-3 px-4 focus:ring-1 focus:ring-amber-500 focus:bg-white transition-colors"
                    @input="handleFormChange"
                  ></textarea>
                  <p class="text-sm text-gray-500 mt-1">
                    {{ charCount }} / {{ maxChars }} {{ $t('reservation.allergies_limit') }}
                  </p>
                  <p v-if="charCount > maxChars" class="text-red-500 text-sm mt-1">
                    {{ $t('reservation.allergies_limit_chars', { maxChars }) }}
                  </p>
                </div>

                <!-- Accept Terms -->
                <div class="mt-8">
                  <label class="flex items-center group cursor-pointer">
                    <div class="relative">
                      <input 
                        type="checkbox" 
                        v-model="formData.accept_terms" 
                        class="sr-only"
                        @change="handleFormChange"
                        required
                      >
                      <div class="w-5 h-5 border-2 border-stone-300 rounded group-hover:border-amber-500 transition-colors" :class="{ 'border-red-500': errors.accept_terms }"></div>
                      <div v-if="formData.accept_terms" class="absolute inset-0 flex items-center justify-center text-amber-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <span class="ml-2 text-stone-700">{{ $t('reservation.accept_terms') }} *</span>
                  </label>
                  <p v-if="errors.accept_terms" class="text-red-500 text-sm mt-1">{{ errors.accept_terms }}</p>
                </div>
              </div>
            </div>

            <!-- Submit Button (Only shown when form is not valid) -->
            <div v-if="!isFormValid" class="mt-10 text-center">
              <button 
                type="submit"
                class="bg-amber-500 hover:bg-amber-600 text-white py-3 px-12 rounded-lg transition-colors"
              >
                {{ $t('reservation.submit') }}
              </button>
            </div>

            <!-- Stripe Payment Component (Only shown when form is valid) -->
            <StripePayment
              v-if="isFormValid && (formData.payment_method === 'card' || formData.payment_method === 'cash') && totalBrunchs > 0"
              :items="buildItems()"
              @payment-success="handlePaymentSuccess"
              @payment-error="handlePaymentError"
              :key="stripeComponentKey"
            />

            <!-- Payment Error Message -->
            <div v-if="paymentError" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-red-600">{{ paymentError }}</p>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Language Selector -->
    <div class="fixed bottom-6 right-6 bg-white shadow-md rounded-lg p-2">
      <select 
        v-model="$i18n.locale"
        class="text-sm bg-transparent border-none focus:ring-1 focus:ring-amber-500 pr-7"
      >
        <option value="es">Español</option>
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import StripePayment from '~/components/StripePayment.vue';
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const navigateTo = router.push;

const { t, locale, getLocaleMessage } = useI18n();

// Form data
const formData = reactive({
  name: '',
  surname: '',
  email: '',
  phone: '',
  language: locale.value,
  people_count: 1,
  brunches: {}, // Object to store quantities for each brunch type
  date: '',
  time: '',
  payment_method: '',
  allergies: '',
  accept_terms: false,
});

// Validation state
const errors = reactive({
  name: '',
  surname: '',
  email: '',
  phone: '',
  people_count: '',
  date: '',
  time: '',
  payment_method: '',
  brunches: '',
  allergies: '',
  accept_terms: '',
});

const valid = reactive({
  name: false,
  surname: false,
  email: false,
  phone: false,
  people_count: true, // Default to true since we start with 1
  date: false,
  time: false,
  payment_method: false,
  brunches: false,
  allergies: true, // Optional field, starts as valid
  accept_terms: false,
});

// Character counter for textarea
const maxChars = 300;
const charCount = computed(() => 
  formData.allergies ? formData.allergies.length : 0
);

// Tooltip visibility state
const tooltipVisible = ref(null);

// Toggle tooltip visibility
const toggleTooltip = (id) => {
  tooltipVisible.value = tooltipVisible.value === id ? null : id;
};

// Brunch options - FIXED to use ref instead of computed
const brunchOptions = ref([]);

// Key for Stripe component to force re-render when form changes
const stripeComponentKey = ref(0);

// Form validation status
const isFormValid = computed(() => {
  return validateAllFields(false);
});

// Initialize brunch quantities to 0
onMounted(() => {
  updateBrunchOptions();
  // Initialize brunches object if not already done
  if (!formData.brunches) {
    formData.brunches = {};
  }
  // Set all brunch quantities to 0
  brunchOptions.value.forEach((br) => {
    formData.brunches[br.id] = 0;
  });
});

// Update brunch options when locale changes
const updateBrunchOptions = () => {
  try {
    const menus = getLocaleMessage(locale.value).brunchMenus;
    if (menus) {
      brunchOptions.value = Object.entries(menus).map(([key, menu]) => ({
        id: Number(key),
        title: menu.title,
        price: menu.price,
        items: menu.items,
      }));
    }
  } catch (error) {
    console.error("Error updating brunch options:", error);
    brunchOptions.value = [];
  }
};

// Watch for locale changes
watch(
  () => locale.value,
  () => {
    updateBrunchOptions();
    // Update brunch quantities for any new options
    brunchOptions.value.forEach((br) => {
      if (typeof formData.brunches[br.id] === 'undefined') {
        formData.brunches[br.id] = 0;
      }
    });
    
    // Update form language
    formData.language = locale.value;
    
    // Re-validate fields to update error messages in new language
    if (Object.values(errors).some(error => error !== '')) {
      validateAllFields();
    }
  },
  { immediate: true } // Ensure the watcher runs on component mount
);

// Generate available times (10:00 AM to 12:00 PM, 15-minute intervals)
const availableTimes = [];
for (let hour = 10; hour <= 12; hour++) {
  for (let minutes = 0; minutes < 60; minutes += 15) {
    if (hour === 12 && minutes > 0) break; // Stop at 12:00 PM
    const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    availableTimes.push(time);
  }
}

// Minimum date (2 days from today) - IMPROVED to ensure 48 hours minimum
const minDate = computed(() => {
  const today = new Date();
  today.setDate(today.getDate() + 2);
  return today.toISOString().split('T')[0];
});

// Helper functions for incrementing/decrementing counters
const incrementPeople = () => {
  if(formData.people_count < 10) {
    formData.people_count++;
    validateField('people_count');
    handleFormChange();
  }
};

const decrementPeople = () => {
  if (formData.people_count > 1) {
    formData.people_count--;
    validateField('people_count');
    handleFormChange();
  }
};

const incrementBrunch = (id) => {
  if (typeof formData.brunches[id] === 'undefined') {
    formData.brunches[id] = 0;
  }
  formData.brunches[id]++;
  validateField('brunches');
  handleFormChange();
};

const decrementBrunch = (id) => {
  if (formData.brunches[id] > 0) {
    formData.brunches[id]--;
    validateField('brunches');
    handleFormChange();
  }
};

// Handle brunch quantity change
const handleBrunchChange = (id) => {
  validateField('brunches');
  handleFormChange();
};

// Handle payment method change
const handlePaymentMethodChange = () => {
  validateField('payment_method');
  handleFormChange();
  
  if (formData.payment_method === 'cash') {
    alert(t('reservation.cash_warning'));
  }
};

// Handle form changes - regenerate Stripe component when form changes
const handleFormChange = () => {
  // Increment the key to force re-render of Stripe component
  stripeComponentKey.value++;
};

// Validation functions
const validateField = (field) => {
  switch (field) {
    case 'name':
      if (!formData.name.trim()) {
        errors.name = t('reservation.name_required');
        valid.name = false;
      } else {
        errors.name = '';
        valid.name = true;
      }
      break;
      
    case 'surname':
      if (!formData.surname.trim()) {
        errors.surname = t('reservation.surname_required');
        valid.surname = false;
      } else {
        errors.surname = '';
        valid.surname = true;
      }
      break;
      
    case 'email': {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email) {
        errors.email = t('reservation.email_required');
        valid.email = false;
      } else if (!emailRegex.test(formData.email)) {
        errors.email = t('reservation.email_invalid');
        valid.email = false;
      } else {
        errors.email = '';
        valid.email = true;
      }
      break;
    }
    
    case 'phone': {
      const phoneRegex = /^[0-9]{9,15}$/;
      if (!formData.phone) {
        errors.phone = t('reservation.phone_required');
        valid.phone = false;
      } else if (!phoneRegex.test(formData.phone)) {
        errors.phone = t('reservation.phone_invalid');
        valid.phone = false;
      } else {
        errors.phone = '';
        valid.phone = true;
      }
      break;
    }
      
    case 'people_count':
      if (!formData.people_count || formData.people_count < 1) {
        errors.people_count = t('reservation.people_count_required');
        valid.people_count = false;
        // Ensure minimum value is 1
        formData.people_count = 1;
      } else if (formData.people_count > 10) {
        errors.people_count = t('reservation.people_count_max');
        valid.people_count = false;
        // Ensure maximum value is 10
        formData.people_count = 10;
      } else {
        errors.people_count = '';
        valid.people_count = true;
      }
      break;
      
    case 'date':
      if (!formData.date) {
        errors.date = t('reservation.date_required');
        valid.date = false;
      } else {
        // Check if date is at least 48 hours from now
        const selectedDate = new Date(formData.date);
        const minAllowedDate = new Date();
        minAllowedDate.setDate(minAllowedDate.getDate() + 2);
        minAllowedDate.setHours(0, 0, 0, 0); // Set to beginning of day
        
        if (selectedDate < minAllowedDate) {
          errors.date = t('reservation.date_min_48h');
          valid.date = false;
        } else {
          errors.date = '';
          valid.date = true;
        }
      }
      break;
      
    case 'time':
      if (!formData.time) {
        errors.time = t('reservation.time_required');
        valid.time = false;
      } else {
        errors.time = '';
        valid.time = true;
      }
      break;
      
    case 'payment_method':
      if (!formData.payment_method) {
        errors.payment_method = t('reservation.payment_method_required');
        valid.payment_method = false;
      } else {
        errors.payment_method = '';
        valid.payment_method = true;
      }
      break;
      
    case 'brunches': {
      const totalBrunches = Object.values(formData.brunches).reduce((sum, qty) => sum + qty, 0);
      if (totalBrunches === 0) {
        errors.brunches = t('reservation.brunch_type_required');
        valid.brunches = false;
      } else {
        errors.brunches = '';
        valid.brunches = true;
      }
      break;
    }
      
    case 'accept_terms':
      if (!formData.accept_terms) {
        errors.accept_terms = t('reservation.accept_terms_required');
        valid.accept_terms = false;
      } else {
        errors.accept_terms = '';
        valid.accept_terms = true;
      }
      break;
  }
};

// Validate all fields
const validateAllFields = (showErrors = true) => {
  if (showErrors) {
    validateField('name');
    validateField('surname');
    validateField('email');
    validateField('phone');
    validateField('people_count');
    validateField('date');
    validateField('time');
    validateField('payment_method');
    validateField('brunches');
    validateField('accept_terms');
  }
  
  // Check if allergies text is within character limit
  const isAllergiesValid = charCount.value <= maxChars;
  
  // Check if all required fields are valid
  return valid.name && 
         valid.surname && 
         valid.email && 
         valid.phone && 
         valid.people_count && 
         valid.date && 
         valid.time && 
         valid.payment_method && 
         valid.brunches && 
         valid.accept_terms && 
         isAllergiesValid;
};

// Total brunchs and amount calculations
const totalBrunchs = computed(() => {
  return Object.values(formData.brunches).reduce((sum, qty) => sum + qty, 0);
});

const totalAmount = computed(() => {
  // Precio por brunch: 25€ (en céntimos)
  return totalBrunchs.value * 2500;
});

const depositAmount = computed(() => {
  // Depósito por brunch: 6€ (en céntimos)
  return totalBrunchs.value * 600;
});

// Formatear montos según el idioma
const formattedTotalAmount = computed(() => {
  const amount = totalAmount.value / 100; // Convertir de céntimos a euros
  
  if (locale.value === 'en') {
    return `€${amount.toFixed(2)}`;
  } else {
    return `${amount.toFixed(2)} €`;
  }
});

const formattedDepositAmount = computed(() => {
  const amount = depositAmount.value / 100; // Convertir de céntimos a euros
  
  if (locale.value === 'en') {
    return `€${amount.toFixed(2)}`;
  } else {
    return `${amount.toFixed(2)} €`;
  }
});

// Stripe payment handling
const isProcessingPayment = ref(false);
const paymentError = ref('');
const showPaymentForm = ref(false);
const submitting = ref(false);

// Función para construir los items para Stripe
function buildItems() {
  const items = [];
  if (formData.payment_method === 'cash') {
    // Para pago en efectivo, se cobra el "seguro" de 6€ por brunch
    items.push({
      productId: 'prod_SJiCqRm6KZnd5Y',
      quantity: totalBrunchs.value
    });
  } else {
    // Para pago con tarjeta, se cobran los brunches a 25€ c/u
    const map = {
      '1': 'prod_SJi8WSsiE7cboJ',   // New York
      '2': 'prod_SJi8jydFR9oyNV',    // Deluxe
      '3': 'prod_SJi2U6K27tsau6'     // Metropolitan
    };
    for (const [id, qty] of Object.entries(formData.brunches)) {
      if (qty > 0) {
        items.push({
          productId: map[id],
          quantity: qty
        });
      }
    }
  }
  return items;
}

// Función para preparar los datos a enviar a Node-RED
const prepareDataForNodeRED = () => {
  // Crear un objeto con los datos del formulario y del pago
  const selectedBrunches = {};
  let brunchTitles = [];
  
  // Obtener los nombres de los brunchs seleccionados
  brunchOptions.value.forEach(brunch => {
    if (formData.brunches[brunch.id] > 0) {
      selectedBrunches[brunch.id] = {
        title: brunch.title,
        quantity: formData.brunches[brunch.id],
        price: brunch.price
      };
      brunchTitles.push(`${brunch.title} (${formData.brunches[brunch.id]})`);
    }
  });
  
  // Crear el objeto con todos los datos
  return {
    // Datos personales
    name: formData.name,
    surname: formData.surname,
    email: formData.email,
    phone: formData.phone,
    language: formData.language,
    
    // Detalles de la reserva
    people_count: formData.people_count,
    date: formData.date,
    time: formData.time,
    
    // Detalles del brunch
    brunches: selectedBrunches,
    brunch_summary: brunchTitles.join(', '),
    total_brunchs: totalBrunchs.value,
    
    // Detalles del pago
    payment_method: formData.payment_method,
    total_amount: totalAmount.value,
    total_amount_formatted: formattedTotalAmount.value,
    deposit_amount: depositAmount.value,
    deposit_amount_formatted: formattedDepositAmount.value,
    
    // Información adicional
    allergies: formData.allergies || 'Ninguna',
    
    // Timestamp
    reservation_date: new Date().toISOString(),
    reservation_id: `RES-${Date.now().toString(36).toUpperCase()}`
  };
};

// Manejar el éxito del pago con tarjeta
const handlePaymentSuccess = async ({ paymentIntentId, clientSecret }) => {
  try {
    // Preparar los datos para enviar a Node-RED
    const dataToSend = prepareDataForNodeRED();
    
    // Añadir información específica del pago con tarjeta
    dataToSend.payment_intent_id = paymentIntentId;
    dataToSend.payment_status = 'succeeded';
    dataToSend.payment_type = 'card';
    
    // Guardar los datos en localStorage para que la página de confirmación pueda acceder a ellos
    localStorage.setItem('reservationData', JSON.stringify(dataToSend));
    
    // También guardar el importe en sessionStorage como respaldo
    sessionStorage.setItem('reservationAmount', formattedTotalAmount.value);
    
    // Enviar los datos a Node-RED
    try {
      const response = await fetch('https://51.44.85.162:1880/formulario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });
      
      if (!response.ok) {
        console.warn('Error al enviar datos a Node-RED:', response.statusText);
      } else {
        console.log('Datos enviados correctamente a Node-RED');
      }
    } catch (error) {
      console.error('Error de conexión con Node-RED:', error);
      // No interrumpimos el flujo si falla Node-RED
    }
  } catch (error) {
    console.error('Error al procesar el pago:', error);
  } finally {
    navigateTo({
      path: '/reservas/confirmacion',
      query: {
        payment_intent: paymentIntentId,
        payment_intent_client_secret: clientSecret,
        reservation_data: 'stored', // Indicador para que la página de confirmación sepa que hay datos en localStorage
        amount: formattedTotalAmount.value // Añadir el importe como parámetro de URL
      }
    });
  }
};

// También actualiza la función processCashPayment para hacer lo mismo con los pagos en efectivo
const processCashPayment = async () => {
  // Validar el formulario
  const isValid = validateAllFields();
  
  if (!isValid) {
    alert(t('reservation.form_error'));
    return;
  }
  
  submitting.value = true;
  
  try {
    // Preparar los datos para enviar a Node-RED
    const dataToSend = prepareDataForNodeRED();
    
    // Añadir información específica del pago en efectivo
    dataToSend.payment_status = 'pending';
    dataToSend.payment_type = 'cash';
    dataToSend.deposit_only = true;
    
    // Guardar los datos en localStorage para que la página de confirmación pueda acceder a ellos
    localStorage.setItem('reservationData', JSON.stringify(dataToSend));
    
    // También guardar el importe del depósito en sessionStorage como respaldo
    sessionStorage.setItem('reservationAmount', formattedDepositAmount.value);
    
    // Enviar los datos a Node-RED
    const response = await fetch('https://51.44.85.162:1880/formulario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    });
    
    if (!response.ok) {
      throw new Error('Error al enviar datos a Node-RED');
    }
    
    // Simular procesamiento del pago
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mostrar mensaje de éxito
    alert(t('reservation.cash_deposit_success'));
    
    // Resetear el formulario
    resetForm();
    
    // Redirigir a la página de confirmación con el importe como parámetro
    navigateTo({
      path: '/reservas/confirmacion',
      query: {
        amount: formattedDepositAmount.value
      }
    });
  } catch (error) {
    console.error('Error al procesar el pago:', error);
    alert(t('reservation.payment_processing_error'));
  } finally {
    submitting.value = false;
  }
};

// Manejar el envío del formulario
const handleSubmit = async () => {
  const isValid = validateAllFields();
  if (!isValid) {
    alert(t('reservation.form_error'));
    // Scroll al primer error...
    const firstErrorField = Object.keys(errors).find(key => errors[key]);
    if (firstErrorField) {
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
    }
    return;
  }
};

// Función para resetear el formulario
const resetForm = () => {
  Object.keys(formData).forEach(key => {
    if (key === 'people_count') {
      formData[key] = 1;
    } else if (key === 'brunches') {
      const brunchesObj = {};
      brunchOptions.value.forEach(br => {
        brunchesObj[br.id] = 0;
      });
      formData.brunches = brunchesObj;
    } else if (key === 'language') {
      formData[key] = locale.value;
    } else {
      formData[key] = '';
    }
  });
  formData.accept_terms = false;
  
  // Reset validation state
  Object.keys(valid).forEach(key => {
    if (key === 'allergies') {
      valid[key] = true;
    } else if (key === 'people_count') {
      valid[key] = true;
    } else {
      valid[key] = false;
    }
  });
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });
  
  // Reset payment state
  paymentError.value = '';
  showPaymentForm.value = false;
  stripeComponentKey.value++;
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&display=swap');

.font-eb-garamond {
  font-family: 'EB Garamond', serif;
}

/* Custom styles for date input */
input[type="date"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

/* Custom styles for select */
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}

/* Remove spinners from number inputs */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>

<style scoped>
/* Custom styles for the language selector */



select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: transparent;
  border: none;
  padding-right: 2rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.25em 1.25em;
  font-size: 0.875rem;
  color: #374151;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;
}

select:focus {
  outline: none;
  box-shadow: 0 0 0 2px #fbbf24;
}

option {
  color: #374151;
}

/* Tooltip styles */
.group:hover .tooltip {
  display: block;
}
</style>