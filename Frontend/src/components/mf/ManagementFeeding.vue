<template>
    <QuestionaireCard topic-name="Fütterungsmanagement">
        <template #content>
            <MultipleChoice
                question="Welches Grundfutter wird verfüttert?"
                question-key="MF_012"
                :store="managementStore"
                :options="[
                    { label: 'Heu', value: 'hay' },
                    { label: 'Heulage', value: 'haylage' },
                    { label: 'Stroh', value: 'straw' },
                    { label: 'Gras', value: 'grass' }
                ]" />
            <div v-if="stableFood.includes('haylage')">
                <MultipleChoice
                    question="Welche Farbe hat das Raufutter (Heulage)?"
                    question-key="MF_013"
                    :store="managementStore"
                    :options="[
                        { label: 'Grünlich bis bräunlich-gelblich', value: 'green_to_brownish_yellow' },
                        { label: 'Bräunlich bis stark gelblich', value: 'brownish_to_strong_yellow' },
                        { label: 'Stark ausgeblichen', value: 'heavily_faded' },
                        { label: 'Dunkelbraun/gräulich', value: 'dark_brown_or_grayish' }
                    ]" />
                <MultipleChoice
                    question="Wie riecht das Raufutter (Heulage)?"
                    question-key="MF_014"
                    :store="managementStore"
                    :options="[
                        { label: 'Angenehm, säuerlich, aromatisch', value: 'pleasant_sour_aromatic' },
                        { label: 'Leicht stechender Essigsäuregeruch oder leicht brandig', value: 'slightly_pungent_acetic_or_scorched' },
                        { label: 'Schwacher Buttersäuregeruch oder stechender Röstgeruch', value: 'mild_butyric_or_pungent_roasted' },
                        { label: 'Starker Röstgeruch, schwach muffig stark muffig (schimmelig)', value: 'strong_roasted_musty_or_moldy' }
                    ]" />
                <MultipleChoice
                    question="Wie ist die Struktur des Raufutters (Heulage) zu beurteilen?"
                    question-key="MF_015"
                    :store="managementStore"
                    :options="[
                        { label: 'Viele Stängel, Rispen vorhanden', value: 'many_stems_with_panicles' },
                        { label: 'Wenig harte Stängel, wenig Rispen', value: 'few_hard_stems_few_panicles' },
                        { label: 'Viele harte Stängel, Rispen verblüht', value: 'many_hard_stems_panicles_faded' },
                        { label: 'Nur Blattmasse', value: 'only_leaf_mass' }
                    ]" />
            </div>
            <div v-if="stableFood.includes('hay')">
                <MultipleChoice
                    question="Welche Farbe hat das Raufutter (Heu)?"
                    question-key="MF_016"
                    :store="managementStore"
                    :options="[
                        { label: 'Grünlich/bräunlich', value: 'greenish_brownish' },
                        { label: 'Bräunlich/braun', value: 'brownish_brown' },
                        { label: 'Dunkelbraun/ausgeblichen', value: 'dark_brown_faded' },
                        { label: 'Dunkelbraun/schwarz', value: 'dark_brown_black' }
                    ]" />
                <MultipleChoice
                    question="Wie riecht das Raufutter (Heu)?"
                    question-key="MF_017"
                    :store="managementStore"
                    :options="[
                        { label: 'Sehr aromatisch', value: 'very_aromatic' },
                        { label: 'Fad', value: 'bland' },
                        { label: 'Muffig/brandig', value: 'musty_scorched' },
                        { label: 'Muffig/faulig', value: 'musty_rotten' }
                    ]" />
                <MultipleChoice
                    question="Wie ist die Struktur des Raufutters (Heu) zu beurteilen?"
                    question-key="MF_018"
                    :store="managementStore"
                    :options="[
                        { label: 'Viele Stängel, Rispen deutlich sichtbar, rau und steif im Griff', value: 'many_stems_panicles_visible_rough_and_stiff' },
                        { label: 'Wenig harte Stängel, wenig Rispen sichtbar, weniger hart im Griff', value: 'few_hard_stems_few_panicles_visible_less_stiff' },
                        { label: 'Viele harte Stängel, Gräser verblüht, sehr hart im Griff', value: 'many_hard_stems_grasses_faded_very_stiff' },
                        { label: 'Keine Stängel, nur Blattmasse, sehr weich im Griff', value: 'no_stems_only_leaf_mass_very_soft' }
                    ]" />
            </div>
            <div v-if="stableFood.includes('straw')">
                <MultipleChoice
                    question="Welche Farbe hat das Raufutter (Stroh)?"
                    question-key="MF_019"
                    :store="managementStore"
                    :options="[
                        { label: 'Gelb/gelblich', value: 'yellow_yellowish' },
                        { label: 'Ausgeblichen', value: 'faded' },
                        { label: 'Stark ausgeblichen', value: 'heavily_faded' },
                        { label: 'Dunkelbraun', value: 'dark_brown' }
                    ]" />
                <MultipleChoice
                    question="Wie riecht das Raufutter (Stroh)?"
                    question-key="MF_020"
                    :store="managementStore"
                    :options="[
                        { label: 'Typisch Strohgeruch', value: 'typical_straw_smell' },
                        { label: 'Fad', value: 'bland' },
                        { label: 'Schwach muffig', value: 'slightly_musty' },
                        { label: 'Stark muffig', value: 'strongly_musty' }
                    ]" />
                <MultipleChoice
                    question="Wie ist die Struktur des Raufutters (Stroh) zu beurteilen?"
                    question-key="MF_021"
                    :store="managementStore"
                    :options="[
                        { label: 'Massig hart/wenig Halme', value: 'moderately_hard_few_stems' },
                        { label: 'Sehr hart/vorwiegend Halme', value: 'very_hard_prevalent_stems' },
                        { label: 'Klamm/stark verdichtet', value: 'clammy_heavily_compacted' }
                    ]" />
            </div>
            <Radio
                question="Erfolgt die Raufuttergabe automatisiert oder manuell?"
                question-key="MF_022"
                :store="managementStore"
                :options="[
                    { label: 'Manuell', value: 'manual' },
                    { label: 'Automatisch', value: 'automatic' },
                    { label: 'Anderes', value: 'other' }
                ]" />
            <div v-if="foodAutomatic === 'manual'">
                <MultipleChoice
                    question="Wie erfolgt die manuelle Raufuttervorlage?"
                    question-key="MF_023"
                    :store="managementStore"
                    :options="[
                        { label: 'Lose Fütterung auf dem Boden', value: 'loose_feeding_on_ground' },
                        { label: 'Fütterung in Heunetzen/Heutonnen', value: 'feeding_in_hay_nets_hay_bins' },
                        { label: 'Fütterung in Heuboxen', value: 'feeding_in_hay_boxes' },
                        { label: 'im Fressstand', value: 'in_feed_rack' },
                        { label: 'Durchfressgitter', value: 'through_feed_grid' },
                        { label: 'Fütterung aus einer Raufe', value: 'feeding_from_trough' }
                    ]" />
                <Radio
                    question="Wird das Raufutter portioniert oder steht es dauerhaft zur Verfügung?"
                    question-key="MF_024"
                    :store="managementStore"
                    :options="[
                        { label: 'Unbegrenzt/zur freien Verfügung', value: 'unlimited_free_access' },
                        { label: 'Portionierte Raufuttervorlage', value: 'portioned_fiber_feed_supply' }
                    ]" />
            </div>
            <div v-if="foodAutomatic === 'automatic'">
                <MultipleChoice
                    question="Wie erfolgt die automatische Raufuttervorlage?"
                    question-key="MF_025"
                    :store="managementStore"
                    :options="[
                        { label: 'Fütterung in Heuboxen', value: 'feeding_in_hay_boxes' },
                        { label: 'Im Fressstand', value: 'in_feed_rack' },
                        { label: 'Durchfressgitter', value: 'through_feed_grid' },
                        { label: 'Fütterung aus einer Raufe', value: 'feeding_from_trough' }
                    ]" />
                <RadioYesNo
                    question="Gibt es eine Zeitsteuerung für die automatisierte Raufuttergabe (z. B. Futterautomaten, Heuraufen mit zeitgesteuerten Öffnungen)?"
                    question-key="MF_026"
                    :store="managementStore" />
            </div>
            <Radio
                question="Wie oft erfolgt die Raufuttergabe?"
                question-key="MF_027"
                :store="managementStore"
                placeholder-text="Bitte geben Sie an wie häufig die Raufuttergabe erfolgt."
                input-type="number"
                :options="[
                    { label: '1x täglich', value: 'once_daily' },
                    { label: '2x täglich', value: 'twice_daily' },
                    { label: '3x täglich', value: 'three_times_daily' },
                    { label: '4x täglich', value: 'four_times_daily' },
                    { label: 'Andere', value: 'other' }
                ]" />
            <RadioYesNo
                question="Werden die Fütterungseinrichtungen täglich auf Funktionalität kontrolliert?"
                question-key="MF_029"
                :store="managementStore" />
            <RadioYesNo
                question="Wird Kraftfutter gegeben?"
                question-key="MF_030"
                :store="managementStore" />
            <div v-if="powerFoodAutomatic === 'yes'">
                <Radio
                    question="Wie erfolgt die Kraftfuttervorlage?"
                    question-key="MF_031"
                    :store="managementStore"
                    placeholder-text="Bitte beschreiben Sie wie die Kraftfuttervorlage erfolgt."
                    :options="[
                        { label: 'Manuell', value: 'manual' },
                        { label: 'Automatisch', value: 'automatic' },
                        { label: 'Anderes', value: 'other' }
                    ]" />
                <Radio
                    question="Erfolgt die Kraftfuttergabe zeitlich getrennt von der Raufuttergabe?"
                    question-key="MF_032"
                    :store="managementStore"
                    :options="[
                        { label: 'Ja, vor der Raufuttergabe', value: 'yes_before_fiber_feed' },
                        { label: 'Ja, nach der Raufuttergabe', value: 'yes_after_fiber_feed' },
                        { label: 'Abruf des Kraftfutters über automatische Fütterungseinrichtung', value: 'automatic_concentrate_feed_retrieval' },
                        { label: 'Nein', value: 'no' }
                    ]" />
            </div>
            <Radio
                question="Falls ja, in welchem Abstand zur Raufuttergabe?"
                question-key="MF_033"
                :store="managementStore"
                :options="[
                    { label: 'Vor der Raufuttergabe', value: 'before_fiber_feed' },
                    { label: 'Nach der Raufuttergabe', value: 'after_fiber_feed' },
                    { label: 'Abruf des Kraftfutters über automatische Fütterungseinrichtung', value: 'call_of_concentrate_feed_via_automatic_system' }
                ]" />
            <MultipleChoice
                question="Wie erfolgt die Mineralstoffversorgung?"
                question-key="MF_034"
                :store="managementStore"
                :options="[
                    { label: 'Über die Heumenge', value: 'over_hay_quantity' },
                    { label: 'Über mineralisiertes Kraftfutter', value: 'over_mineralized_concentrate_feed' },
                    { label: 'Über eine Leckschale/Leckstein, die allen Pferden zur Verfügung steht', value: 'over_lick_bowl_lick_stone_available_for_all_horses' },
                    { label: 'Über eine separate Mineralfuttermittelgabe', value: 'over_separate_mineral_feed' },
                    { label: 'Das macht Pferdebesitzer*in selbst', value: 'done_by_horse_owner_themselves' }
                ]" />
            <Radio
                question="Steht allen Pferden ein Salzleckstein zur Verfügung?"
                question-key="MF_035"
                :store="managementStore"
                placeholder-text="Bitte beschreiben Sie inwiefern ein Salzleckstein zur Verfügung steht"
                :options="[
                    { label: 'Ja, permanent', value: 'yes_permanent' },
                    { label: 'Ja, aber nicht dauerhaft verfügbar', value: 'yes_not_permanently_available' },
                    { label: 'Nein', value: 'no' },
                    { label: 'Anderes', value: 'other' }
                ]" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import QuestionaireCard from '../common/QuestionaireCard.vue';
import MultipleChoice from '../questions/MultipleChoice.vue';
import Radio from '../questions/Radio.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';


const props = defineProps({
    managementStore: {
        type: Object,
        required: true,
    },
});

const powerFoodAutomatic = computed(() => props.managementStore.getAnswerByKey('MF_030') ?? '');
const foodAutomatic = computed(() => props.managementStore.getAnswerByKey('MF_022') ?? '');
const stableFood = computed(() => props.managementStore.getAnswerByKey('MF_012_1') ?? []);
</script>