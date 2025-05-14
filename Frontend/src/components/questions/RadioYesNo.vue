<template>
    <div class="manrope-brown mb-2 mt-8">
        {{ question }}
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-1">
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
    <Info :info="info" />
</template>

<script setup lang="ts">
import Info from './Info.vue';
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
    answerStore: {
        type: Object,
        required: true,
    },
    info: {
        type: String,
        default: '',
    },
});

const selectedAnswer = computed({
    get: () => props.answerStore.getAnswerByKey(props.questionKey) ?? '',
    set: (newValue) => {
        props.answerStore.saveAnswer(props.questionKey, newValue);
    },
});
</script>