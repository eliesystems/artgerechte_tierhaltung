<template>
    <div v-if="question !== ''" class="manrope-brown mb-2 mt-8">
        {{ question }}
    </div>
    <input
        :type="inputType"
        class="mt-2 appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none"
        :placeholder="placeholderText"
        v-model="inputValue">
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
import { computed, ref } from 'vue';

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

const showFullInfo = ref(false);

const inputValue = computed({
    get: () => props.answerStore.getAnswerByKey(props.questionKey) ?? '',
    set: (newValue) => {
		props.answerStore.saveAnswer(props.questionKey, newValue);
    }
});

</script>