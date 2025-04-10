<template>
    <QuestionaireCard topic-name="Zäune">
        <template #content>
            <Radio
                question="Ist die verwendete Einstreu jederzeit gesundheitlich unbedenklich (z.B. schimmelfreies Stroh, unbedenkliches Schreddergut)?"
                question-key="RF_040"
                :store="resourceStore"
                :options="[
                    { label: 'Ja, täglich', value: 'yes_daily' },
                    { label: 'Ja, aber nicht täglich', value: 'yes_not_daily' },
                    { label: 'Nein', value: 'no' }
                ]" />
            <Radio
                question="Wird zur Kontrolle der Zaunspannung ein Zaunprüfgerät verwendet?"
                question-key="RF_041"
                :store="resourceStore"
                :options="[
                    { label: 'Ja, täglich', value: 'yes_daily' },
                    { label: 'Ja, aber nicht täglich', value: 'yes_not_daily' },
                    { label: 'Nein', value: 'no' }
                ]" />
            <RadioYesNo
                question="Haben alle Zäune mindestens zwei Querverstrebungen oder zwei stromführende Leiter (Bänder, Seile, Litze)?"
                question-key="RF_042"
                :store="resourceStore" />
            <RadioYesNo
                question="Haben Zäune in Risikobereichen (z. B. entlang von Straßen oder an unübersichtlichen Stellen) mindestens drei Querverstrebungen und drei stromführende Leiter (Bänder, Seile, Litze)?"
                question-key="RF_043"
                :store="resourceStore" />
            <Radio
                question="Gibt es eine Dokumentation der Zaunkontrollen?"
                question-key="RF_044"
                :store="resourceStore"
                :options="[
                    { label: 'Ja, schriftlich', value: 'yes_written' },
                    { label: 'Ja, digital', value: 'yes_digital' },
                    { label: 'Nein', value: 'no' }
                ]" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import Radio from '../questions/Radio.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';

defineProps({
    resourceStore: {
        type: Object,
        required: true,
    },
});
</script>