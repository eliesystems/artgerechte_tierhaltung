<template>
    <div v-if="question !== ''" class="manrope-brown mb-2 mt-8">
        {{ question }}
    </div>
    <input
        :type="inputType"
        class="mt-2 appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none"
        :placeholder="placeholderText"
        v-model="inputValue"
        @input="preventNegative">
    <Info :info="info" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Info from './Info.vue';

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
    inputType: {
        type: String,
        default: 'text',
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

const inputValue = computed({
    get: () => props.answerStore.getAnswerByKey(props.questionKey) ?? '',
    set: (newValue) => {
		props.answerStore.saveAnswer(props.questionKey, newValue);
    }
});

const preventNegative = (event: Event) => {
    if (props.inputType === 'number') {
        const target = event.target as HTMLInputElement;
        let value = parseFloat(target.value);
        if (isNaN(value) || value < 0) {
            value = 0;
        }
        inputValue.value = value;
    }
};

</script>