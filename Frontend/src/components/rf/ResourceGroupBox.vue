<template>
    <QuestionaireCard topic-name="Gruppenhaltung">
        <template #content>
            <MultipleChoice
                question="Welche Formen der Gruppenhaltung gibt es?"
                question-key="RF_013"
                :options="options"
                :answer-store="answerStore" />
            <Text
                v-for="(choice, index) in selectedForms" :key="`RF_014_${index}`"
                :question="`Wie viele Pferde sind in ${getLabel(choice)} untergebracht?`"
                :question-key="`RF_014_${choice}`"
                input-type="number"
                placeholder-text="Anzahl der Pferde in der Haltungsform"
                :answer-store="answerStore" />
            <RadioYesNo
                question="Können kranke oder verletzte Pferde separat aber mindestens mit Sichtkontakt zu Artgenossen untergebracht werden?"
                question-key="RF_015"
                :answer-store="answerStore" />
            <RadioYesNo
                question="Gibt es einen separaten Integrationsbereich mit Kontaktmöglichkeit zu den anderen Pferden der Gruppe?"
                question-key="RF_016"
                :answer-store="answerStore"
                info="Ein Integrationsbereich in Gruppenhaltungssystemen für Pferde dient der schrittweisen Eingliederung neuer Tiere in eine bestehende Gruppe. Damit die Integration möglichst stressfrei und sicher verläuft – sowohl für das neue Pferd als auch für die bestehende Herde – sollte der Integrationsbereich bestimmte Voraussetzungen erfüllen: Der Integrationsbereich ist durch einen ausbruch- und verletzungssicheren Zaun vom Auslauf der Gruppe getrennt, ermöglicht aber einen Kontakt zu den anderen Pferden der Gruppe und verfügt über einen eigenen Liegebereich sowie Futter und Tränkeplatz. Die Integration sollte schrittweise erfolgen. Stromführende Leiter sind auf Kleinausläufen als tierschutzrelevant einzuordnen." />
            <Textarea
                question="Hier können Sie sich noch Notizen machen: "
                question-key="RF_notes_group_box"
                :answer-store="answerStore" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import MultipleChoice from '../questions/MultipleChoice.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';
import Text from '../questions/Text.vue';
import Textarea from '../questions/Textarea.vue';

import { computed } from 'vue';

const props = defineProps({
    answerStore: {
        type: Object,
        required: true,
    },
});

const selectedForms = computed(() => props.answerStore.getAnswerByKey('RF_013') ?? []);

const options = [
    { label: 'Innenlaufstall', value: 'indoor_loose_housing' },
    { label: 'Außenlaufstall', value: 'outdoor_loose_housing' },
    { label: 'Bewegungsstall', value: 'active_stable' },
    { label: 'Freilandhaltung', value: 'pasture_holding' }
];

function getLabel(value: string) {
  const option = options.find(opt => opt.value === value);
  return option?.label ?? value;
};

</script>