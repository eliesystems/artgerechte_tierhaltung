<template>
    <div :class="cardClass" class="rounded overflow-hidden shadow-lg bg-white w-auto p-6">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
defineProps({
    cardClass: {
        type: String,
        default: ''
    }
});
</script>