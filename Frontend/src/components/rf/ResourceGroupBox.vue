<template>
    <QuestionaireCard topic-name="Gruppenhaltung">
        <template #content>
            <MultipleChoice
                question="Welche Formen der Gruppenhaltung gibt es?"
                question-key="RF_013"
                :options="options"
                :answer-store="answerStore" />
            <Text
                v-for="(choice, index) in selectedForms" :key="`RF_014_${index}`"
                :question="`Wie viele Pferde sind in ${getLabel(choice)} untergebracht?`"
                :question-key="`RF_014_${choice}`"
                input-type="number"
                placeholder-text="Anzahl der Pferde in der Haltungsform"
                :answer-store="answerStore" />
            <RadioYesNo
                question="Können kranke oder verletzte Pferde separat aber mit Sichtkontakt zu Artgenossen untergebracht werden?"
                question-key="RF_015"
                :answer-store="answerStore" />
            <RadioYesNo
                question="Gibt es einen separaten Integrationsbereich?"
                question-key="RF_016"
                :answer-store="answerStore" />
            <Textarea
                v-if="selectedAnswer === 'yes'"
                question="Wie ist der Integrationsbereich gestaltet?"
                question-key="RF_017"
                placeholder-text="Bitte beschreiben Sie den Integrationsbereich kurz."
                :answer-store="answerStore" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import MultipleChoice from '../questions/MultipleChoice.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';
import Text from '../questions/Text.vue';
import Textarea from '../questions/Textarea.vue';

import { computed, watch } from 'vue';

const props = defineProps({
    answerStore: {
        type: Object,
        required: true,
    },
});

const selectedAnswer = computed(() => props.answerStore.getAnswerByKey('RF_016') ?? '');
const selectedForms = computed(() => props.answerStore.getAnswerByKey('RF_013_1') ?? []);

const options = [
    { label: 'Innenlaufstall', value: 'indoor_loose_housing' },
    { label: 'Außenlaufstall', value: 'outdoor_loose_housing' },
    { label: 'Bewegungsstall', value: 'active_stable' },
    { label: 'Weidehaltung', value: 'pasture_housing' }
];

function getLabel(value: string) {
  const option = options.find(opt => opt.value === value);
  return option?.label ?? value;
};

watch(selectedAnswer, (newValue) => {
	if (newValue === 'no') {
		props.answerStore.deleteAnswer('RF_017');
	}
});

</script>