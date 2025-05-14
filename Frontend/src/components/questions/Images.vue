<template>
    <div class="manrope-brown mb-2 mt-8">
        {{ question }}
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
            v-for="(image, index) in images"
            :key="index"
            @click="toggleImageSelection(image.value)">
            <div :class="[
                'rounded cursor-pointer transition-transform',
                selectedValues.includes(image.value) ? 'scale-95 border-4 border-red-500' : 'hover:scale-95 hover:shadow-xl'
                ]" >
                <img :src="image.imgUrl" :alt="image.value" class="w-full h-48 object-center">
            </div>
            <div
                @click.stop
                v-if="selectedValues.includes(image.value) && text">
                <Text
                    input-type="number"
                    :question-key="questionKey + image.value"
                    :answer-store="answerStore"
                    placeholder-text="Anzahl der Pferde" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Text from './Text.vue';

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
    images: {
        type: Array as () => { imgUrl: string, value: string}[],
        default: () => [],
    },
    text: {
        type: Boolean,
        default: false,
    }
});

const selectedValues = ref<string[]>(
    props.answerStore.getAnswerByKey(props.questionKey) || []
);

const toggleImageSelection = (value: string) => {
    if (selectedValues.value.includes(value)) {
        selectedValues.value = selectedValues.value.filter(val => val !== value);
        props.answerStore.saveAnswer(props.questionKey, selectedValues.value);
    } else {
        selectedValues.value.push(value);
        props.answerStore.saveAnswer(props.questionKey, selectedValues.value);
    }
};
</script>