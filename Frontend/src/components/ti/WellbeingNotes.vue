<template>
    <QuestionaireCard topic-name="Notizen">
        <template #content>
            <Textarea
                question="Hier können Sie sich noch Notizen machen: "
                question-key="TI_notes"
                :store="wellbeingStore" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import Textarea from '../questions/Textarea.vue';


defineProps({
    wellbeingStore: {
        type: Object,
        required: true,
    },
});
</script>