<template>
    <QuestionaireCard topic-name="Stallboden und Einstreu">
        <template #content>
            <RadioYesNo
                question="Ist die Liegefläche trocken und verformbar?"
                question-key="RF_035"
                :store="resourceStore" />
            <MultipleChoice
                question="Wie ist die Liegefläche gestaltet?"
                question-key="RF_036"
                :store="resourceStore"
                placeholder-text="Bitte beschreiben Sie kurz die Liegefläche im Ruhebereich. "
                :options="[
                    { label: 'Betonboden oder vergleichbares', value: 'concrete_or_similar' },
                    { label: 'Gummimatten', value: 'rubber_mats' },
                    { label: 'Softbetten', value: 'soft_beds' },
                    { label: 'Naturboden', value: 'natural_floor' },
                    { label: 'Anders', value: 'other' }
                ]" />
            <RadioYesNo
                question="Wird auf der Liegefläche eine Einstreu verwendet?"
                question-key="RF_037"
                :store="resourceStore" />
            <MultipleChoice
                v-if="selectedLitter === 'yes'"
                question="Welche Art von Einstreu wird genutzt?"
                question-key="RF_038"
                :store="resourceStore"
                :options="[
                    { label: 'Stroh', value: 'straw' },
                    { label: 'Strohpellets', value: 'straw_pellets' },
                    { label: '(Hobel-)Späne', value: 'wood_shavings' },
                    { label: 'Holzpellets', value: 'wood_pellets' },
                    { label: 'Hackschnitzel', value: 'wood_chips' },
                    { label: 'Leinstroh', value: 'flax_straw' },
                    { label: 'Hanfeinstreu', value: 'hemp_litter' },
                    { label: 'Papiereinstreu', value: 'paper_litter' },
                    { label: 'Waldboden', value: 'forest_floor' },
                    { label: 'Holz-Sandgemisch', value: 'wood_sand_mixture' },
                    { label: 'Miscanthus', value: 'miscanthus' },
                    { label: 'Sand', value: 'sand' },
                    { label: 'Andere Einstreu', value: 'other_litter' }
                ]" />
            <RadioYesNo
                question="Ist die verwendete Einstreu jederzeit gesundheitlich unbedenklich (z.B. schimmelfreies Stroh, unbedenkliches Schreddergut)?"
                question-key="RF_039"
                :store="resourceStore" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import QuestionaireCard from '../common/QuestionaireCard.vue';
import MultipleChoice from '../questions/MultipleChoice.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';

const props = defineProps({
    resourceStore: {
        type: Object,
        required: true,
    },
});

const selectedLitter = computed(() => props.resourceStore.getAnswerByKey('RF_037') ?? '');
</script>