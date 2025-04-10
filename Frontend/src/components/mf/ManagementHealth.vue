<template>
    <QuestionaireCard topic-name="Gesundheitsmanagement">
        <template #content>
            <RadioYesNo
                question="Gibt es ein organisiertes Entwurmungsmanagement?"
                question-key="MF_042"
                :store="managementStore" />
            <MultipleChoice
                v-if="worms === 'yes'"
                question="Wie sieht dieses Entwurmungsmanagement aus?"
                question-key="MF_043"
                :store="managementStore"
                :options="[
                    { label: 'Wird durch die Pferdebesitzer organisiert', value: 'organized_by_horse_owner' },
                    { label: 'Durch die Betriebsleitung ausgeführt - bestandsweise und zeitgleich', value: 'executed_by_farm_management_stock_based_simultaneous' },
                    { label: '2x jährlich', value: 'twice_annually' },
                    { label: '3-4x jährlich', value: 'three_to_four_times_annually' },
                    { label: 'Selektives Entwurmungsmanagement', value: 'selective_deworming_management' }
                ]" />
            <MultipleChoice
                question="Werden alle Pferde regelmäßig immunisiert (z. B. Tetanus, Influenza)?"
                question-key="MF_044"
                :store="managementStore"
                :options="[
                    { label: 'Ja, Dokumentation der Impfungen', value: 'yes_vaccination_documentation' },
                    { label: 'Nein, ohne Kontrolle', value: 'no_no_control' },
                    { label: 'Wird durch die Pferdebesitzer organisiert', value: 'organized_by_horse_owner' },
                    { label: 'Bestandsweise und zeitgleich', value: 'stock_based_simultaneous' }
                ]" />
            <Radio
                question="Erfolgt eine jährliche Zahnkontrolle der Pferde?"
                question-key="MF_045"
                :store="managementStore"
                :options="[
                    { label: 'Ja, wird durch die Pferdebesitzer organisiert', value: 'yes_organized_by_horse_owner' },
                    { label: 'Ja, wird durch die Betriebsleitung ausgeführt', value: 'yes_executed_by_farm_management' },
                    { label: 'Nein', value: 'no' }
                ]" />
            <RadioYesNo
                question="Wird alle ca. 6-8 Wochen eine Hufpflege durchgeführt?"
                question-key="MF_046"
                :store="managementStore" />
            <RadioYesNo
                question="Werden neue Pferde schrittweise in die Herde integriert?"
                question-key="MF_047"
                :store="managementStore" />
            <RadioYesNo
                question="Gibt es eine Dokumentation des Gesundheitsmanagements?"
                question-key="MF_048"
                :store="managementStore" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import QuestionaireCard from '../common/QuestionaireCard.vue';
import MultipleChoice from '../questions/MultipleChoice.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';
import Radio from '../questions/Radio.vue';

const props = defineProps({
    managementStore: {
        type: Object,
        required: true,
    },
})

const worms = computed(() => props.managementStore.getAnswerByKey('MF_042') ?? '');
</script>