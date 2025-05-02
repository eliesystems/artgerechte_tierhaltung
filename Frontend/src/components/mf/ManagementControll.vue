<template>
    <QuestionaireCard topic-name="Tierkontrolle">
        <template #content>
            <RadioYesNo
                question="Wird eine tägliche Tierkontrolle durchgeführt? (z.B. morgendliche Kontrolle beim Füttern der Pferde, Rausbringen auf den Auslauf/die Weide, Reinholen von dem Auslauf/der Weide, …)"
                question-key="MF_038"
                :answer-store="answerStore" />
            <RadioYesNo
                question="Gibt es eine Dokumentation der täglichen Tierkontrollen?"
                question-key="MF_039"
                :answer-store="answerStore" />
            <RadioYesNo
                question="Wird das Haltungsumfeld aller Pferde täglich auf Funktionalität und Verletzungsrisiken kontrolliert?"
                question-key="MF_040"
                :answer-store="answerStore" />
            <RadioYesNo
                question="Gibt es eine Dokumentation der täglichen Kontrollen des Haltungsumfeldes?"
                question-key="MF_041"
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