<template>
    <div class="manrope-brown mb-2 mt-8">
        {{ question }}
    </div>
    <div class="flex flex-wrap">
        <label v-for="(option, index) in options" :key="index" class="roboto-answers mr-6">
            <input
                type="radio"
                :value="option.value"
                v-model="selectedAnswer"
                class="accent-black">
                {{ option.label }}
        </label>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    question: {
        type: String,
        default: ''
    },
    questionKey: {
        type: String,
        required: true,
    },
    options: {
        type: Array as () => { label: String, value: String}[],
        default: () => []
    },
    store: {
        type: Object,
        required: true,
    },
});

const selectedAnswer = computed({
    get: () => props.store.getAnswerByKey(props.questionKey) ?? '',
    set: (newValue) => {
        props.store.saveAnswer(props.questionKey, newValue);
    }
});
</script>