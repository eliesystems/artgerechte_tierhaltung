<template>
    <QuestionaireCard topic-name="Gesundheitsmanagement">
        <template #content>
            <RadioYesNo
                question="Gibt es ein organisiertes Entwurmungsmanagement?"
                question-key="MF_042"
                :answer-store="answerStore" />
            <MultipleChoice
                v-if="worms === 'yes'"
                question="Wie sieht dieses Entwurmungsmanagement aus?"
                question-key="MF_043"
                :answer-store="answerStore"
                :options="[
                    { label: 'Wird durch die Pferdebesitzer organisiert', value: 'organized_by_horse_owner' },
                    { label: 'Durch die Betriebsleitung ausgeführt - bestandsweise und zeitgleich', value: 'executed_by_farm_management_stock_based_simultaneous' },
                    { label: '2x jährlich', value: 'twice_annually' },
                    { label: '3-4x jährlich', value: 'three_to_four_times_annually' },
                    { label: 'Selektives Entwurmungsmanagement', value: 'selective_deworming_management' }
                ]" />
            <Radio
                question="Werden alle Pferde regelmäßig immunisiert (z. B. Tetanus, Influenza)?"
                question-key="MF_044"
                :answer-store="answerStore"
                :options="[
                    { label: 'Ja, wird durch die Pferdebesitzer selbst organisiert und ausgeführt', value: 'yes_organized_by_owners' },
                    { label: 'Ja, bestandsweise und zeitgleich durch Betriebsleitung', value: 'yes_by_farm_management' },
                    { label: 'Nein', value: 'no' }
                ]" />
            <Radio
                question="Erfolgt eine jährliche Zahnkontrolle der Pferde?"
                question-key="MF_045"
                :answer-store="answerStore"
                :options="[
                    { label: 'Ja, wird durch die Pferdebesitzer organisiert', value: 'yes_organized_by_horse_owner' },
                    { label: 'Ja, wird durch die Betriebsleitung ausgeführt', value: 'yes_executed_by_farm_management' },
                    { label: 'Nein', value: 'no' }
                ]" />
            <Radio
                question="Wird regelmäßig eine Hufpflege durchgeführt? "
                question-key="MF_046"
                :answer-store="answerStore"
                :options="[
                    { label: 'Ja, wird durch die Pferdebesitzer organisiert', value: 'yes_organized_by_owners' },
                    { label: 'Ja, wird durch die Betriebsleitung ausgeführt', value: 'yes_by_farm_management' },
                    { label: 'Nein', value: 'no' }
                ]"
                info="Regelmäßige Hufkontrolle und -pflege bei Pferden
                      Eine tierschutzgerechte Pferdehaltung erfordert die regelmäßige Kontrolle, Pflege und gegebenenfalls Bearbeitung oder Beschlag der Hufe. Dabei ist es wichtig, den individuellen Bedarf des Pferdes zu berücksichtigen, etwa hinsichtlich Haltung, Nutzung, Bodenverhältnissen und Jahreszeit.
                      Die offiziellen Leitlinien zur Beurteilung von Pferdehaltungen unter Tierschutzgesichtspunkten (BMEL, 2009) geben keinen festen Zeitintervall vor, betonen jedoch:
                      „Die Hufe müssen regelmäßig kontrolliert, gepflegt und gegebenenfalls bearbeitet oder beschlagen werden.“
                        – BMEL, Leitlinien Pferdehaltung, S. 37
                      Konkrete Zeitangaben finden sich in verschiedenen Fachmerkblättern. Ein übliches Intervall liegt zwischen 6 und 8 Wochen, wobei dies an die individuellen Gegebenheiten anzupassen ist:
                      Ministerium für Ländliche Entwicklung, Umwelt und Landwirtschaft Brandenburg empfiehlt: „In der Regel ist alle sechs bis acht Wochen eine Hufpflege oder ein neuer Hufbeschlag erforderlich.“
                        – Merkblatt für Pferdehalter, Brandenburg (S. 3), Quelle (PDF)
                      Landkreis Main-Spessart nennt: „Regelmäßige Kontrolle und Korrektur der Hufe alle sechs bis acht Wochen, abhängig von Stellung und Abnutzung.“
                        – Merkblatt zur Pferdehaltung, Quelle (PDF)
                      DLG-Merkblatt 419 – Das Tier im Blick: Pferde hebt die Bedeutung einer kontinuierlichen Hufkontrolle hervor, nennt jedoch keinen festen Zeitraum. Die Verantwortung liegt bei der Pferdehalterin/dem Pferdehalter, bedarfsgerecht zu handeln. (DLG Merkblatt 419)" />
            <RadioYesNo
                question="Werden neue Pferde schrittweise in die Herde integriert?"
                question-key="MF_047"
                :answer-store="answerStore"
                info="Die Integration neuer Pferde erfolgt schrittweise und individuell für jedes Pferd. Die Integration wird aufmerksam durch den/die BetriebsleiterIn beobachtet." />
            <RadioYesNo
                question="Gibt es eine Dokumentation des Gesundheitsmanagements?"
                question-key="MF_048"
                :answer-store="answerStore"
                info="Die Integration neuer Pferde erfolgt schrittweise, sorgfältig und individuell für jedes Pferd. Die Integration wird aufmerksam durch den/die BetriebsleiterIn beobachtet." />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import QuestionaireCard from '../common/QuestionaireCard.vue';
import MultipleChoice from '../questions/MultipleChoice.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';
import Radio from '../questions/Radio.vue';

const props = defineProps({
    answerStore: {
        type: Object,
        required: true,
    },
})

const worms = computed(() => props.answerStore.getAnswerByKey('MF_042') ?? '');
</script>