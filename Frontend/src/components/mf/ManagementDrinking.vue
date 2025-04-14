<template>
    <QuestionaireCard topic-name="Tränkenmanagment">
        <template #content>
            <RadioYesNo
                question="Werden die Tränkeeinrichtungen täglich auf Sauberkeit kontrolliert?"
                question-key="MF_036"
                :store="managementStore" />
            <RadioYesNo
                question="Werden alle Tränkeeinrichtungen täglich auf Funktionalität und Durchflussgeschwindigkeit (ca. 7-15 l/min) kontrolliert?"
                question-key="MF_037"
                :store="managementStore" />
            <RadioYesNo
                question="Wird bei allen Tränkeeinrichtungen regelmäßig die Durchflussgeschwindigkeit (ca. 10-20 l/min) kontrolliert?"
                question-key="MF_037.1"
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