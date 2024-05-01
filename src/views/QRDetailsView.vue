<template>
     <div class="sm:ml-64 bg-slate-100 fixed bottom-0 top-0 right-0 left-0 overflow-auto">
        <div class="p-4 mt-14 w-8/12 mx-auto">
            <RouterLink to="/qrcodes" class="flex items-center hover:underline text-lg mb-4">
                <IconLeftArrow/>
                <p>Back to QR Codes</p>
            </RouterLink>
            <QrCodeListItem :qrCode="state.qrCode" :showViewDetails="false"/>

            <div class="p-5 bg-white mb-8" v-if="state.engagementChartData.datasets.length">
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

            <div class="p-5 bg-white mb-8" v-if="state.locations.datasets.length">
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

            <div class="p-5 bg-white mb-8" v-if="state.deviceChartData.datasets.length">
                <p class="font-semibold">Device Types</p>
                <div class="flex flex-column justify-center">
                    <Doughnut
                        :options="barChartOptions"
                        :data="state.deviceChartData"
                    />
                </div>
            </div>

            <!-- empty state if no analytics found -->
            <div v-if="!state.engagementChartData.datasets.length && !state.locations.datasets.length && !state.deviceChartData.datasets.length" class="flex flex-col items-center justify-center h-96">
                <p class="text-lg font-semibold">No analytics found for this link</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import QrCodeListItem from '@/components/QrCodeListItem.vue';
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue';
import { useQrCodeStore, type qrCodeDto } from '@/stores/qrCode';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { Bar, Doughnut } from 'vue-chartjs';
import { ArcElement } from 'chart.js';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { buildEngagementChartData, buildLocationsChartData, buildDeviceChartData } from '../utils/chartDataUtils';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

const chartOptions = {
    responsive: true,
    height: 200,
}

const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
}

const state: { qrCode: qrCodeDto, engagementChartData: any, locations: any, deviceChartData: any } = reactive({
    qrCode: {
        id: '',
        title: '',
        long_url: '',
        custom_back_half: '',
        created_at: '',
        copied: false,
        qr_code: '',
        url_id: '',
    },
    engagementChartData: { labels: [], datasets: [] },
    locations: { labels: [], datasets: [] },
    deviceChartData: { labels: [], datasets: [] }
});

const qrCodeStore = useQrCodeStore();

const route = useRoute();
const urlId = route.params.id;

onMounted(async () => {
    const response = await qrCodeStore.getQrCodeDetails(urlId.toString());
    state.qrCode = response.data;
    response.data.engagement_over_time && response.data.engagement_over_time.length && (state.engagementChartData = buildEngagementChartData(response.data.engagement_over_time));
    response.data.locations && response.data.locations.length && (state.locations = buildLocationsChartData(response.data.locations));
    response.data.device_data && response.data.device_data.length && (state.deviceChartData = buildDeviceChartData(response.data.device_data));
})

</script>