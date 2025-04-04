import { ref } from 'vue';
import axios from 'axios';

export const useDrivers = () => {
  const drivers = ref([]);
  const driverDetail = ref(null); // Para almacenar los detalles del piloto
  const isLoading = ref(true);
  const error = ref(null);

  // Cargar todos los pilotos
  const loadDrivers = async () => {
    try {
      const response = await axios.get('https://api.jolpi.ca/ergast/f1/2024/drivers/');
      drivers.value = response.data.MRData.DriverTable.Drivers;
      isLoading.value = false;
    } catch (error) {
      error.value = 'Error al cargar los datos de los pilotos.';
      isLoading.value = false;
    }
  };

  // Cargar los detalles de un piloto en base a su driverId
  const loadDriverDetail = async (driverId) => {
    try {
      const response = await axios.get(`https://api.jolpi.ca/ergast/f1/2024/drivers/${driverId}/`);
      driverDetail.value = response.data.MRData.DriverTable.Drivers[0]; // Suponiendo que el detalle viene como un solo objeto
      isLoading.value = false;
    } catch (error) {
      error.value = `Error al cargar los detalles del piloto ${driverId}.`;
      isLoading.value = false;
    }
  };

  return {
    drivers,
    driverDetail,
    isLoading,
    error,
    loadDrivers,
    loadDriverDetail,
  };
};
