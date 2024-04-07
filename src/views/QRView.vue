<template>
  <div class="sm:ml-64 bg-slate-100 fixed bottom-0 top-0 right-0 left-0 overflow-auto">
     <div class="p-4 mt-14 w-8/12 mx-auto">
      <p class="text-3xl">QR Codes</p>
      <hr class="h-px mt-4 mb-8 bg-gray-200 border-0 dark:bg-gray-700">
       <QrCodeListItem v-for="qrCode in state.qrCodeList" :key="qrCode.id" :qrCode="qrCode" @viewQrCodeDetails="viewQrCodeDetails"/>

       <div v-if="state.qrCodeList.length === 0" class="text-center mt-8">
          <p class="text-lg mb-8">No QR Codes found</p>
          <RouterLink to="/create" class="text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded w-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create QR Code</RouterLink>
        </div>
      
     </div>
  </div>
</template>

<script setup lang="ts">
import QrCodeListItem from '@/components/QrCodeListItem.vue';
import { useQrCodeStore, type qrCodeDto } from '@/stores/qrCode';
import { onMounted, reactive, ref } from 'vue';

const qrCodeStore = useQrCodeStore();

const state: { qrCodeList: qrCodeDto[] } = reactive({ qrCodeList: [] });

onMounted(async () => {
  const response = await qrCodeStore.getAllQrCodeList();
  state.qrCodeList = response.data.map((d: qrCodeDto) => ({ ...d, copied: false }));
})

function viewQrCodeDetails(id: string) {
  console.log('View QR Code Details', id);
}

</script>
