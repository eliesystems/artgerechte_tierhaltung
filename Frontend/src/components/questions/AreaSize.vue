<template>
    <div class="manrope-brown mb-2 mt-8">
        {{ question }}
    </div>
    <div v-for="index in areaCount" :key="index" class="flex items-center">
        {{ index }}.
        <input
            type="radio"
            class="accent-black ml-2"
            v-model="selectedOption[index]"
            :value="'first'">
        <input
            type="number"
            v-model="areaValues[index][0]"
            class="mx-2 my-2 appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none"
            placeholder="Fläche in Quadratmetern"
            :disabled="selectedOption[index] === 'second'"
            :class="{ 'border-gray-300': selectedOption[index] === 'second', 'border-gray-700': selectedOption[index] !== 'second'}">
        oder
        <input
            type="radio"
            class="accent-black ml-2"
            v-model="selectedOption[index]"
            :value="'second'">
        <input
            type="number"
            v-model="areaValues[index][1]"
            class="mx-2 my-2 appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none"
            placeholder="z.B. 100"
            :disabled="selectedOption[index] === 'first'"
            :class="{ 'border-gray-300': selectedOption[index] === 'first', 'border-gray-700': selectedOption[index] !== 'first'}">
        x
        <input
            type="number"
            v-model="areaValues[index][2]"
            class="mx-2 my-2 appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none"
            placeholder="z.B. 100"
            :disabled="selectedOption[index] === 'first'"
            :class="{ 'border-gray-300': selectedOption[index] === 'first', 'border-gray-700': selectedOption[index] !== 'first'}">
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    question: {
        type: String,
        default: '',
    },
    questionKey: {
        type: String,
        required: true,
    },
    areaCount: {
        type: Number,
        default: 0,
    },
    store: {
        type: Object,
        required: true,
    },
});

const selectedOption = ref<{ [key: number]: string}>({});
const areaValues = ref<{ [key: number]: number[] }>({});

watch(() => props.areaCount, (newCount, oldCount) => {
    if (oldCount !== undefined && oldCount > newCount) {
        for (let i = newCount + 1; i <= oldCount; i++) {
            const key = `${props.questionKey}_${i}`;
            props.store.deleteAnswer(key);
            delete areaValues.value[i]; // Remove unused values
        }
    }

    for (let i = 1; i <= newCount; i++) {
        if (!selectedOption.value[i]) {
            selectedOption.value[i] = "first"; 
        }
        if (!areaValues.value[i]) {
            areaValues.value[i] = [0, 0]; // Initialize as an array with default values
        }
    }
}, { immediate: true });


const saveAnswers = () => {
    for (let i = 1; i <= props.areaCount; i++) {
        const key = `${props.questionKey}_${i}`;
        
        // Save the selected answer based on the radio button choice
        if (selectedOption.value[i] === 'first') {
            const areaValue = areaValues.value[i]?.[0];
            if (areaValue !== undefined) {
                props.store.saveAnswer(key, areaValue);  // Save single value
            }
        }

        if (selectedOption.value[i] === 'second') {
            const width = areaValues.value[i]?.[1];
            const height = areaValues.value[i]?.[2];
            if (width !== undefined && height !== undefined) {
                props.store.saveAnswer(key, [width, height]);  // Save array of values
            }
        }
    }
};

watch([areaValues, selectedOption], saveAnswers, { deep: true });
</script>