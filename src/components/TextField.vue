<template>
    <div class="flex flex-col">
        <label class="textfield__label">{{ label }}</label>
        <input v-model="modelValue" :readonly="readonly" autocomplete="off" :placeholder="placeholder" :type="type" :class="[{'!border-red-500': errorMessage}]" class="textfield__input" />
        <div class="textfield__container__error__message">
            <span class="textfield__error__message">{{ errorMessage }}</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
    label? : string,
    placeholder?: string,
    modelValue?: string,
    errorMessage?: string,
    type: 'text' | 'password',
    readonly?: boolean
}

const emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<IProps>(), {
    modelValue: '',
    type: 'text',
    readonly: false
})

const modelValue = computed({
    get(){
        return props.modelValue;
    },
    set( text: string ){
        emit('update:modelValue', text )
    }
})

</script>

<style scoped>
    .textfield__label {
        @apply text-xs text-[#7C8286] mb-1;
    }

    .textfield__input{
        @apply h-12 border border-[#D1D3D5] outline-none px-3 p-2 rounded-lg text-sm hover:border-[#01090f] focus:border-blue-500;
    }

    .textfield__error__message {
        @apply text-xs leading-none text-red-500 font-medium;
    }

    .textfield__container__error__message{
        @apply h-5 flex items-center
    }
</style>