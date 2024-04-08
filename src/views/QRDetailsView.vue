<template>
     <div class="sm:ml-64 bg-slate-100 fixed bottom-0 top-0 right-0 left-0 overflow-auto">
        <div class="p-4 mt-14 w-8/12 mx-auto">
            <RouterLink to="/qrcodes" class="flex items-center hover:underline text-lg mb-4">
                <IconLeftArrow/>
                <p>Back to QR Codes</p>
            </RouterLink>
            <QrCodeListItem :qrCode="state.qrCode"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import QrCodeListItem from '@/components/QrCodeListItem.vue';
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue';
import { useQrCodeStore, type qrCodeDto } from '@/stores/qrCode';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';


const state: { qrCode: qrCodeDto } = reactive({
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
});

const qrCodeStore = useQrCodeStore();

const route = useRoute();
const urlId = route.params.id;

onMounted(async () => {
    const response = await qrCodeStore.getQrCodeDetails(urlId.toString());
    state.qrCode = response.data;
})

</script>