<template>
    <div class="sm:ml-64 bg-slate-100 fixed bottom-0 top-0 right-0 left-0 overflow-auto">
        <div class="p-4 mt-14 w-8/12 mx-auto" v-if="state.tinyUrl">
            <RouterLink to="/links" class="flex items-center hover:underline text-lg mb-4">
                <IconLeftArrow/>
                <p>Back to Links</p>
            </RouterLink>
            <div class="flex p-4 bg-white rounded-md gap-4 mb-8">
                <div class="flex gap-4">
                    <div class="flex justify-center items-center w-14 h-14 border-2 rounded-full" v-if="state.tinyUrl.long_url">
                        <img :src="getImageSrc(state.tinyUrl.long_url)" alt="Rounded avatar">
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-col">
                        <a class="text-xl font-bold">{{ state.tinyUrl.title }}</a>
                        <a target="_blank" :href="getTinyUrl(state.tinyUrl.custom_back_half ? state.tinyUrl.custom_back_half : state.tinyUrl.id)" class="font-bold text-sky-600">{{ state.tinyUrl.custom_back_half ? state.tinyUrl.custom_back_half : state.tinyUrl.id }}</a>
                        <a target="_blank" :href="state.tinyUrl.long_url" class="text-sm">{{ state.tinyUrl.long_url }}</a>
                        </div>
                        <div class="mt-auto flex">
                        <IconCalendar/>
                        <p class="text-sm ml-2">{{ formattedDate(new Date(state.tinyUrl.created_at)) }}</p>
                        </div>
                    </div>
                </div>
                <div class="ml-auto flex gap-3.5 items-start shrink-0">
                    <button class="flex border-2 bg-slate-100 px-2  py-1 rounded-md items-center font-semibold" @click="copyText(getTinyUrl(state.tinyUrl.id), state.tinyUrl.id)">
                        <IconCopy/>
                        {{ state.tinyUrl.copied ? 'Copied' : 'Copy' }}
                    </button>
                    <button type="button" @click="openEditModal(state.tinyUrl)" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        <IconEdit/>
                    </button>
                    <button type="button" @click="openDeleteModal(state.tinyUrl.id)" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        <IconDelete/>
                    </button>
                </div>
            </div>

            <div class="p-5 bg-white mb-8" v-if="state.engagementChartData.length">
                <p class="font-semibold">Engagements over time</p>
                <div class="flex flex-column justify-center">
                    <Bar
                        id="my-chart-id"
                        :options="chartOptions"
                        :data="state.engagementChartData"
                        style="height: 300px; width: 600px"
                    />
                </div>
            </div>

            <div class="p-5 bg-white mb-8" v-if="state.locations.length">
                <p class="font-semibold">Locations</p>
                <div class="flex flex-column justify-center">
                    <Bar
                        id="my-chart-id"
                        :options="chartOptions"
                        :data="state.locations"
                        style="height: 300px; width: 600px"
                    />
                </div>
            </div>

            <div class="p-5 bg-white" v-if="state.deviceChartData.length">
                <p class="font-semibold">Device Types</p>
                <div class="flex flex-column justify-center">
                    <Doughnut
                        :options="barChartOptions"
                        :data="state.deviceChartData"
                    />
                </div>
            </div>

            <!-- empty state if no analytics found -->
            <div v-if="!state.engagementChartData.length && !state.locations.length && !state.deviceChartData.length" class="flex flex-col items-center justify-center h-96">
                <p class="text-lg font-semibold">No analytics found for this link</p>
            </div>
        </div>

    </div>
   
<DeleteUrlModal v-if="isDeleteModalOpen" @closeDeleteModal="closeModal" @submitDeleteDetails="deleteUrl"/>

<EditUrlDetailsModal v-if="isEditModalOpen" :editUrlDetails="editUrlDetails" @closeEditModal="closeEditModal" @submitEditDetails="submitEditDetails"/>

</template>

<script setup lang="ts">
import IconCalendar from '@/components/icons/IconCalendar.vue';
import IconCopy from '@/components/icons/IconCopy.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue';
import { useTinyUrlStore, type tinyUrlDto } from '../stores/tinyUrl';
import { onMounted, reactive, ref } from 'vue';
import EditUrlDetailsModal from '@/components/EditUrlDetailsModal.vue';
import DeleteUrlModal from '@/components/DeleteUrlModal.vue';
import { useRoute, useRouter } from 'vue-router';
import { Bar, Doughnut } from 'vue-chartjs';
import { ArcElement } from 'chart.js';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

const chartOptions = {
    responsive: true,
    height: 200,
}

const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
}

const tinyUrlStore = useTinyUrlStore();

const router = useRouter();

const isDeleteModalOpen = ref(false);

const deleteId = ref('');

const isEditModalOpen = ref(false);

const editUrlDetails = ref<Partial<tinyUrlDto>>({
    title: '',
    custom_back_half: '',
    id: '',
});



const state: { tinyUrl: tinyUrlDto, engagementChartData: any, locations: any, deviceChartData: any } = reactive({
    tinyUrl: {
        id: '',
        title: '',
        long_url: '',
        custom_back_half: '',
        created_at: '',
        copied: false,
        qr_code: '',
    },
    engagementChartData: [],
    locations: [],
    deviceChartData: []
});

const route = useRoute();
const urlId = route.params.id;

onMounted(async () => {
    const response = await tinyUrlStore.getTinyUrlDetails(urlId.toString());
    state.tinyUrl = response.data;
    state.engagementChartData = {
        labels: response.data.engagement_over_time.map((e: { date: string }) => e.date),
        datasets: [{
            label: 'Clicks',
            backgroundColor: '#3182CE',
            borderColor: '#3182CE',
            borderWidth: 1,
            barPercentage: 1,
            barThickness: 60,
            maxBarThickness: 18,
            minBarLength: 2,
            categoryPercentage: 1,
            data: response.data.engagement_over_time.map((e: { clicks: number }) => e.clicks),
        }]
    }
    state.locations = {
        labels: response.data.locations.map((e: { country: string }) => e.country),
        datasets: [{
            label: 'Clicks',
            backgroundColor: '#3182CE',
            borderColor: '#3182CE',
            borderWidth: 1,
            barPercentage: 1,
            barThickness: 60,
            maxBarThickness: 18,
            minBarLength: 2,
            categoryPercentage: 1,
            data: response.data.locations.map((e: { clicks: number }) => e.clicks),
        }]
    }
    state.deviceChartData = {
        labels: response.data.device_data.map((e: { browser: string, os: string, device_type: string }) => `${e.device_type} - ${e.browser} - ${e.os}`),
        datasets: [{
            label: 'Clicks',
            backgroundColor: ['#3182CE', '#63B3ED', '#93C5FD', '#A5B4FC', '#C4B5FD', '#D1BCFD', '#E0E7FF', '#E5E7FF', '#E7E9FF', '#E9EDFF', '#F0F5FF', '#F5F8FF', '#F8FAFF', '#FAFCFF', '#FCFDFF', '#FDFEFF'],
            data: response.data.device_data.map((e: { clicks: number }) => e.clicks),
        }],
    }
})

function formattedDate(dateObject: { toLocaleDateString: (arg0: string, arg1: { year: string; month: string; day: string; }) => void; }) {
    return dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    });
}

// Function to construct the image source dynamically
const getImageSrc = (url: string, size = 32) => {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
};


function getTinyUrl(id: string) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    return `${backendUrl}/url/${id}`;
}

async function copyText(textToCopy: string, id: string) {
    try {
        await navigator.clipboard.writeText(textToCopy);
        const obj = state.tinyUrl;
        if (obj?.copied) return;
        obj && (obj.copied = true);
        setTimeout(() => {
            obj && (obj.copied = false);
        }, 2000); // Reset success message after 2 seconds
    } catch (error) {
        console.error('Failed to copy text: ', error);
    }
}

function openDeleteModal(id: string) {
    deleteId.value = id;
    isDeleteModalOpen.value = true;
}

function closeModal() {
    isDeleteModalOpen.value = false;
};

async function deleteUrl() {
    isDeleteModalOpen.value = false;
    const deleteResponse = await tinyUrlStore.deleteTinyUrl(deleteId.value);
    if (deleteResponse.status == "success") {
        const response = await tinyUrlStore.getTinyUrlDetails(urlId.toString());
        state.tinyUrl = response.data;
        router.push('/links');
    }
}

function openEditModal(url: tinyUrlDto) {
    editUrlDetails.value = url;
    isEditModalOpen.value = true;
}

function closeEditModal() {
    isEditModalOpen.value = false;
};

async function submitEditDetails(url: Partial<tinyUrlDto>) {
    const response = await tinyUrlStore.updateTinyUrl(url);
    if (response.status == "success") {
        isEditModalOpen.value = false;
        const response = await tinyUrlStore.getTinyUrlDetails(urlId.toString());
        state.tinyUrl = response.data;
    }
}
</script>