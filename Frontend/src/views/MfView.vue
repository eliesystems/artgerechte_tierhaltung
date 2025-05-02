<template>
	<div class="max-w-4xl mx-auto flex flex-col flex-grow">
		<div v-if="answerLoaded && currentQuestionnaireComponent" class="w-full mx-auto px-12 py-2 flex-grow">
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
				@click="saveManagement">
				Speichern und weiter zu den Tierwohl Indikatoren
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import ManagementManagementAndPersonal from '@/components/mf/ManagementManagementAndPersonal.vue';
import ManagementFeeding from '@/components/mf/ManagementFeeding.vue';
import ManagementDrinking from '@/components/mf/ManagementDrinking.vue';
import ManagementControll from '@/components/mf/ManagementControll.vue';
import ManagementHealth from '@/components/mf/ManagementHealth.vue';
import ManagementNotes from '@/components/mf/ManagementNotes.vue';

import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNavigationStore } from '@/stores/managementNavigationStore';
import { useAnswerStore } from '@/stores/answerStore'
import { useTemporaryAnswerStore } from '@/stores/temporaryAnswerStore';

const navigationStore = useNavigationStore();
const router = useRouter();
const farmId = router.currentRoute.value.query.farmId as string;
const answerLoaded = ref(false);

const answerStore = useAnswerStore();
const temporaryAnswerStore = useTemporaryAnswerStore();
const originalAnswers = ref<Record<string, {value:any;id?:number}>>({});

const questionnaireComponents = {
    managementAndPersonal: ManagementManagementAndPersonal,
    feeding: ManagementFeeding,
    drinking: ManagementDrinking,
    controll: ManagementControll,
    health: ManagementHealth,
	notes: ManagementNotes
}

const currentQuestionnaireComponent = computed(() => {
	const current = navigationStore.currentQuestionnaire as keyof typeof questionnaireComponents;
	return questionnaireComponents[current] || null;
});

const goToNextQuestionnaire = () => {
	const next = navigationStore.getNextQuestionnaire(navigationStore.currentQuestionnaire);
	if (next) {
		navigationStore.setCurrentQuestionnaire(next);
	}
};

const goToPreviousQuestionnaire = () => {
	const previous = navigationStore.getPreviousQuestionnaire(navigationStore.currentQuestionnaire);
	if (previous) {
		navigationStore.setCurrentQuestionnaire(previous);
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

const saveManagement = async () => {
    if (!farmId) {
        console.error("Farm ID is missing");
        return;
    }

	Object.entries(temporaryAnswerStore.answers).forEach(([key, { value, id }]) => {
		const origValue = originalAnswers.value[key]?.value;
		if (JSON.stringify(value) === JSON.stringify(origValue)) {
			return;
		}

		answerStore.saveAnswer(farmId, key, { value, id });
	});

	temporaryAnswerStore.resetStore();
	navigationStore.reset();
    router.push({ name: 'ti', query: { farmId: farmId } });
};


onMounted(async () => {
	try {
		answerLoaded.value = false;
		originalAnswers.value = answerStore.getAnswersByFarmIdAndSection(farmId, 'management');

		const rawAnswers = originalAnswers.value;
		Object.entries(rawAnswers).forEach(([key, { value, id }]) => {
			temporaryAnswerStore.saveAnswer(key, value, id);
		});
	} catch (error) {
		console.error("Was not able to load answers from store: ", error);
	} finally {
		answerLoaded.value = true;
	}
});

</script>