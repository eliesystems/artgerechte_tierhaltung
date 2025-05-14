<template>
    <div class="manrope-brown mb-2 mt-8">
        {{ question }}
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-1">
        <label v-for="(option, index) in options" :key="index" class="roboto-answers mr-6">
            <input
                type="checkbox"
                :value="option.value"
                v-model="selectedAnswers"
                class="accent-black accent"
            >
            {{ option.label }}
        </label>
    </div>
    <Text
        v-if="selectedAnswers.includes('other')"
        input-type="text"
        :question-key="questionKey + 'other'"
        :placeholder-text=placeholderText
        :answer-store="answerStore" />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Text from "./Text.vue";

const props = defineProps({
    question: {
        type: String,
        default: '',
    },
    questionKey: {
        type: String,
        required: true,
    },
    options: {
        type: Array as () => { label: string; value: string }[],
        default: () => [],
    },
    answerStore: {
        type: Object,
        required: true,
    },
    placeholderText: {
        type: String,
        default: ''
    }
});

const selectedAnswers = ref<string[]>(
	props.answerStore.getAnswerByKey(props.questionKey) || []
);

const updateAnswers = () => {
	if (selectedAnswers.value.length > 0) {
    	props.answerStore.saveAnswer(props.questionKey, selectedAnswers.value);
  	} else {
    	props.answerStore.deleteAnswer(props.questionKey);
  	}
	if (!selectedAnswers.value.includes('other')) {
		props.answerStore.deleteAnswer(props.questionKey + "other");
	}
};

watch(selectedAnswers, updateAnswers, { immediate: true });
</script>