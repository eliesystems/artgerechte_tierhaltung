<template>
    <QuestionaireCard topic-name="Stallklima und Lichtverhältnisse">
        <template #content>
            <RadioYesNo
                question="Reicht das Tages- oder Kunstlicht im Stall aus, um ohne zusätzliche Lichtquelle entspannt eine Zeitung zu lesen?"
                question-key="RF_032"
                :answer-store="answerStore" />
            <RadioYesNo
                question="Entspricht die Stalltemperatur ungefähr der Außentemperatur?"
                question-key="RF_033"
                :answer-store="answerStore" />
            <RadioYesNo
                question="Ist Ammoniakgeruch im Tierbereich wahrnehmbar?"
                question-key="RF_034"
                :answer-store="answerStore" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';

defineProps({
    answerStore: {
        type: Object,
        required: true,
    },
});
</script>