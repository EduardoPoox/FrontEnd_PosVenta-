<template>
  <div class="card">
    <div>
      <p class="text-xs font-bold">{{ title }}</p>
      <p class="text-xs">{{ subtitle }}</p>
    </div>

    <div class="flex items-center gap-4">
      <p class="text-xs font-bold text-gray-400">{{ trailing }} años</p>
      <div v-if="isLoadingDeleteUser">
        <SVGSpinner class="text-gray-400 animate-spin" />
      </div>
      <button @click="action" v-else class="p-2">
        <SVGTrash class="text-red-400" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import SVGSpinner from "./icons/SVGSpinner.vue";
import SVGTrash from "./icons/SVGTrash.vue";

interface Props {
  title: string;
  subtitle: string;
  trailing: string | number;
  isLoadingDeleteUser: boolean;
  action: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  subtitle: "",
  trailing: "",
  isLoadingDeleteUser: false,
  action: () => {},
});
</script>

<style>
.card {
  @apply w-full md:w-full h-16 bg-gray-50 border rounded-xl mb-2 px-4 flex items-center justify-between hover:shadow-lg hover:shadow-blue-100 hover:transition-all hover:duration-300 hover:-translate-y-1;
}
</style>
