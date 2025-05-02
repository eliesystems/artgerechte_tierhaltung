<template>
    <div v-if="question !== ''" class="manrope-brown mb-2 mt-8">
        {{ question }}
    </div>
    <textarea
        class="mt-2 appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none"
        v-model="inputValue"
        :placeholder-text="placeholderText" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    question: {
        type: String,
        default: '',
    },
    questionKey: {
        type: String,
        required: true,
    },
    placeholderText: {
        type: String,
        default: '',
    },
    answerStore: {
        type: Object,
        required: true,
    },
});

const inputValue = computed({
    get: () => props.answerStore.getAnswerByKey(props.questionKey) ?? '',
    set: (newValue) => {
		if (newValue === '') {
			props.answerStore.deleteAnswer(props.questionKey);
		} else {
			props.answerStore.saveAnswer(props.questionKey, newValue);
		}
    }
});
</script>