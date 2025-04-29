<template>
    <QuestionaireCard topic-name="Ausläufe">
        <template #content>
            <Radio
                question="Haben alle Pferde täglich freie Bewegung im Auslauf?"
                question-key="RF_025"
                :answer-store="answerStore"
                :options="[
                    { label: 'Ja, außerhalb der Vegetationszeit', value: 'outside_growing_season' },
                    { label: 'Ja, ganzjährig', value: 'yes_always' },
                    { label: 'Nein', value: 'no' }
                ]" />
            <MultipleChoice
                v-if="selectedDailyMovement !== 'no'"
                question="Wie lange haben die Pferde täglich die Möglichkeit zur freien Bewegung auf dem Auslauf?"
                question-key="RF_026"
                :answer-store="answerStore"
                :options="[
                    { label: 'Dauerhaft im Sommer', value: 'summer' },
                    { label: 'Dauerhaft im Winter', value: 'winter' },
                    { label: 'Mehr als 2 Stunden', value: 'more_than_two' },
                    { label: 'Weniger als 2 Stunden', value: 'less_than_two' },
                    { label: 'Kein freie Bewegung täglich', value: 'no_movement' }
                ]" />
            <Radio
                question="Sind die Pferde einzeln oder in Gruppen auf dem Auslauf?"
                question-key="RF_027"
                :answer-store="answerStore"
                :options="[
                    { label: 'Immer in einer festen Gruppe (mehr als 2 Pferde)', value: 'regular_group' },
                    { label: 'Teilweise in festen Gruppen', value: 'mostly_in_group' },
                    { label: 'Teilweise alleine', value: 'mostly_alone' },
                    { label: 'Immer einzeln', value: 'always_alone' },
                    { label: 'Immer in wechselnder Gruppenzusammensetzung', value: 'always_changing_group' }
                ]" />
            <MultipleChoice
                question="Welche Form haben die Ausläufe?"
                question-key="RF_028"
                :answer-store="answerStore"
                :options="[
                    { label: 'Rund', value: 'round' },
                    { label: 'Quadratisch', value: 'square' },
                    { label: 'Rechteckig', value: 'rectangle' },
                    { label: 'Unregelmäßige Form', value: 'irregular' }
                ]" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import QuestionaireCard from '../common/QuestionaireCard.vue';
import MultipleChoice from '../questions/MultipleChoice.vue';
import Radio from '../questions/Radio.vue';

const props = defineProps({
    answerStore: {
        type: Object,
        required: true,
    }
});

const selectedDailyMovement = computed(() => props.answerStore.getAnswerByKey('RF_025') ?? 'no');
</script>