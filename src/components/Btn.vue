<template>
  <button
    :class="[
      {
        red: color === 'red',
      },
    ]"
    class="btn"
  >
    <slot></slot>
    <p v-if="text" class="text-xs text-gray-500">{{ text }}</p>
  </button>
</template>
<script setup lang="ts">
interface Props {
  text: string;
  color?: "default" | "red";
}

const props = withDefaults(defineProps<Props>(), {
  text: "",
});
</script>
<style scoped>
.btn {
  @apply text-sm p-2 border rounded-lg mb-2 flex gap-2 items-center hover:bg-gray-100 hover:shadow-lg hover:shadow-blue-100 hover:transition-all hover:duration-300 hover:-translate-y-1 active:translate-y-0 active:shadow-none active:bg-gray-50;
}

.red {
  @apply border-red-500;
}
</style>
