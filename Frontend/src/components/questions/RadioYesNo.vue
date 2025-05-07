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
    <div v-if="info !== ''" class="mt-2 flex">
        <span class="material-symbols-outlined text-blue-600 mr-1">
            info
        </span>
        <div class="text-gray-700 text-sm whitespace-pre-line">
            <div :class="!showFullInfo ? 'line-clamp-1' : ''">
                {{ info }}
            </div>
            <button
                @click="showFullInfo = !showFullInfo"
                class="text-blue-500 text-xs mt-1 underline" >
                {{ showFullInfo ? 'Weniger anzeigen' : 'Mehr anzeigen' }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

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

const showFullInfo = ref(false);

const selectedAnswer = computed({
    get: () => props.answerStore.getAnswerByKey(props.questionKey) ?? '',
    set: (newValue) => {
        props.answerStore.saveAnswer(props.questionKey, newValue);
    },
});
</script>