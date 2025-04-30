<template>
	<div v-for="(farm, index) in farms" :key="index" class="mt-2 w-full">
		<button @click="toggleQuestionnaire(farm)" class="w-full text-left">
			<div class="group flex items-center p-4 hover:bg-[#f2f2f2] hover:cursor-pointer rounded-lg border border-color-black hover:border-[#d1a62c]">
				<div class="bg-black text-white text-lg font-bold w-10 h-10 flex items-center justify-center rounded-lg mr-3 group-hover:bg-[#d1a62c] group-hover:text-black">
					{{ index + 1 }}
				</div>
				<div class="flex flex-col items-start">
					<div class="text-base font-medium">
						{{ farm.name }}
					</div>
					<div class="text-sm text-gray-500 font-normal">
						{{ farm.zip_code + ", " + farm.name + ", Ansprechperson: " + farm.person_in_charge }}
					</div>
				</div>
			</div>
		</button>
	</div>


    <div v-if="syncingData" class="fixed inset-0 flex items-center justify-center z-50 bg-gray-400/50">
        <FloatingCard>
            <svg
                aria-hidden="true"
                class="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-[#d1a62c] mr-2"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span>
                Synchronisiere Daten...
            </span>
        </FloatingCard>
    </div>


    <div v-if="showQuestionaires" class="fixed inset-0 flex items-center justify-center bg-gray-400/50 z-50">
        <form>
            <FloatingCard>
                <RouterLink :to="{ name: 'rf', query: { farmId: farmId } }" class="flex items-center p-4 mb-4 hover:bg-[#f2f2f2] hover:cursor-pointer rounded-lg border border-color-black hover:border-[#d1a62c]">
                    <div class="text-base font-medium">
                        Ressourcenbezogene Fragen
                    </div>
                </RouterLink>
                <RouterLink :to="{ name: 'mf', query: { farmId: farmId } }" class="flex items-center p-4 mb-4 hover:bg-[#f2f2f2] hover:cursor-pointer rounded-lg border border-color-black hover:border-[#d1a62c]">
                    <div class="text-base font-medium">
                        Managementbezogene Fragen
                    </div>
                </RouterLink>
                <RouterLink :to="{ name: 'ti', query: { farmId: farmId } }" class="flex items-center p-4 mb-4 hover:bg-[#f2f2f2] hover:cursor-pointer rounded-lg border border-color-black hover:border-[#d1a62c]">
                    <div class="text-base font-medium">
                        Tierbezogene Indikatoren
                    </div>
                </RouterLink>
                <div>
                    <button @click="showQuestionaires = !showQuestionaires"
                            class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Zurück
                    </button>
                </div>
            </FloatingCard>
        </form>
    </div>
    <div class="h-full flex flex-col justify-end">
        <div class="flex justify-between mb-5 py-3">
            <button @click="showForm = !showForm"
                    class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Neue Farm erstellen +
            </button>
            <button @click="handleLogout"
                    class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Logout
            </button>
        </div>
    </div>


    <div v-if="showForm" class="fixed inset-0 flex items-center justify-center z-50 bg-gray-400/50">
        <FloatingCard cardClass="max-w-full md:max-w-lg">
            <form class="w-full max-w-lg" @submit.prevent="addFarm">
                <fieldset :disabled="savingFarm">
                    <div class="text-base font-medium -mx-3 mb-4">
                        Füge einen neuen Betrieb hinzu
                    </div>
                    <div class="flex flex-col -mx-3 mb-6">
                        <label for="name" class="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Betriebsname
                        </label>
                        <input
                            v-model="formData.name"
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            id="name"
                            placeholder="Betrieb">
                    </div>
                    <div class="flex flex-col -mx-3 mb-6">
                        <label for="person_in_charge" class="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Ansprechperson
                        </label>
                        <input
                            v-model="formData.person_in_charge"
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            id="person_in_charge"
                            placeholder="Ansprechperson">
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                for="zip_code"
                                class="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Postleitzahl
                            </label>
                            <input
                                v-model="formData.zip_code"
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="number"
                                id="zip_code"
                                placeholder="PLZ">
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label for="place" class="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Ort
                            </label>
                            <input v-model="formData.place"
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" id="place" placeholder="Ort">
                        </div>
                    </div>
                </fieldset>
                <div class="flex justify-between items-center">
                    <button
                        type="submit"
                        class="flex items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        :disabled="savingFarm">
                        <svg
                            v-if="savingFarm"
                            aria-hidden="true"
                            class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-[#d1a62c] mr-2"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        {{ savingFarm ? "Betrieb wird gespeichert..." : "Farm erstellen" }}
                    </button>
                    <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                            @click="handleCancel"
                            :disabled="savingFarm">
                        Abbrechen
                    </button>
                </div>
            </form>
        </FloatingCard>
    </div>


</template>

<script setup lang="ts">
import { reactive, ref, watch, onUnmounted, onMounted, computed } from 'vue';
import type { CreateFarmDto, Farm } from '@/composables/model/farmDtos';
import { useAuthStore } from '@/stores/authStore';
import { createFarm, getFarms } from '@/composables/services/farm';
import FloatingCard from './common/FloatingCard.vue';
import { usefarmsStore } from '@/stores/farmStore';
import { useAnswerStore } from '@/stores/answerStore';
import { createAnswers, getAnswersByFarmId, updateAnswers } from '@/composables/services/answer';
import { v4 as uuid } from 'uuid';
import type { Answer, CreateAnswerDto, UpdateAnswersDto } from '@/composables/model/answerDtos';
import { useRouter } from 'vue-router';
import { healthCheck } from '@/composables/services/health';

const syncingData = ref(false);
const savingFarm = ref(false);
const router = useRouter();
const farmStore = usefarmsStore();
const answerStore = useAnswerStore();
const authStore = useAuthStore();
const showForm = ref(false);
const showQuestionaires = ref(false);

const farmId = ref<string>();
const toggleQuestionnaire = (farm: Farm) => {
  	farmId.value = farm.id;
  	showQuestionaires.value = !showQuestionaires.value;
};

const formData = reactive<CreateFarmDto>({
    name: '',
    person_in_charge: '',
    zip_code: 0,
    place: ''
});

const farms = computed(() => farmStore.farms);

onMounted(async () => {
	const route = router.currentRoute.value;

	const hasUnsyncedFarms = farmStore.farms.some(f => f.unsynced);
	const hasUnsyncedAnswers = Object.values(answerStore.answers).some(
		answerMap => Object.values(answerMap).some(a => a.dirty)
	);

	if (route.query.login === 'true') {
		if (hasUnsyncedFarms || hasUnsyncedAnswers) {
			await syncFarms();
		} else {
			await preload();
		}
		router.replace({ path: '/home' });
	} else if (route.query.sync === 'true') {
		await syncFarms();
		router.replace({ path: '/home' });
	}
});

const handleLogout = async () => {
    try {
        await syncFarms();
    } finally {
        if (await healthCheck()) {    
            alert('ACHTUNG! Es ist keine Internetverbindung vorhanden, Daten können verloren gehen.');
            return;
        }

        farmStore.$reset();
        answerStore.$reset();

        authStore.logout();
    }
}

const preload = async () => {
    try {
        const response = await getFarms();
        farmStore.setFarms(response);

        for (const farm of response) {
            try {
                const allAnswers = await getAnswersByFarmId(farm.id);

                allAnswers.forEach(answer => {
                    const val = answer.string_answer ?? answer.numeric_answer ?? 
                        answer.string_array_answer ?? answer.numeric_array_answer;

                    if (val !== undefined && val !== null) {
                        answerStore.updateAnswer(farm.id, answer.question_key, { value: val, id: answer.id });
                    }
                });
                console.info("fetched answers");
            } catch (error) {
                console.error("failed to fetch answers: ", error);
            }
        }
        console.info("Pre loaded farms and answers");
    } catch (error) {
        console.error("Failed to preload: ", error);
    }
}

const syncFarms = async () => {
    const isOnline = await healthCheck();
    if (isOnline) {
        for (const farm of [...farmStore.farms]) {
            if (farm.unsynced === true) {
                try {
                    syncingData.value = true;
                    const oldId = farm.id;
                    const answers = answerStore.getAnswersByFarmId(farm.id);

                    const newFarm: CreateFarmDto = {
                        name: farm.name,
                        zip_code: farm.zip_code,
                        place: farm.place,
                        person_in_charge: farm.person_in_charge
                    };

                    const savedFarm = await createFarm(newFarm);

                    if (savedFarm) {
                        const index = farmStore.farms.findIndex(f => f.id === oldId);

                        if (index !== -1) {
                            farmStore.farms.splice(index, 1, savedFarm);
                            console.info("Synced farm and replaced in store");
                        }

                        const answersToSave = Object.entries(answers).map(([key, value]) => {
                            const sectionName = answerStore.getSectionFromKey(key);

                            const answerDto: CreateAnswerDto = {
                                farm_id: savedFarm.id,
                                question_key: key,
                                section: sectionName,
                                ...assignAnswerValue(value.value),
                            }

                            return answerDto;
                        })

                        const savedAnswers = await createAnswers(answersToSave);

                        savedAnswers.forEach((savedAnswer) => {
                            const value = getAnswerValue(savedAnswer);
                            answerStore.updateAnswer(savedFarm.id, savedAnswer.question_key, {
                                value: value,
                                id: savedAnswer.id,
                            });
                        });

                        delete answerStore.answers[oldId];

                        console.info("Synced answers and replaced in store");
                    }
                } catch (error) {
                    console.error("Was not able to sync data: ", error);
                } finally {
                    syncingData.value = false;
                }
            } else {
                try {
                    syncingData.value = true;
                    const answers = answerStore.getAnswersByFarmId(farm.id);
                    const answersToUpdate: UpdateAnswersDto[] = [];
                    const answersToSave: CreateAnswerDto[] = [];

                    if (answers !== undefined) {
                        Object.entries(answers).map(([key, value]) => {
                            if (value.dirty) {
                                const id = value.id;

                                if (id !== undefined && id > 0) {
                                    const updateAnswerDto: UpdateAnswersDto = {
                                        id: id,
                                        ...assignAnswerValue(value.value),
                                    }

                                    answersToUpdate.push(updateAnswerDto);
                                } else {
                                    const sectionName = answerStore.getSectionFromKey(key);

                                    const answerDto: CreateAnswerDto = {
                                        farm_id: farm.id,
                                        question_key: key,
                                        section: sectionName,
                                        ...assignAnswerValue(value.value),
                                    }
                                    
                                    answersToSave.push(answerDto);
                                }
                            }
                        });

                        if (answersToUpdate.length > 0) {
                            const updatedAnswers = await updateAnswers(answersToUpdate);

                            updatedAnswers.forEach((updatedAnswer) => {
                                const value = getAnswerValue(updatedAnswer);
                                answerStore.updateAnswer(farm.id, updatedAnswer.question_key, {
                                    value: value,
                                    id: updatedAnswer.id, 
                                });
                            });
                        }
                        
                        if (answersToSave.length > 0) {
                            const savedAnswers = await createAnswers(answersToSave);

                            savedAnswers.forEach((savedAnswer) => {
                                const value = getAnswerValue(savedAnswer);
                                answerStore.updateAnswer(farm.id, savedAnswer.question_key, {
                                    value: value,
                                    id: savedAnswer.id,
                                });
                            });
                        }
                        
                        console.info("Synced answers and replaced in store");
                    }
                } catch (error) {
                    console.error("Was not able to sync data: ", error);
                } finally {
                    syncingData.value = false;
                }
            }
        }
    } else {
        console.error("Was not able to sync data, because there is not internet connection");
    }
};

const getAnswerValue = (answer: Answer) => {
    if (answer.string_answer !== undefined && answer.string_answer !== '') {
        return answer.string_answer;
    } else if (Array.isArray(answer.string_array_answer && answer.string_array_answer.length > 0)) {
        return answer.string_array_answer;
    } else if (answer.numeric_answer !== undefined && !isNaN(answer.numeric_answer)) {
        return answer.numeric_answer;
    } else if (Array.isArray(answer.numeric_array_answer && answer.numeric_array_answer.length > 0)) {
        return answer.numeric_array_answer;
    }
};

const assignAnswerValue = (value: any) => {
    if (Array.isArray(value)) {
        if (typeof value[0] === "string") {
            return { string_array_answer: value };
        } else if (typeof value[0] === "number") {
            return { numeric_array_answer: value };
        }
    } else {
        if (typeof value === "string") {
            return { string_answer: value };
        } else if (typeof value === "number") {
            return { numeric_answer: value };
        }
    }
};

const addFarm = async () => {
    if (!formData.name || !formData.person_in_charge || !formData.zip_code || !formData.place) {
        alert('Bitte alle Felder ausfüllen!');
        return;
    } else {
        try {
            savingFarm.value = true;
            const isOnline = await healthCheck();
            if (isOnline) {
                const response = await createFarm(formData);
			    if (response) {
                    farmStore.farms.push(response);
			    }
            } else {
                const fakeId = uuid();
                const offlineFarm = {
                    ...formData,
                    id: fakeId,
                    unsynced: true,
                };
                farmStore.farms.push(offlineFarm);
            }           
        } catch (error) {
			console.error('Error creating farm');
        } finally {
            savingFarm.value = false;
            showForm.value = false;
            formData.name = '';
            formData.person_in_charge = '';
            formData.zip_code = 0;
            formData.place = '';
        }
    }
};

const handleCancel = () => {
    showForm.value = false;
    formData.name = '';
    formData.person_in_charge = '';
    formData.zip_code = 0;
    formData.place = '';
};

watch(showForm, (newVal) => {
    document.body.style.overflow = newVal ? "hidden" : "auto";
});

watch(showQuestionaires, (newVal) => {
    document.body.style.overflow = newVal ? "hidden" : "auto";
})

onUnmounted(() => {
    document.body.style.removeProperty("overflow");
});
</script>

