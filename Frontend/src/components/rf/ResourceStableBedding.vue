<template>
    <QuestionaireCard topic-name="Stallboden und Einstreu">
        <template #content>
            <RadioYesNo
                question="Werden im Stallbereich der Pferde ganz oder teilweise Spaltenböden verwendet?"
                question-key="RF036-1"
                :answer-store="answerStore" />
            <MultipleChoice
                question="Wie ist die Liegefläche gestaltet?"
                question-key="RF_036"
                :answer-store="answerStore"
                placeholder-text="Bitte beschreiben Sie kurz die Liegefläche im Ruhebereich. "
                :options="[
                    { label: 'Betonboden oder vergleichbares', value: 'concrete_or_similar' },
                    { label: 'Gummimatten', value: 'rubber_mats' },
                    { label: 'Softbetten', value: 'soft_bedding' },
                    { label: 'Naturboden (z.B Sand, Grasnarbe)', value: 'natural_ground' },
                    { label: 'Anderes', value: 'other' }
                ]" />
            <RadioYesNo
                question="Ist die Liegefläche trocken und verformbar?"
                question-key="RF_035"
                :answer-store="answerStore" />
            <RadioYesNo
                v-if="selectedLyingArea.includes('natural_ground')"
                question="Wird auf der Liegefläche eine Einstreu verwendet?"
                question-key="RF_037"
                :answer-store="answerStore" />
            <MultipleChoice
                v-if="selectedLitter === 'yes'"
                question="Welche Art von Einstreu wird genutzt?"
                question-key="RF_038"
                :answer-store="answerStore"
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
                v-if="!selectedLyingArea.includes('natural_ground')"
                question="Ist die verwendete Einstreu jederzeit gesundheitlich unbedenklich (z.B. schimmelfreies Stroh, Grünkompost)?"
                question-key="RF_039"
                :answer-store="answerStore" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import QuestionaireCard from '../common/QuestionaireCard.vue';
import MultipleChoice from '../questions/MultipleChoice.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';

const props = defineProps({
    answerStore: {
        type: Object,
        required: true,
    },
});

const selectedLyingArea = computed(() => props.answerStore.getAnswerByKey('RF_036_1') ?? []);
const selectedLitter = computed(() => props.answerStore.getAnswerByKey('RF_037') ?? '');
</script>