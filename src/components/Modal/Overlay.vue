<template>
    <div class="overlay_container">
       <slot />
    </div>
</template>

<style scoped>
    .overlay_container{
        @apply fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center transition-all duration-300 ease-in-out overflow-y-hidden
    }
</style>