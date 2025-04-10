<template>
    <div class="manrope-brown mb-2 mt-8">
        {{ question }}
    </div>
    <div class="flex flex-wrap">
        <label class="roboto-answers mr-6">
            <input
                type="radio"
                value="yes"
                v-model="selectedAnswer"
                class="accent-black">
            Ja
        </label>
        <label class="roboto-answers mr-6">
            <input
                type="radio"
                value="no"
                v-model="selectedAnswer"
                class="accent-black">
            Nein
        </label>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    question: {
        type: String,
        default: '',
    },
    questionKey: {
        type: String,
        required: true,
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
    },
});
</script>