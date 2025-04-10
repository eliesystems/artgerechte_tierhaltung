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


    <div v-if="showQuestionaires" class="fixed inset-0 flex items-center justify-center bg-gray-400/50 z-50">
        <form>
            <FloatingCard>
                <RouterLink :to="{ name: 'rf', query: { farmId: farmId } }" class="flex items-center p-4 mb-4 hover:bg-[#f2f2f2] hover:cursor-pointer rounded-lg border border-color-black hover:border-[#d1a62c]">
                    <div class="text-base font-medium">
                        Ressourcenbezogene Fragen
                    </div>
                </RouterLink>
                <RouterLink to="/mf" class="flex items-center p-4 mb-4 hover:bg-[#f2f2f2] hover:cursor-pointer rounded-lg border border-color-black hover:border-[#d1a62c]">
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
        <div class="flex justify-between">
            <button @click="showForm = !showForm"
                    class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Neue Farm erstellen +
            </button>
            <button @click="authStore.logout()"
                    class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Logout
            </button>
        </div>
    </div>
    <div v-if="showForm" class="fixed inset-0 flex items-center justify-center z-50 bg-gray-400/50">
        <FloatingCard cardClass="max-w-full md:max-w-lg">
            <form class="w-full max-w-lg" @submit.prevent="addFarm">
                <div class="text-base font-medium -mx-3 mb-4">
                    Füge eine neue Farm hinzu
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
                <div class="flex justify-between items-center">
                    <button type="submit"
                            class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Farm erstellen
                    </button>
                    <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                            @click="handleCancel">
                        Abbrechen
                    </button>
                </div>
            </form>
        </FloatingCard>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onUnmounted, onMounted } from 'vue';
import type { CreateFarmDto, Farm } from '@/composables/model/farmDtos';
import { useAuthStore } from '@/stores/authStore';
import { createFarm, getFarms } from '@/composables/services/farm';
import FloatingCard from './common/FloatingCard.vue';;

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

const farms = ref<Farm[]>();

onMounted(async () => {
	try {
        const response = await getFarms();
        farms.value = response;
	} catch (error) {
		console.error('Error fetching farms');
	}
});

const addFarm = async () => {
    if (!formData.name || !formData.person_in_charge || !formData.zip_code || !formData.place) {
        alert('Bitte alle Felder ausfüllen!');
        return;
    } else {
        try {
            const response = await createFarm(formData);
			if (response) {
				farms.value?.push(response);
			}
        } catch (error) {
			console.error('Error creating farm');
        } finally {
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

