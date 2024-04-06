import { defineStore } from "pinia";
import { inject, ref } from "vue";

export interface qrCodeDto {
    id: string;
    url_id: string;
    qr_code: string;
    created_at: string;
    copied?: boolean;
    title?: string;
    long_url: string;
    custom_back_half?: string;
}

export const useQrCodeStore = defineStore('qr-code', () => {
    const $http = inject<any>('$http')!;

    const error = ref({
        explanation: '',
        name: '',
        message: ''
    });

    async function getAllQrCodeList() {
        const response = await $http.get('/qr-code');
        console.log("response", response)
        if (response.status == 'success') {
            return response;
        } else {
            error.value = response;
            return error;
        }
    }

    return {
        getAllQrCodeList,
        error
    }

})