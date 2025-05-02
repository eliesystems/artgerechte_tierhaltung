<template>
    <div class="manrope-brown mb-2 mt-8">
        {{ question }}
    </div>
    <div class="flex">
        <div class="flex-2/3">
            <select v-model="selectedAnswer" class="dropdown appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none">
                <option disabled value="">Bitte ein Bundesland auswählen</option>
                <option v-for="(option, index) in options" :key="index" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>
        <div class="flex-1/3">
            <slot name="extraContent">
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps({
    question: {
        type: String,
        default: '',
    },
    options: {
        type: Array as () => { label: string; value: string }[],
        default: () => [],
    },
});

const selectedAnswer = ref('');
</script>