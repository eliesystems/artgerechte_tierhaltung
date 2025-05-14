<template>
    <QuestionaireCard topic-name="Ausläufe">
        <template #content>
            <Radio
                question="Haben alle Pferde täglich freie Bewegung im Auslauf oder der Weide?"
                question-key="RF_025"
                :answer-store="answerStore"
                :options="[
                    { label: 'Ja, nur während der Vegetationszeit', value: 'yes_seasonal' },
                    { label: 'Ja, ganzjährig', value: 'yes_year_round' },
                    { label: 'Nein', value: 'no' }
                ]"
                info="Unter Auslaufflächen sind alle Flächen zu verstehen, die für die freie Bewegung vorgesehen sind. Dazu zählen z.B. befestigte und unbefestigte Flächen mit einer Mindestgröße von 150m2. Die Auslaufflächen dienen der freien Bewegung, sozialen Interaktion, dem Ausleben des natürlichen Verhaltens (wie Wälzen, Spielen, Ruhen) und dem Aufenthalt an der frischen Luft." />
            <Radio
                v-if="selectedDailyMovement !== 'no'"
                question="Wie lange haben die Pferde täglich die Möglichkeit zur freien Bewegung auf dem Auslauf oder der Weide?"
                question-key="RF_026"
                :answer-store="answerStore"
                :options="[
                    { label: 'Weniger als 2 Stunden pro Tag', value: 'less_than_2h' },
                    { label: '2 - 4 Stunden pro Tag', value: '2_to_4h' },
                    { label: 'Mehr als 4 Stunden pro Tag', value: 'more_than_4h' },
                    { label: '24h täglich (dauerhafter Zugang zum Auslauf)', value: '24h_access' }
                ]" />
            <MultipleChoice
                question="Sind die Pferde einzeln oder in Gruppen auf dem Auslauf?"
                question-key="RF_027"
                :answer-store="answerStore"
                :options="[
                    { label: 'Immer in einer festen Gruppe (mehr als 2 Pferde)', value: 'fixed_group' },
                    { label: 'Immer einzeln', value: 'always_alone' },
                    { label: 'Immer in wechselnder Gruppenzusammensetzung', value: 'changing_groups' },
                    { label: 'Teilweise in festen Gruppen', value: 'partly_fixed_group' },
                    { label: 'Teilweise alleine', value: 'partly_alone' }
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