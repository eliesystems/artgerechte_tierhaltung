<template>
    <QuestionaireCard topic-name="Tränkenmanagment">
        <template #content>
            <MultipleChoice
                question="Welche Arten von Tränkeeinrichtungen gibt es?"
                question-key="MF_036+1"
                :answer-store="answerStore"
                :options="[
                    { label: 'Schwimmertränke', value: 'float_valve_trough' },
                    { label: 'Tränkebecken', value: 'drinking_bowl' },
                    { label: 'Mobile Tränke (z.B. Wasserwagen)', value: 'mobile_trough' },
                    { label: 'Trogtränke/Tränkwanne', value: 'open_trough' },
                    { label: 'Natürliches Gewässer', value: 'natural_water_source' }
                ]" />
            <RadioYesNo
                question="Werden die Tränkeeinrichtungen täglich auf Sauberkeit kontrolliert?"
                question-key="MF_036"
                :answer-store="answerStore" />
            <RadioYesNo
                question="Werden alle Tränkeeinrichtungen täglich auf Funktionalität und Durchflussgeschwindigkeit (ca. 7-15 l/min) kontrolliert?"
                question-key="MF_037"
                :answer-store="answerStore" />
            <RadioYesNo
                question="Wird bei allen Tränkeeinrichtungen regelmäßig die Durchflussgeschwindigkeit (ca. 10-20 l/min) kontrolliert?"
                question-key="MF_037.1"
                :answer-store="answerStore"
                info="Die Durchflussrate einer Tränke gibt an, wie viel Wasser in einer bestimmten Zeit aus der Tränke fließt und sollte mindestens 2 mal pro Jahr kontrolliert werden. Sie wird in Litern pro Minute (L/min) gemessen. Um die Durchflussrate einer Tränke zu prüfen, folge diesen Schritten:
                      Benötigte Materialien:
                      • Eimer oder Messbecher mit bekannter Größe (z. B. 1-Liter-Eimer)
                      • Stoppuhr oder Smartphone mit Time
                      Messung durchführen:
                      Ja. Eimer unter die Tränke stellen.
                      2. Tränke vollständig öffnen (z. B. durch Drücken des Ventils oder Öffnen des Wasserzulaufs).
                      3. Stoppuhr starten, sobald das Wasser fließt.
                      4. Eimer für eine definierte Zeit füllen lassen, z. B. 15 oder 30 Sekunden.
                      5. Stoppuhr stoppen und das gesammelte Wasservolumen messen.
                      Berechnung der Durchflussrate:
                      Die Durchflussrate berechnest du mit folgender Formel:
                      Durchflussrate (L/min) / gesammeltes Volumen (L)/Messzeit (Sekunden) ×60" />
            <Textarea
                question="Hier können Sie sich noch Notizen machen: "
                question-key="MF_notes_drinking"
                :answer-store="answerStore" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import MultipleChoice from '../questions/MultipleChoice.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';
import Textarea from '../questions/Textarea.vue';

defineProps({
    answerStore: {
        type: Object,
        required: true,
    },
});
</script>