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
</template>

<script setup lang="ts">
import { computed } from "vue";
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
    },
});

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