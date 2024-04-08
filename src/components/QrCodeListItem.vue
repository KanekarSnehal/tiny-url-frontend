<template>
    <div class="flex p-6 bg-white rounded-md gap-4 mb-8">

      <div class="flex gap-4">
        <img class="w-30 h-30 border border-gray-300 rounded-md" :src="qrCode.qr_code" alt="QR Code">

        <div class="flex flex-col gap-4">
          <div class="flex flex-col">
            <p @click="navigateToDetails(qrCode.id)" class="text-xl font-bold">{{ qrCode.title }}</p>
            <a target="_blank" :href="getTinyUrl(qrCode.custom_back_half ? qrCode.custom_back_half : qrCode.url_id)" class="font-bold text-sky-600">{{ qrCode.custom_back_half ? qrCode.custom_back_half : qrCode.url_id }}</a>
            <a target="_blank" :href="qrCode.long_url" class="text-sm">{{ qrCode.long_url }}</a>
          </div>

          <div class="mt-auto flex">
            <IconCalendar/>
            <p class="text-sm ml-2">{{ formattedDate(new Date(qrCode.created_at)) }}</p>
          </div>
        </div>

      </div>

      <div class="ml-auto flex gap-3.5 shrink-0 items-start">
        <div class="relative inline-block text-left">
          <button type="button" @click="toggleDownloadMenu"
              class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              <IconDownload/>
          </button>

          <!-- Dropdown menu -->
          <div class="absolute origin-center z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700" v-if="showDownloadMenu">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <div class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer" @click="downloadImage('jpeg')">Download JPEG</div>
                </li>
                <li>
                  <div class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer" @click="downloadImage('png')">Download PNG</div>
                </li>
                <li>
                  <div class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer" @click="downloadImage('svg')">Download SVG</div>
                </li>
              </ul>
          </div>
        </div>

        <button @click="navigateToDetails(qrCode.id)" type="button"
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            View Details
        </button>
        
      </div>

    </div>
</template>

<script setup lang="ts">
import IconCalendar from '@/components/icons/IconCalendar.vue';
import IconDownload from '@/components/icons/IconDownload.vue';
import type { qrCodeDto } from '@/stores/qrCode';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    qrCode: {
        type: Object as () => qrCodeDto,
        required: true,
    },
});

const router = useRouter();

const showDownloadMenu = ref(false);

function toggleDownloadMenu() {
    showDownloadMenu.value = !showDownloadMenu.value;
}

const emit = defineEmits(['viewQrCodeDetails']);

function formattedDate(dateObject: { toLocaleDateString: (arg0: string, arg1: { year: string; month: string; day: string; }) => void; }) {
  return dateObject.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });
}

function getTinyUrl(id: string) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return `${backendUrl}/url/${id}`;
}

function downloadImage(type: string) {
    const link = document.createElement('a');
    link.href = props.qrCode.qr_code;
    switch (type) {
        case 'jpeg':
            // Download JPEG image
            link.download = 'qr-code.jpeg';
            break;
        case 'png':
            // Download PNG image
            link.download = 'qr-code.png';
            break;
        case 'svg':
            // Download SVG image
            link.download = 'qr-code.svg';
            break;
        default:
           // Default to PNG if format is not specified or invalid
            link.download = 'image.png';
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function navigateToDetails(id: string) {
  router.push(`/qrcodes/${id}/details`);
}

</script>