<template>
  <div class="h-screen bg-white">
    <div class="flex flex-col h-full">
      <div class="w-full px-4 md:p-0 md:w-[600px] mx-auto mt-14">
        <h2 class="text-sm text-gray-700">Catalogo de usuarios</h2>

        <div class="flex justify-end">
          <Btn text="Agregar nuevo usuario" @click="isOpen = true">
            <SVGPlus />
          </Btn>
        </div>
        <template v-if="isLoadingUsers">
          <div class="flex justify-center mt-10">
            <p class="text-sm text-gray-500">cargando...</p>
          </div>
        </template>
        <template v-else>
          <CardContent
            v-for="(item, i) in users"
            :key="item.userId"
            :title="item.userName"
            :subtitle="item.userEmail"
            :trailing="item.userAge"
            :userId="item.userId"
            :isLoadingDeleteUser="item.isLoadingDeleteUser"
            :action="() => handleDelete(item.userId)"
          >
          </CardContent>
        </template>
      </div>
    </div>

    <Modal persistent v-model="isOpen">
      <template v-slot:header>Nuevo usuario</template>
      <div class="w-full md:w-[500px]">
        <div v-if="isLoadingSaveUser">
          <div class="flex justify-center h-52 items-center">
            <p class="text-sm text-gray-500">Guardando...</p>
          </div>
        </div>
        <Form v-else @submit="handlePost">
          <Field
            v-model="name"
            name="Nombre"
            rules="required|max:50"
            v-slot="{ field, errors, handleBlur }"
          >
            <TextField
              v-model="name"
              v-bind="field"
              @blur="handleBlur"
              :errorMessage="errors[0]"
              type="text"
              label="Nombre"
              placeholder="Armando Pérez"
            />
          </Field>

          <Field
            v-model="email"
            name="Correo"
            rules="required|email|max:100"
            v-slot="{ field, errors, handleBlur }"
          >
            <TextField
              v-model="email"
              v-bind="field"
              @blur="handleBlur"
              :errorMessage="errors[0]"
              type="text"
              label="Correo electrónico"
              placeholder="example@example.com"
            />
          </Field>

          <Field
            v-model="age"
            name="Edad"
            rules="required|integer|min_value:1|max_value:150"
            v-slot="{ field, errors, handleBlur }"
          >
            <TextField
              v-model="age"
              v-bind="field"
              @blur="handleBlur"
              :errorMessage="errors[0]"
              type="text"
              label="Edad"
              placeholder="24"
            />
          </Field>

          <div class="flex justify-end gap-2">
            <Btn @click="isOpen = false" text="Cerrar" color="red" />
            <Btn type="submit" text="Guardar" />
          </div>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import SVGPlus from "../components/icons/SVGPlus.vue";
import Btn from "../components/Btn.vue";
import CardContent from "../components/CardContent.vue";
import Modal from "../components/Modal/Modal.vue";
import TextField from "../components/TextField.vue";
import { ref } from "vue";
import { Form, Field } from "vee-validate";
import { useUser } from "../composables/useUser";

const { users, isLoadingUsers, isOpen, saveUser, isLoadingSaveUser, delUser } =
  useUser();

const name = ref("");
const email = ref("");
const age = ref("");

const handlePost = async () => {
  await saveUser({
    userName: name.value,
    userEmail: email.value,
    userAge: Number(age.value),
    userId: 0,
  });
};

const handleDelete = async (id: number) => {
  await delUser(id);
};
</script>
