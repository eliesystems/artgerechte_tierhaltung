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
				@click="saveResources">
				Speichern und weiter zum Management
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import ResourceSingleBox from '@/components/rf/ResourceSingleBox.vue';
import ResourceGroupBox from '@/components/rf/ResourceGroupBox.vue';
import ResourceInfrastructure from '@/components/rf/ResourceInfrastructure.vue';
import ResourcesCompanyStructureAndAreas from '@/components/rf/ResourcesCompanyStructureAndAreas.vue';
import ResourceGrazing from '@/components/rf/ResourceGrazing.vue';
import ResourceWeatherProtection from '@/components/rf/ResourceWeatherProtection.vue';
import ResourceOutlet from '@/components/rf/ResourceOutlet.vue';
import ResourceGroundSecurityStableAisle from '@/components/rf/ResourceGroudSecurityStableAisle.vue';
import ResourceClimateAndLight from '@/components/rf/ResourceClimateAndLight.vue';
import ResourceStableBedding from '@/components/rf/ResourceStableBedding.vue';
import ResourceFence from '@/components/rf/ResourceFence.vue';
import ResourceNotes from '@/components/rf/ResourceNotes.vue';

import { computed, onMounted, ref } from 'vue';
import { useNavigationStore } from '@/stores/resourceNavigationStore';
import { useRouter } from 'vue-router';
import { useTemporaryAnswerStore } from '@/stores/temporaryAnswerStore';
import { useAnswerStore } from '@/stores/answerStore';

const navigationStore = useNavigationStore();
const router = useRouter();
const farmId = router.currentRoute.value.query.farmId as string;
const answerLoaded = ref(false);

const answerStore = useAnswerStore();
const temporaryAnswerStore = useTemporaryAnswerStore();
const originalAnswers = ref<Record<string, {value:any;id?:number}>>({});

const questionnaireComponents = {
	companyStructure: ResourcesCompanyStructureAndAreas,
	infrastructure: ResourceInfrastructure,
	singleBox: ResourceSingleBox,
	groupBox: ResourceGroupBox,
	grazing: ResourceGrazing,
	weatherProtection: ResourceWeatherProtection,
	outlet: ResourceOutlet,
	groundSecurityStableAisle: ResourceGroundSecurityStableAisle,
	climateAndLight: ResourceClimateAndLight,
	stableBedding: ResourceStableBedding,
	fence: ResourceFence,
	notes: ResourceNotes,
};

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

const saveResources = async () => {
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
    router.push({ name: 'mf', query: { farmId: farmId } });
};


onMounted(async () => {
	try {
		originalAnswers.value = answerStore.getAnswersByFarmIdAndSection(farmId, 'resources');

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