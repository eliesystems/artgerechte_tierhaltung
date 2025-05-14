<template>
	<div class="max-w-4xl mx-auto flex flex-col flex-grow">
		<div v-if="currentQuestionnaireComponent" class="w-full mx-auto px-12 py-2 flex-grow">
			<component :is="currentQuestionnaireComponent" :answer-store="temporaryAnswerStore" />
		</div>
		<div class="mt-6 mb-20 px-16 flex justify-between">
			<button
				v-if="!hasPreviousQuestionnaire"
				class="hover:bg-[#dac17c] manrope-text py-2 px-4 rounded shadow flex items-center min-w-42"
				@click="goToHome">
				<span class="material-symbols-outlined">chevron_left</span>
				Abbrechen
			</button>
			<button
				v-if="hasPreviousQuestionnaire"
				class="hover:bg-[#dac17c] manrope-text py-2 px-4 rounded shadow flex items-center min-w-42"
				@click="goToPreviousQuestionnaire">
				<span class="material-symbols-outlined">chevron_left</span>
				Zurück
			</button>
			<button
				v-if="hasNextQuestionnaire"
				class="bg-[#d1a62c] hover:bg-[#dac17c] text-white manrope-text py-2 px-4 border rounded shadow flex items-center min-w-42"
				@click="goToNextQuestionnaire">
				Nächste Seite
				<span class="material-symbols-outlined">chevron_right</span>
			</button>
			<button
				v-if="!hasNextQuestionnaire"
				class="bg-[#d1a62c] hover:bg-[#dac17c] text-white manrope-text py-2 px-4 border rounded shadow flex items-center min-w-42"
				@click="saveWellbeing">
				Speichern und Beenden
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import WellbeingSocialBehaviorAndComfort from '@/components/ti/WellbeingSocialBehaviorAndComfort.vue';
import WellbeingFoodAndWater from '@/components/ti/WellbeingFoodAndWater.vue'
import WellbeingMovingAndRestingBehavior from '@/components/ti/WellbeingMovingAndRestingBehavior.vue';
import WellbeingOther from '@/components/ti/WellbeingOther.vue';

import { computed, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useNavigationStore } from '@/stores/wellbeingNavigationStore';
import { useAnswerStore } from '@/stores/answerStore';
import { useTemporaryAnswerStore } from '@/stores/temporaryAnswerStore';

const navigationStore = useNavigationStore();
const router = useRouter();
const farmId = router.currentRoute.value.query.farmId as string;

const answerStore = useAnswerStore();
const temporaryAnswerStore = useTemporaryAnswerStore();

const questionnaireComponents = {
	socialBehavior: WellbeingSocialBehaviorAndComfort,
	foodAndWater: WellbeingFoodAndWater,
	movingAndRestingBehavior: WellbeingMovingAndRestingBehavior,
	other: WellbeingOther,
}

const currentQuestionnaireComponent = computed(() => {
	const current = navigationStore.currentQuestionnaire as keyof typeof questionnaireComponents;
	return questionnaireComponents[current] || null;
});

const goToNextQuestionnaire = async () => {
	const next = navigationStore.getNextQuestionnaire(navigationStore.currentQuestionnaire);
	if (next) {
		navigationStore.setCurrentQuestionnaire(next);
		await nextTick();
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}
};

const goToPreviousQuestionnaire = async () => {
	const previous = navigationStore.getPreviousQuestionnaire(navigationStore.currentQuestionnaire);
	if (previous) {
		navigationStore.setCurrentQuestionnaire(previous);
		await nextTick();
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}
};

const hasNextQuestionnaire = computed(() => {
	return navigationStore.getNextQuestionnaire(navigationStore.currentQuestionnaire) !== null;
});

const hasPreviousQuestionnaire = computed(() => {
	return navigationStore.getPreviousQuestionnaire(navigationStore.currentQuestionnaire) !== null;
});

const goToHome = () => {
	temporaryAnswerStore.resetStore();
	router.push({ path: '/home', query: { sync: 'true' } });
};

const saveWellbeing = async () => {
    if (!farmId) {
        console.error("Farm ID is missing");
        return;
    }

	Object.entries(temporaryAnswerStore.answers).forEach(([key, { value }]) => {
		const tempId = answerStore.getNextTempId();
		answerStore.saveAnswer(farmId, key, { value, id: tempId });
	});

	temporaryAnswerStore.resetStore();
	navigationStore.reset();
    router.push({ path: '/home', query: { sync: 'true' } });
};

</script>