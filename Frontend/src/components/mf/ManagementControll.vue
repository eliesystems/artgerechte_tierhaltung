<template>
    <QuestionaireCard topic-name="Tierkontrolle">
        <template #content>
            <RadioYesNo
                question="Wird eine tägliche Tierkontrolle durchgeführt? (z.B. morgendliche Kontrolle beim Füttern der Pferde, Rausbringen auf den Auslauf/die Weide, Reinholen von dem Auslauf/der Weide, …)"
                question-key="MF_038"
                :store="managementStore" />
            <RadioYesNo
                question="Gibt es eine Dokumentation der täglichen Tierkontrollen?"
                question-key="MF_039"
                :store="managementStore" />
            <RadioYesNo
                question="Wird das Haltungsumfeld aller Pferde täglich auf Funktionalität und Verletzungsrisiken kontrolliert?"
                question-key="MF_040"
                :store="managementStore" />
            <RadioYesNo
                question="Gibt es eine Dokumentation der täglichen Kontrollen des Haltungsumfeldes?"
                question-key="MF_041"
                :store="managementStore" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';


defineProps({
    managementStore: {
        type: Object,
        required: true,
    },
});
</script>