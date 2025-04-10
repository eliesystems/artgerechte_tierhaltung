<template>
    <QuestionaireCard topic-name="Gruppenhaltung" topic-text="Irgendwas...">
        <template #content>
            <MultipleChoice
                question="Welche Formen der Gruppenhaltung gibt es?"
                question-key="RF_013"
                :options="options"
                :store="resourceStore" />
            <Text
                v-for="(choice, index) in selectedChoices" :key="index"
                :question="`Wie viele Pferde sind in ${getLabel(choice)} untergebracht?`"
                question-key="RF_014"
                input-type="number"
                placeholder-text="Anzahl der Pferde in der Haltungsform"
                :store="resourceStore" />
            <RadioYesNo
                question="Können kranke oder verletzte Pferde separat aber mit Sichtkontakt zu Artgenossen untergebracht werden?"
                question-key="RF_015"
                :store="resourceStore" />
            <RadioYesNo
                question="Gibt es einen separaten Integrationsbereich?"
                question-key="RF_016"
                :store="resourceStore" />
            <Text
                v-if="selectedAnswer === 'yes'"
                question="Wie ist der Integrationsbereich gestaltet?"
                question-key="RF_017"
                placeholder-text="Bitte beschreiben Sie den Integrationsbereich kurz."
                input-type="text"
                :store="resourceStore" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import MultipleChoice from '../questions/MultipleChoice.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';
import Text from '../questions/Text.vue';

import { computed, watch } from 'vue';

const props = defineProps({
    resourceStore: {
        type: Object,
        required: true,
    },
});

const selectedAnswer = computed(() => props.resourceStore.getAnswerByKey('RF_016') ?? '');
const selectedChoices = computed(() => props.resourceStore.getAnswerByKey('RF_013') ?? []);

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
		props.resourceStore.deleteAnswer('RF_017');
	}
});

</script>