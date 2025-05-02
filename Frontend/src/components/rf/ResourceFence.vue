<template>
    <QuestionaireCard topic-name="Zäune">
        <template #content>
            <Radio
                question="Wird eine tägliche Sichtkontrolle des Zauns durchgeführt (Spannung der Litzen und Querverstrebungen)??"
                question-key="RF_040"
                :answer-store="answerStore"
                :options="[
                    { label: 'Ja, täglich', value: 'yes_daily' },
                    { label: 'Ja, aber nicht täglich', value: 'yes_not_daily' },
                    { label: 'Nein', value: 'no' }
                ]" />
            <Radio
                question="Wird zur Kontrolle der Zaunspannung ein Zaunprüfgerät verwendet?"
                question-key="RF_041"
                :answer-store="answerStore"
                :options="[
                    { label: 'Ja, täglich', value: 'yes_daily' },
                    { label: 'Ja, aber nicht täglich', value: 'yes_not_daily' },
                    { label: 'Nein', value: 'no' }
                ]" />
            <RadioYesNo
                question="Haben alle Zäune mindestens zwei Querverstrebungen oder zwei stromführende Leiter (Bänder, Seile, Litze)?"
                question-key="RF_042"
                :answer-store="answerStore" />
            <RadioYesNo
                question="Haben Zäune in Risikobereichen (z. B. entlang von Straßen oder an unübersichtlichen Stellen) mindestens drei Querverstrebungen und drei stromführende Leiter (Bänder, Seile, Litze)?"
                question-key="RF_043"
                :answer-store="answerStore" />
            <Radio
                question="Gibt es eine Dokumentation der Zaunkontrollen?"
                question-key="RF_044"
                :answer-store="answerStore"
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
    answerStore: {
        type: Object,
        required: true,
    },
});
</script>