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
                @change="updateAnswer"
                class="accent-black">
                {{ option.label }}
        </label>
    </div>
    <Text
        v-if="selectedAnswer === 'other'"
        :input-type=inputType
        :question-key="questionKey + '_1'"
        :placeholder-text=placeholderText
        :answer-store="answerStore" />
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
import Text from "./Text.vue";

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
    answerStore: {
        type: Object,
        required: true,
    },
    placeholderText: {
        type: String,
        default: '',
    },
    inputType: {
        type: String,
        default: '',
    },    info: {
        type: String,
        default: '',
    },
});

const showFullInfo = ref(false);

const updateAnswer = () => {
    if(selectedAnswer.value !== 'other') {
        props.answerStore.deleteAnswer(props.questionKey + "_1");
    }
}

const selectedAnswer = computed({
    get: () => props.answerStore.getAnswerByKey(props.questionKey) ?? '',
    set: (newValue: string) => {
        props.answerStore.saveAnswer(props.questionKey, newValue);
    }
});
</script>