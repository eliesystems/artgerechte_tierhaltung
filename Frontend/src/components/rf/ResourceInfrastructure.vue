<template>
    <QuestionaireCard topic-name="Infrastruktur">
        <template #content>
            <MultipleChoice
                question="Wie sind die Pferde untergebracht?"
                question-key="RF_008"
                :options="options"
                :answer-store="answerStore" />
            <Text
                v-for="(choice, index) in selectedHousing" :key="`RF_009_${index}`"
                :question="`Wie viele Pferde befinden sich in ${getLabel(choice)}?`"
                :question-key="`RF_009_${choice}`"
                input-type="number"
                placeholder-text="Anzahl der Pferde"
                :answer-store="answerStore" />
            <Text
                v-for="(choice, index) in selectedHousing" :key="`RF_010_${index}`"
                :question="`Wie viele freie Plätze gibt es in ${getLabel(choice)}?`"
                :question-key="`RF_010_${choice}`"
                input-type="number"
                placeholder-text="Anzahl der freien Plätze"
                :answer-store="answerStore" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import MultipleChoice from '../questions/MultipleChoice.vue';
import { computed } from 'vue'
import Text from '../questions/Text.vue';

const props = defineProps({
    answerStore: {
        type: Object,
        required: true,
    },
})

const options = [
    { label: 'Einzelboxenhaltung', value: 'individual_stabling' },
    { label: 'Gruppenhaltung', value: 'group_housing' },
    { label: 'Weidehaltung saisonal in der Vegetationsperiode', value: 'seasonal_pasture' },
    { label: 'Weidehaltung ganzjährig', value: 'year_round_pasture' }
];

const selectedHousing = computed(() => props.answerStore.getAnswerByKey('RF_008_1') ?? []);

function getLabel(value: string) {
  const option = options.find(opt => opt.value === value);
  return option?.label ?? value;
}

</script>
