<template>
  <q-page padding>
    <h2>Gestión de pilotos F1 2024</h2>

    <q-input
      v-model="searchTerm"
      label="Busca pilotos..."
      @input="filterDrivers"
      class="q-mb-md"
    />

    <q-table
      :rows="filteredDrivers"
      :columns="columns"
      row-key="driverId"
    >
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <router-link
            :to="`/piloto/${props.row.driverId}`"
            class="text-primary text-weight-medium"
          >
            {{ props.row.givenName }} {{ props.row.familyName }}
          </router-link>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="edit" flat color="primary" @click="editPilot(props.row)" v-if="props.row.isCustom" />
          <q-btn icon="delete" flat color="negative" @click="deletePilot(props.row.driverId)" v-if="props.row.isCustom" />
        </q-td>
      </template>
    </q-table>

    <h3 class="q-mt-xl">Nuevo piloto</h3>
    <q-form @submit.prevent="addPilot">
      <q-input v-model="newPilot.fullName" label="Nombre completo (ex: Carlos Sainz)" />
      <q-input v-model="newPilot.permanentNumber" label="Número del piloto" type="number" />
      <q-input v-model="newPilot.dateOfBirth" label="Fecha de nacimiento" type="date" />
      <q-input v-model="newPilot.nationality" label="Nacionalitat" />

      <q-btn type="submit" label="Añadir" color="primary" class="q-mt-md" />
    </q-form>

    <q-dialog v-model="editDialog">
      <q-card>
        <q-card-section>
          <q-input v-model="editedPilot.givenName" label="Nombre" />
          <q-input v-model="editedPilot.familyName" label="Apellido" />
        </q-card-section>
        <q-card-actions text-align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Guardar" color="primary" @click="saveEditedPilot" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDrivers } from '../composables/usePilotos'

const searchTerm = ref('')
const { drivers, loadDrivers } = useDrivers()
const customPilots = ref([])
const editDialog = ref(false)

const newPilot = ref({
  fullName: '',
  permanentNumber: '',
  dateOfBirth: '',
  nationality: ''
})

const editedPilot = ref({})
let nextId = 1

const filteredDrivers = computed(() => {
  const allDrivers = [...drivers.value, ...customPilots.value]
  return allDrivers.filter(driver => {
    const name = `${driver.givenName || driver.name} ${driver.familyName || ''}`.toLowerCase()
    return name.includes(searchTerm.value.toLowerCase())
  })
})

const columns = [
  {
    name: 'name',
    label: 'Nombre',
    required: true,
    align: 'left',
    field: row => row
  },
  {
    name: 'actions',
    label: 'Acciones',
    align: 'right',
    field: 'actions'
  }
]

function addPilot() {
  if (newPilot.value.fullName && newPilot.value.permanentNumber) {
    const [givenName, ...rest] = newPilot.value.fullName.trim().split(' ')
    const familyName = rest.join(' ') || ''
    const fullId = `${givenName}${familyName}`.toLowerCase()

    customPilots.value.push({
      driverId: `custom-${fullId}-${nextId++}`,
      givenName,
      familyName,
      permanentNumber: newPilot.value.permanentNumber,
      dateOfBirth: newPilot.value.dateOfBirth,
      nationality: newPilot.value.nationality,
      isCustom: true
    })

    // Limpiar formulario
    newPilot.value = {
      fullName: '',
      permanentNumber: '',
      dateOfBirth: '',
      nationality: ''
    }
  }
}

function editPilot(pilot) {
  editedPilot.value = { ...pilot }
  editDialog.value = true
}

function saveEditedPilot() {
  const index = customPilots.value.findIndex(p => p.driverId === editedPilot.value.driverId)
  if (index !== -1) {
    customPilots.value[index] = { ...editedPilot.value }
  }
  editDialog.value = false
}

function deletePilot(id) {
  customPilots.value = customPilots.value.filter(p => p.driverId !== id)
}

onMounted(loadDrivers)
</script>
