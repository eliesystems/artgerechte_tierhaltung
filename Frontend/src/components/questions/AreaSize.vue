<template>
    <div class="manrope-brown mb-2 mt-8">
        {{ question }}
    </div>
    <div v-for="index in areaCount" :key="index" class="flex flex-col md:flex-row mb-4 gap-2">
        <Text
            :question-key="`${questionKey}_${index}`"
            :answer-store="answerStore"
            input-type="text"
            placeholder-text="Name der Fläche" />
        <Text
            :question-key="`${questionKey}_${index}_1`"
            :answer-store="answerStore"
            input-type="number"
            placeholder-text="Fläche in Quadratmetern" />
    </div>
</template>

<script setup lang="ts">
import Text from './Text.vue';
import { ref, watch } from 'vue';

const props = defineProps({
    question: {
        type: String,
        default: '',
    },
    questionKey: {
        type: String,
        required: true,
    },
    areaCount: {
        type: Number,
        default: 0,
    },
    answerStore: {
        type: Object,
        required: true,
    },
});

const previousCount = ref(props.areaCount);

watch(() => props.areaCount, (newCount, oldCount) => {
    if (newCount < oldCount) {
        for (let i = oldCount; i > newCount; i--) {
            props.answerStore.deleteAnswer(`${props.questionKey}_${i}`);
            props.answerStore.deleteAnswer(`${props.questionKey}_${i}_1`);
        }
    }
    previousCount.value = newCount;
});
</script>