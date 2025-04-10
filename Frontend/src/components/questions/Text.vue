<template>
    <div v-if="question !== ''" class="manrope-brown mb-2 mt-8">
        {{ question }}
    </div>
    <input
        :type="inputType"
        class="mt-2 appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none"
        :placeholder="placeholderText"
        v-model="inputValue">
        
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
    inputType: {
        type: String,
        default: 'text',
    },
    store: {
        type: Object,
        required: true,
    },
});

const inputValue = computed({
    get: () => props.store.getAnswerByKey(props.questionKey) ?? '',
    set: (newValue) => {
		props.store.saveAnswer(props.questionKey, newValue);
    }
});

</script>