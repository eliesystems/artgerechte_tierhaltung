<template>
    <QuestionaireCard topic-name="Boden, Sicherheit und Stallgasse">
        <template #content>
            <RadioYesNo
                question="Haben alle Pferde regelmäßig und unabhängig von der Witterung die Möglichkeit sich in allen drei Gangarten frei zu bewegen?"
                question-key="RF_029-1"
                :answer-store="answerStore" />
            <Images
                question="Welche der Abbildungen entspricht dem Boden in der Schlechtwetterperiode auf den Auslauflaufflächen für die freie Bewegung?"
                question-key="RF_029"
                :answer-store="answerStore"
                :images="[
                    { imgUrl: '/images/ground/ground_1.png', value: 'image_1' },
                    { imgUrl: '/images/ground/ground_2.png', value: 'image_2' },
                    { imgUrl: '/images/ground/ground_3.png', value: 'image_3' },
                    { imgUrl: '/images/ground/ground_4.png', value: 'image_4' },
                    { imgUrl: '/images/ground/ground_5.png', value: 'image_5' }
                ]" />
            <Radio
                question="Sind die Fenster im Pferdebereich gesichert sofern sie sich in Reichweite der Pferde befinden?"
                question-key="RF_030"
                :answer-store="answerStore"
                :options="[
                    { label: 'Ja, es handelt sich bei den Fenstern um Sicherheitsglas bzw. Einscheibensicherheitsglas (ESG) oder Verbundsicherheitsglas (VSG)', value: 'windows_safety_glass' },
                    { label: 'Ja, die Fenster sind nur durch Gitter gesichert', value: 'windows_grilled' },
                    { label: 'Es gibt keine zu sichernden Fenster in Reichweite der Pferde', value: 'no_windows_to_secure' },
                    { label: 'Nein, die Fenster sind nicht gesichert', value: 'windows_not_secured' }
                ]"
                info="Fenster aus zerbrechlichen Materialien in einer von den Pferden erreichbaren Höhe, müssen gesichert sein." />
            <Radio
                question="Sind die Leitungen und Kabel im Pferdebereich gesichert sofern sie sich in Reichweite der Pferde befinden?"
                question-key="RF_030+1"
                :answer-store="answerStore"
                :options="[
                    { label: 'Ja, die elektrischen Installationen entsprechen den gängigen Normen (z.B. VDE-Norm)', value: 'electric_installations_compliant' },
                    { label: 'Nein', value: 'no' }
                ]"
                info="Elektroleitungen und –Anschlüsse dürfen sich nur in gesichertem Zustand in Reichweite der Pferde befinden. Wasserleitungen müssen ausreichend gesichert sein.
                      - Alle Metallteile müssen geerdet sein." />
            <Radio
                question="Sind die wasserführenden Installationen (Leitungen und Schläuche) im Pferdebereich gesichert sofern sie sich in Reichweite der Pferde befinden?"
                question-key="RF_030+2"
                :answer-store="answerStore"
                :options="[
                    { label: 'Ja, die wasserführenden Installationen entsprechen den gängigen Normen', value: 'water_installations_compliant' },
                    { label: 'Nein', value: 'no' }
                ]" />
            <RadioYesNo
                question="Sind alle Verkehrswege der Pferde aus Sicht des Pferdes sicher und ohne Gefahren zu passieren? (Formulierung anpassen)"
                question-key="RF_031"
                :answer-store="answerStore"
                info="Eine sichere Stallgasse ist zentral für den täglichen Umgang mit Pferden. Sie muss so gestaltet sein, dass das Verletzungsrisiko für Pferd und Mensch minimiert wird. Breite: Mindestens 2,5–3 m, bei zweireihigen Boxen besser 3,5–4 m
                      Bodenbeschaffenheit: Rutschfest, trittsicher, pflegeleicht (z. B. Gummimatten, strukturierter Beton)
                      Beleuchtung: Hell und blendfrei, keine plötzlichen Licht-Schatten-Wechsel
                      Ausstattung: Keine herausragenden Gegenstände (Haken, Nägel, Futtertröge, scharfe Kanten)
                      Ordnung und Sauberkeit: Kein herumliegendes Zubehör (Mistgabeln, Schubkarren, Putzzeug)
                      Fluchtwege: Freier Zugang zu Notausgängen" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import Radio from '../questions/Radio.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';
import Images from '../questions/Images.vue';

defineProps({
    answerStore: {
        type: Object,
        required: true,
    },
});
</script>