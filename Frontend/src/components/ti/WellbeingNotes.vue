<template>
    <QuestionaireCard topic-name="Notizen">
        <template #content>
            <Textarea
                question="Hier können Sie sich noch Notizen machen: "
                question-key="TI_notes"
                :answer-store="answerStore" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import Textarea from '../questions/Textarea.vue';


defineProps({
    answerStore: {
        type: Object,
        required: true,
    },
});
</script>