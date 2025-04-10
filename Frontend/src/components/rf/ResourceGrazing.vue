<template>
    <QuestionaireCard topic-name="Weidehaltung" topic-text="Hi ich bin ein Text">
        <template #content>
            <Radio
                question="Gibt es für alle Pferde Weidegang?"
                question-key="RF_018_1"
                :store="resourceStore"
                :options="[
                    { label: 'Täglich (auch in den Wintermonaten)', value: 'daily_all_year' },
                    { label: 'Während der Vegetationsperiode', value: 'during_vegetation_period' },
                    { label: 'Nein (z.B. aus gesundheitlichen Gründen)', value: 'no_access' }
                ]" />
            <Textarea
                v-if="selectedAnswer === 'no_access'"
                question-key="RF_018_2"
                placeholder-text="Warum nicht?"
                :store="resourceStore" />
            <RadioYesNo
                question="Werden alle Pferde täglich auf der Weide kontrolliert?"
                question-key="RF_019"
                :store="resourceStore" />
            <RadioYesNo
                question="Wird die Weide täglich auf Giftpflanzen kontrolliert?"
                question-key="RF_021"
                :store="resourceStore" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import Radio from '../questions/Radio.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';
import Textarea from '../questions/Textarea.vue';

import { computed } from 'vue';

const props = defineProps({
    resourceStore: {
        type: Object,
        required: true,
    }
});

const selectedAnswer = computed(() => props.resourceStore.getAnswerByKey('RF_018_1') ?? '');

</script>