<template>
    <QuestionaireCard topic-name="Boden, Sicherheit und Stallgasse">
        <template #content>
            <div>
                Welche der Abbildungen entspricht dem Boden in der Schlechtwetterperiode auf den Auslauflaufflächen für die freie Bewegung?
                Hier fehlen noch Bilder.
            </div>
            <Radio
                question="Sind Fenster sowie Leitungen, Kabel und Metallteile im Pferdebereich gesichert sofern sie sich in Reichweite der Pferde befinden?"
                question-key="RF_030"
                :answer-store="answerStore"
                :options="[
                    { 
                        label: 'Ja, es handelt sich bei den Fenstern um Sicherheitsglas bzw. Einscheibensicherheitsglas (ESG) oder Verbundsicherheitsglas (VSG) und die elektrischen Installationen entsprechen den VDE-Normen', 
                        value: 'safety_glass_and_vde' 
                    },
                    { 
                        label: 'Ja, die Fenster sind durch Gitter gesichert und die elektrischen Installationen entsprechenden den VDE-Normen', 
                        value: 'grilles_and_vde' 
                    },
                    { 
                        label: 'Nein', 
                        value: 'no' 
                    }
                ]"
                info="Fenster aus zerbrechlichen Materialien in einer von den Pferden erreichbaren Höhe, müssen gesichert sein.
                      • Leuchten, Elektroleitungen und –Anschlüsse dürfen sich nur in gesichertem Zustand in Reichweite der Pferde befinden.
                      • Wasserleitungen müssen ausreichend gesichert sein.
                      • Alle Metallteile müssen geerdet sein. " />
            <RadioYesNo
                question="Können alle Pferde auf der Stallgasse verletzungsfrei geführt werden?"
                question-key="RF_031"
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