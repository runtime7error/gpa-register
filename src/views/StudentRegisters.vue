<template>
  <div class="h-full">
    <header class="bg-gray-50 w-full h-16 grid px-4 rounded-lg border border-gray-100">
      <div class="flex gap-4 items-center flex-row-reverse">
        <Button
          size="small"
          icon="pi pi-sign-out"
          severity="info"
          text
          rounded
          aria-label="User"
          @click="logout"
        />

        <p v-if="userData">{{ userData.given_name }}</p>
        <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
          <img
            v-if="userData"
            :src="userData.picture"
            alt="Foto de Perfil"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>

    <div
      class="grid place-items-center p-4 rounded-md m-auto mt-8 ring-1 ring-gray-200 bg-white w-max"
    >
      <DataTable
        :value="students"
        tableStyle="min-width: 50rem"
        v-model:selection="selectedStudents"
        :paginator="true"
        :rows="5"
      >
        <template #header>
          <div class="flex justify-between flex-wrap items-center">
            <p>Seus alunos</p>
            <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
              <Button
                label="Novo"
                v-if="isAdmin"
                severity="success"
                class="mr-2"
                @click="openNew"
              />

              <Button
                label="Excluir"
                v-if="isAdmin"
                severity="danger"
                @click="confirmDeleteSelected"
                :disabled="!selectedStudents || !selectedStudents.length"
              />
            </div>
          </div>
        </template>

        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>

        <Column field="name" header="Nome"></Column>
        <Column field="note" header="Nota"></Column>
      </DataTable>

      <Dialog
        v-model:visible="deleteStudentsDialog"
        :style="{ width: '450px' }"
        header="Confirmação"
        :modal="true"
      >
        <div class="confirmation-content">
          <span v-if="student">Tem certeza que deseja excluir o estudante?</span>
        </div>
        <template #footer>
          <Button label="Não" severity="danger" text @click="deleteStudentsDialog = false" />
          <Button label="Sim" severity="success" text @click="deleteSelectedStudents" />
        </template>
      </Dialog>

      <Dialog
        v-model:visible="studentDialog"
        :style="{ width: '450px' }"
        header="Perfil do estudante"
        :modal="true"
        class="p-fluid"
      >
        <div class="grid gap-4">
          <div class="field">
            <label for="name">Nome</label>
            <InputText
              id="name"
              v-model.trim="student.name"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !student.name }"
            />
            <small class="p-error" v-if="submitted && !student.name">O nome é obrigatório</small>
          </div>

          <div class="field">
            <label for="note">Nota</label>

            <InputNumber
              inputId="minmax"
              id="note"
              :min="0"
              :max="100"
              v-model="student.note"
              required="true"
            />
          </div>
        </div>

        <template #footer>
          <Button label="Cancelar" severity="danger" text @click="hideDialog" />
          <Button label="Salvar" severity="success" text @click="saveStudent" />
        </template>
      </Dialog>

      <Toast />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Student } from '../models/Student'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()
const students = ref()
const student = ref({})
const selectedStudents = ref()
const deleteStudentsDialog = ref(false)
const submitted = ref(false)
const studentDialog = ref(false)
const userData = ref(null)
const isAdmin = ref(false)
const admins = ['Morgl', 'Pietro Pacanaro', 'Vinícius Henrique'];

const confirmDeleteSelected = () => {
  deleteStudentsDialog.value = true
}

const deleteSelectedStudents = () => {
  students.value = students.value.filter((val) => !selectedStudents.value.includes(val))
  deleteStudentsDialog.value = false
  selectedStudents.value = null
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Students Deleted', life: 3000 })
}

const openNew = () => {
  student.value = {}
  submitted.value = false
  studentDialog.value = true
}

const saveStudent = () => {
  submitted.value = true

  if (!student.value.name) return

  students.value.push(new Student(student.value.name, student.value.note))
  toast.add({
    severity: 'success',
    summary: 'Successful',
    detail: 'Estudante cadastrado',
    life: 3000
  })

  studentDialog.value = false
  student.value = {}
}

const hideDialog = () => {
  studentDialog.value = false
  submitted.value = false
}

const logout = () => {
  router.push({ path: '/authentication-login' })
}

onMounted(() => {
  const userDataString = router.currentRoute._value.params.id
  const data = JSON.parse(userDataString)
  userData.value = data

  if (admins.includes(data.given_name)) {
    isAdmin.value = true;
  }
})
</script>

<style scoped></style>
