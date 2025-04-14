<template>
    <QuestionaireCard topic-name="Infrastruktur">
        <template #content>
            <MultipleChoice
                question="Wie sind die Pferde untergebracht?"
                question-key="RF_008"
                :options="options"
                :store="resourceStore" />
            <Text
                v-for="(choice, index) in selectedHousing" :key="`RF_009_${index}`"
                :question="`Wie viele Pferde befinden sich in ${getLabel(choice)}?`"
                :question-key="`RF_009_${choice}`"
                input-type="number"
                placeholder-text="Anzahl der Pferde"
                :store="resourceStore" />
            <Text
                v-for="(choice, index) in selectedHousing" :key="`RF_010_${index}`"
                :question="`Wie viele freie Plätze gibt es in ${getLabel(choice)}?`"
                :question-key="`RF_010_${choice}`"
                input-type="number"
                placeholder-text="Anzahl der freien Plätze"
                :store="resourceStore" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import MultipleChoice from '../questions/MultipleChoice.vue';
import { computed } from 'vue'
import Text from '../questions/Text.vue';
import { useResourceStore } from '@/stores/resourceStore';

defineProps({
    resourceStore: {
        type: Object,
        required: true,
    },
})

const resourceStore = useResourceStore();

const options = [
    { label: 'Einzelboxenhaltung', value: 'individual_stabling' },
    { label: 'Gruppenhaltung', value: 'group_housing' },
    { label: 'Weidehaltung saisonal in der Vegetationsperiode', value: 'seasonal_pasture' },
    { label: 'Weidehaltung ganzjährig', value: 'year_round_pasture' }
];

const selectedHousing = computed(() => resourceStore.getAnswerByKey('RF_008_1') ?? []);

function getLabel(value: string) {
  const option = options.find(opt => opt.value === value);
  return option?.label ?? value;
}

</script>
