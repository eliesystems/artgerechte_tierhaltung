<template>
    <QuestionaireCard topic-name="Tierkontrolle">
        <template #content>
            <Radio
                question="Wird eine tägliche Tierkontrolle durchgeführt? (z.B. morgendliche Kontrolle beim Füttern der Pferde, Rausbringen auf den Auslauf/die Weide, Reinholen von dem Auslauf/der Weide, …)"
                question-key="MF_038"
                :answer-store="answerStore"
                :options="[
                    { label: 'Ja, 1 mal am Tag', value: 'yes_once_daily' },
                    { label: 'Ja, mehrmals am Tag', value: 'yes_multiple_times_daily' },
                    { label: 'Nein', value: 'no' }
                ]" />
            <RadioYesNo
                question="Gibt es eine Dokumentation der täglichen Tierkontrollen?"
                question-key="MF_039"
                :answer-store="answerStore" />
            <RadioYesNo
                question="Wird das Haltungsumfeld aller Pferde täglich auf Funktionalität und Verletzungsrisiken kontrolliert?"
                question-key="MF_040"
                :answer-store="answerStore"
                info="Zu den wesentlichen Bestandteilen des Haltungsumfelds gehören laut Leitlinien u. a.: Stallgebäude und Innenbereiche (Boxen, Laufställe, Stallgassen, Fressplätze, Tränken, Liegeflächen)
                      Auslaufbereiche (Paddocks, befestigte Ausläufe, Sandplätze, Zugänglichkeit und Rutschfestigkeit der Bodenflächen, Unterstände (Witterungsschutz); Wege zwischen Stall, Weide, Paddock, rennwände
                      Zusammenfassung: Das Haltungsumfeld eines Pferdes umfasst alle baulichen, funktionellen und organisatorischen Elemente, die das Tier täglich nutzt oder mit denen es in Kontakt kommt – also Stall, Auslauf, Weide, Bewegungsflächen, technische Ausstattung sowie Wege und Umgebungsbedingungen. --> Einfügen Maße 6-30cm etc." />
            <RadioYesNo
                question="Gibt es eine Dokumentation der täglichen Kontrollen des Haltungsumfeldes?"
                question-key="MF_041"
                :answer-store="answerStore" />
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