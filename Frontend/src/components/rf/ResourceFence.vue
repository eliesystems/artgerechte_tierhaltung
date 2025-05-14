<template>
    <QuestionaireCard topic-name="Zäune">
        <template #content>
            <RadioYesNo
                question="Wird eine tägliche Sichtkontrolle des Zauns durchgeführt (Spannung der Litzen und Querverstrebungen)??"
                question-key="RF_040"
                :answer-store="answerStore" />
            <RadioYesNo
                question="Sind die Weiden mit Stacheldraht oder Knotengitter eingezäunt?"
                question-key="RF040+1"
                :answer-store="answerStore" />
            <RadioYesNo
                question="Werden freiliegende Spiralen bei Torgriffen und Torfedern verwendet?"
                question-key="RF040+2"
                :answer-store="answerStore" />
            <RadioYesNo
                question="Wird zur Kontrolle der Zaunspannung bei stromführenden Leitern (Bänder, Seile, Litze) ein Zaunprüfgerät verwendet?"
                question-key="RF_041"
                :answer-store="answerStore" />
            <RadioYesNo
                question="Haben alle Zäune mindestens zwei Querverstrebungen oder zwei stromführende Leiter (Bänder, Seile, Litze)?"
                question-key="RF_042"
                :answer-store="answerStore" />
            <RadioYesNo
                question="Haben Zäune in Risikobereichen (z. B. entlang von Straßen oder an unübersichtlichen Stellen) mindestens drei Querverstrebungen und drei stromführende Leiter (Bänder, Seile, Litze)?"
                question-key="RF_043"
                :answer-store="answerStore"
                info="Risikobereich (Pferdeweide – Einzäunung)
                      (gemäß DLG-Merkblatt 417 zur „Sicheren Einzäunung für Pferde“)
                      Der Risikobereich beschreibt in der Pferdehaltung besondere Lagebedingungen von Weideflächen, bei denen bei einem Ausbruch eines Pferdes eine erhebliche Gefährdung für Dritte oder das Tier selbst entstehen kann. Dieser Begriff wird verwendet, um Standorte zu kennzeichnen, die sich in unmittelbarer Nähe zu gefährdungsrelevanter Infrastruktur befinden.
                      Dazu zählen insbesondere:
                          Autobahnen, Schnellstraßen, stark befahrene Landstraßen
                          Bahnstrecken
                          Flugplätze oder Hubschrauberlandeplätze
                          Gewässer mit Absturz- oder Ertrinkungsgefahr
                          Wohngebiete oder öffentliche Einrichtungen mit Publikumsverkehr" />
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