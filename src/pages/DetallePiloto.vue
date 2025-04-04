<template>
  <q-page>
     <!-- Botón para volver atrás -->
     <q-btn
      label="Volver"
      icon="arrow_back"
      @click="goBack"
      class="q-mb-md"
      color="primary"
    />
    <q-spinner v-if="isLoading" color="primary" size="40px" class="q-mt-md" />
    <div v-else>
      <PilotosCard :driver="driverDetail" />
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDrivers } from '../composables/usePilotos'; // Asegúrate de que el composable se llame correctamente
import PilotosCard from 'src/components/PilotosCard.vue';

// Obtener el id del piloto desde la ruta
const route = useRoute();
const { loadDriverDetail, driverDetail, isLoading } = useDrivers();

// Función para navegar hacia atrás
const router = useRouter();
const goBack = () => {
  router.back();
};

// Cargar los detalles del piloto al montar el componente
onMounted(() => {
  loadDriverDetail(route.params.pilotoId); // Pasa el id desde la ruta
});
</script>
