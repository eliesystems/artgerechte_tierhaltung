<template>
    <QuestionaireCard topic-name="Weidehaltung">
        <template #content>
            <!-- value is other so, the Text field is shown -->
            <Radio
                v-if="!selectedHousing.includes('year_round_pasture')"
                question="Gibt es für alle Pferde täglich Weidegang?"
                question-key="RF_018"
                :answer-store="answerStore"
                placeholder-text="Warum nicht?"
                :options="[
                    { label: 'Täglich (auch in den Wintermonaten)', value: 'daily_all_year' },
                    { label: 'Während der Vegetationsperiode', value: 'during_vegetation_period' },
                    { label: 'Nein (z.B. aus gesundheitlichen Gründen)', value: 'other' }
                ]" />
            <RadioYesNo
                v-if="selectedHousing.includes('year_round_pasture')"
                question="Werden alle Pferde täglich auf der Weide kontrolliert?"
                question-key="RF_019"
                :answer-store="answerStore" />
            <Radio
                v-if="selectedHousing.includes('year_round_pasture') || selectedHousing.includes('seasonal_pasture')"
                question="Wie oft erfolgt die Kontrolle der Pferde auf der Weide?"
                question-key="RF_020"
                :answer-store="answerStore"
                :options="[
                    { label: '1x täglich', value: 'once_daily' },
                    { label: '2x täglich', value: 'twice_daily' },
                    { label: 'Mehrmals täglich', value: 'multiple_times_daily' },
                    { label: '3-4x wöchentlich', value: 'three_to_four_times_weekly' },
                    { label: 'Es erfolgt keine Kontrolle', value: 'no_monitoring' }
                ]" />
            <RadioYesNo
                question="Wird die Weide regelmäßig auf Giftpflanzen kontrolliert?"
                question-key="RF_021"
                :answer-store="answerStore"
                info="Für die Kontrolle der Weideflächen auf Giftpflanzen empfiehlt sich mindestens eine wöchentliche Kontrolle unter normalen Aufwuchsbedingungen. Bei stärkerem Aufwuchs, sollte die Kontrolle auf Giftpflanzen häufiger erfolgen. Insbesondere vor dem ersten Weidegang im Frühjahr ist die Kontrolle zu empfehlen." />
            <Textarea
                question="Hier können Sie sich noch Notizen machen: "
                question-key="RF_notes_grazing"
                :answer-store="answerStore" />
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
    answerStore: {
        type: Object,
        required: true,
    }
});

const selectedHousing = computed(() => props.answerStore.getAnswerByKey('RF_008') ?? []);

</script>