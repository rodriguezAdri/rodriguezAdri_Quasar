<template>
  <q-page>

    <!-- Campo de búsqueda para filtrar pilotos -->
    <q-input
      v-model="searchTerm"
      label="Cerca pilot"
      @input="filterDrivers"
      class="q-mb-md"
    />

    <!-- Tabla que muestra los pilotos filtrados -->
    <q-table
      :rows="filteredDrivers"
      :columns="columns"
      row-key="driverId"
    >
      <!-- Usar v-slot para insertar el enlace dentro de la tabla -->
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <!-- Este es el enlace que redirige al detalle del piloto -->
          <router-link :to="`/piloto/${props.row.driverId}`">
            {{ props.row.givenName }} {{ props.row.familyName }}
          </router-link>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDrivers } from '../composables/usePilotos'; // Asegúrate de que el nombre del composable sea correcto


// Definición de las variables reactivas
const searchTerm = ref('');
const { drivers, loadDrivers } = useDrivers(); // Obtenemos los datos y la función para cargar los pilotos


// Computed property para filtrar los pilotos según el término de búsqueda
const filteredDrivers = computed(() => {
  return drivers.value.filter(driver => {
    // Verifica si el nombre o apellido contiene el término de búsqueda
    const matchesSearch = (
      driver.givenName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      driver.familyName.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
    return matchesSearch;
  });
});

// Definición de las columnas de la tabla
const columns = [
  {
    name: 'name',
    label: 'Nom',
    required: true,
    align: 'left',
    field: row => row,  // Devolvemos la fila completa para usarla en el v-slot
  }
];



// Cargar los datos de los pilotos al montar el componente
onMounted(loadDrivers);
</script>
