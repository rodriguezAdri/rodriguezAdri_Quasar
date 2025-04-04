<template>
  <q-card v-if="driver">
    <q-card-section>
      <div class="intro">
        <q-avatar :size="100">
          <!-- Si 'driver.imageUrl' no está disponible, muestra una imagen predeterminada -->
          <img :src="driver.url" alt="Driver Image" />
        </q-avatar>
        <h2>{{ driver.givenName }} {{ driver.familyName }}</h2>
      </div>
      <div>
        <p><strong>Número:</strong> {{ driver.permanentNumber }}</p>
        <p><strong>Abreviatura:</strong> {{ driver.code }}</p>
        <p><strong>Data de naixement:</strong> {{ driver.dateOfBirth }}</p>
        <!-- Muestra el driverId -->
        <p><strong>Nacionalitat:</strong> {{ driver.nationality }}</p>
      </div>
    </q-card-section>
  </q-card>
  <!-- Si no hay datos disponibles, mostrar mensaje alternativo -->
  <q-card v-else>
    <q-card-section>
      <div>Carregant dades del pilot...</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineProps } from 'vue';

// Definición de las propiedades que recibe el componente
defineProps({
  driver: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.intro {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 20px;
}
</style>
