<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center py-5 px-6">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <img src="/img/logo.png" alt="La Baranda" class="h-12">
          </div>

          <!-- Navigation Links (Desktop) -->
          <nav class="hidden md:flex space-x-10 mx-auto">
            <a href="https://cafeterialabaranda.com/" class="text-gray-600 hover:text-gray-900 text-sm font-medium">{{ $t('nav.home') }}</a>
            <a href="https://cafeterialabaranda.com/carta/" class="text-gray-600 hover:text-gray-900 text-sm font-medium">{{ $t('nav.menu') }}</a>
            <a href="https://cafeterialabaranda.com/quienes-somos/" class="text-gray-600 hover:text-gray-900 text-sm font-medium">{{ $t('nav.about') }}</a>
            <a href="https://cafeterialabaranda.com/contacto/" class="text-gray-600 hover:text-gray-900 text-sm font-medium">{{ $t('nav.contact') }}</a>
            <a href="#" class="text-gray-900 border-b-2 border-[#eeb504] text-sm font-medium">{{ $t('nav.brunch') }}</a>
          </nav>

          <!-- Mobile Menu Button -->
          <div class="md:hidden">
            <button @click="toggleMobileMenu" class="text-gray-600 hover:text-gray-900 focus:outline-none">
              <svg v-if="!isMobileMenuOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden bg-white shadow-md">
        <nav class="flex flex-col space-y-4 p-4">
          <a href="https://cafeterialabaranda.com/" class="text-gray-600 hover:text-gray-900 text-sm font-medium">{{ $t('nav.home') }}</a>
          <a href="https://cafeterialabaranda.com/carta/" class="text-gray-600 hover:text-gray-900 text-sm font-medium">{{ $t('nav.menu') }}</a>
          <a href="https://cafeterialabaranda.com/quienes-somos/" class="text-gray-600 hover:text-gray-900 text-sm font-medium">{{ $t('nav.about') }}</a>
          <a href="https://cafeterialabaranda.com/contacto/" class="text-gray-600 hover:text-gray-900 text-sm font-medium">{{ $t('nav.contact') }}</a>
          <a href="#" class="text-gray-900 border-b-2 border-[#eeb504] text-sm font-medium">{{ $t('nav.brunch') }}</a>
        </nav>
      </div>
    </header>

    <!-- Hero Section con fondo -->
    <div
      class="relative h-64 md:h-80 overflow-hidden bg-cover bg-center"
      style="background-image: url('/img/fondo.webp');"
    >
      <div class="absolute inset-0 bg-black opacity-60"></div>
      <div class="relative flex flex-col items-center justify-center h-full text-center px-4 z-10">
        <h1 class="text-4xl md:text-5xl font-[600] tracking-wider text-white">La Baranda</h1>
        <p class="text-lg text-gray-200 mt-3 font-light italic">{{ $t('intro.subtitle') }}</p>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="max-w-8xl mx-auto px-12 py-12">
      <!-- Introducción -->
      <div class="text-center mb-12">
        <h2 class="text-5xl font-[500] text-gray-800 mb-4">Brunch</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">{{ $t('intro.text') }}</p>
      </div>

      <!-- Menús de Brunch -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div 
          v-for="menu in brunchMenus" 
          :key="menu.id" 
          class="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
        >
          <div class="h-48 overflow-hidden">
            <img
              :src="menu.image"
              :alt="menu.title" 
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-3xl font-medium text-gray-900">{{ menu.title }}</h3>
              <span class="text-[#eeb504] font-medium">{{ menu.price }}</span>
            </div>
            <ul class="space-y-2 mb-6">
              <li 
                v-for="(item, index) in menu.items" 
                :key="index" 
                class="text-gray-600 text-sm flex items-start"
              >
                <span class="inline-block w-1.5 h-1.5 rounded-full bg-[#eeb504] mt-1.5 mr-2"></span>
                {{ $t(`brunchMenus.${menu.id}.items.${index}`) }}
              </li>
            </ul>
            <button
              @click="reserve(menu.id)"
              class="w-full mt-4 bg-gray-800 text-white py-3 px-6 rounded-md hover:bg-[#eeb504] transition-colors duration-300 flex items-center justify-center"
            >
              <span>{{ $t('button') }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-8">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h3 class="text-2xl font-light text-white mb-4">{{ $t('footer.title') }}</h3>
        <p class="text-sm mb-6">{{ $t('footer.slogan') }}</p>
        <div class="flex justify-center space-x-4 mb-6">
          <a href="#" class="text-gray-300 hover:text-white text-sm">{{ $t('footer.privacy') }}</a>
          <a href="#" class="text-gray-300 hover:text-white text-sm">{{ $t('footer.terms') }}</a>
        </div>
        <div class="flex justify-center space-x-6 mb-6">
          <a href="https://instagram.com/terrazalabaranda" class="text-gray-300 hover:text-white">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="https://facebook.com/terrazalabaranda" class="text-gray-300 hover:text-white">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.35c0 .732.593 1.325 1.325 1.325h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
            </svg>
          </a>
          <a href="https://www.tripadvisor.es/Restaurant_Review-g1572345-d5864550-Reviews-Terraza_La_Baranda-El_Sauzal_Tenerife_Canary_Islands.html" class="text-gray-300 hover:text-white">
            <img src="/img/tripadvisor-logo-svgrepo-com.svg" alt="TripAdvisor" class="h-6 w-6">
          </a>
        </div>
        <p class="text-xs text-gray-500">{{ $t('footer.copyright') }}</p>
      </div>
    </footer>
    <div class="fixed bottom-4 right-4 bg-white shadow-md rounded p-2">
      <select v-model="$i18n.locale" class="text-sm">
        <option value="es">Español</option>
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
      </select>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      isMobileMenuOpen: false, // Estado para controlar el menú móvil
      brunchMenus: [
        {
          id: 1,
          title: "Metropolitan",
          price: "25,00 €",
          image: "/img/Metropolitan.png",
          items: [
            "Zumo, cava, café o té",
            "Cesta de panecillos",
            "Mermeladas, tumaca y mantequilla",
            "Revuelto de huevo, bacon y rúcula",
            "Tabla de quesos",
            "Macedonia de frutas",
          ],
        },
        {
          id: 2,
          title: "Deluxe",
          price: "25,00 €",
          image: "/img/Deluxe.png",
          items: [
            "Zumo, cava, café o té",
            "Cestas de panecillos",
            "Yogur con cereales y fruta",
            "Mermeladas, tumaca y mantequilla",
            "Mini tostadas de salmón e ibérico",
            "Tortitas con sirope o miel",
          ],
        },
        {
          id: 3,
          title: "New York",
          price: "25,00 €",
          image: "/img/New-york.png",
          items: [
            "Zumo, cava, café o té",
            "Cesta de panecillos",
            "Mermeladas, tumaca y mantequilla",
            "Mini hamburguesas",
            "Ensalada César",
            "Mini brochetas de queso fresco y tomate",
          ],
        },
      ],
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen; // Alterna el estado del menú móvil
    },
    reserve(menuId) {
      this.$router.push(`/reservas/reserva?menuId=${menuId}`);
    },
  },
};
</script>

<style scoped>
/* Importa la fuente EB Garamond desde Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=Montserrat:wght@300;400;500&display=swap');

/* Aplica EB Garamond a los títulos */
h1, h2, h3, h4, h5, h6 {
  font-family: 'EB Garamond', serif;
}

/* Mantén Montserrat para el resto del texto */
body, p, button, li, a {
  font-family: 'Montserrat', sans-serif;
}
</style>