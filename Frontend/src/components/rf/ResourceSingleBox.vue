<template>
    <QuestionaireCard topic-name="Einzelboxenhaltung">
        <template #content>
            <MultipleChoice
                question="Welche Formen der Einzelhaltung gibt es?"
                question-key="RF_011"
                :options="options"
                :store="resourceStore" />
            <Text
                v-for="(choice, index) in selectedChoices" :key="`RF_012_${index}`"
                :question="`Wie viele Pferde befinden sich in ${getLabel(choice)}`"
                :question-key="`RF_012_${index}`"
                input-type="number"
                placeholder-text="Anzahl der Pferde in der Haltungsform"
                :store="resourceStore" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import Text from '../questions/Text.vue'
import MultipleChoice from '../questions/MultipleChoice.vue';

import { computed } from 'vue';

const props = defineProps({
    resourceStore: {
        type: Object,
        required: true,
    },
});

const selectedChoices = computed(() => props.resourceStore.getAnswerByKey('RF_011_1') ?? []);

const options = [
    { label: 'Innenboxen', value: 'indoor_boxes' },
    { label: 'Außenboxen', value: 'outdoor_boxes' },
    { label: 'Außenboxen mit Kleinauslauf/Paddockbox', value: 'outdoor_paddock_boxes' },
    { label: 'Andere', value: 'other' }
];

function getLabel(value: string) {
  const option = options.find(opt => opt.value === value);
  return option?.label ?? value;
};
</script>