<template>
    <QuestionaireCard topic-name="Weidehaltung">
        <template #content>
            <Radio
                v-if="!selectedHousing.includes('year_round_pasture')"
                question="Gibt es für alle Pferde Weidegang?"
                question-key="RF_018_1"
                :store="resourceStore"
                :options="[
                    { label: 'Täglich (auch in den Wintermonaten)', value: 'daily_all_year' },
                    { label: 'Während der Vegetationsperiode', value: 'during_vegetation_period' },
                    { label: 'Nein (z.B. aus gesundheitlichen Gründen)', value: 'no_access' }
                ]" />
            <Textarea
                v-if="selectedOutlet === 'no_access'"
                question-key="RF_018_2"
                placeholder-text="Warum nicht?"
                :store="resourceStore" />
            <RadioYesNo
                v-if="selectedHousing.includes('year_round_pasture')"
                question="Werden alle Pferde täglich auf der Weide kontrolliert?"
                question-key="RF_019"
                :store="resourceStore" />
            <Radio
                v-if="selectedHousing.includes('year_round_pasture') || selectedHousing.includes('seasonal_pasture')"
                question="Wie oft erfolgt die Kontrolle der Pferde auf der Weide?"
                question-key="RF_020"
                :store="resourceStore"
                :options="[
                    { label: '1x täglich', value: 'once_daily' },
                    { label: '2x täglich', value: 'twice_daily' },
                    { label: 'Mehrmals täglich', value: 'multiple_times_daily' },
                    { label: '3-4x wöchentlich', value: 'three_to_four_times_weekly' },
                    { label: 'Es erfolgt keine Kontrolle', value: 'no_monitoring' }
                ]" />
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

const selectedOutlet = computed(() => props.resourceStore.getAnswerByKey('RF_018_1') ?? '');
const selectedHousing = computed(() => props.resourceStore.getAnswerByKey('RF_008_1') ?? []);

</script>