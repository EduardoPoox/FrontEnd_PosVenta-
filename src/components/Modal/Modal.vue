<template>
     <TransitionRoot appear :show="modelValue" as="template">
        <Overlay>
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div
                    :class="[{ 'animation-tada': showAnimation }]"
                    class="bg-white w-auto rounded-lg">
                    <div ref="target">
                        <div class="p-4">
                            <h2 class="text-sm">
                                <slot name="header" />
                            </h2>
                        </div>
                        <div class=" min-h-max overflow-y-auto px-4 pb-4">
                            <div>
                                <slot />
                            </div>
                            <div>
                                <slot name="actions" />
                            </div>
                        </div>
                    </div>
                </div>
            </TransitionChild>
        </Overlay>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Overlay from './Overlay.vue'
import { TransitionChild, TransitionRoot} from '@headlessui/vue'
import { onClickOutside } from '@vueuse/core'

interface IProps {
    modelValue : boolean,
    persistent?: boolean
}

const target = ref(null)
const showAnimation = ref(false)
const emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<IProps>(), {
    modelValue: false,
    persistent: false
})


const modelValue = computed({
    get(){
        return props.modelValue;
    },
    set( value: boolean ){
        emit('update:modelValue',value)
    }
})


onClickOutside(target, (event) => {
    if(event){
        showAnimation.value = true
        if(!props.persistent){
            modelValue.value = false
        }

        setTimeout(() => {
            showAnimation.value = false
        }, 500);
    }
})
</script>

<style scoped>

.animation-tada {
    animation: tada-anim 1s ease-in-out;
    transform-origin: center center;
    animation-iteration-count: 1;
}

@keyframes tada-anim {
   0% { transform: rotate( 0.0deg) }
   10% { transform: rotate(1.0deg) }
   20% { transform: rotate(-2.0deg) }
   30% { transform: rotate(1.0deg) }
   40% { transform: rotate(-1.0deg) }
   50% { transform: rotate(1.0deg) }
   60% { transform: rotate( 0.0deg) }
  100% { transform: rotate( 0.0deg) }
}

</style>
