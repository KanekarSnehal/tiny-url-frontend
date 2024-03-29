import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'

export interface createTinyUrlPayloadDto {
  long_url: string,
  title?: string | null,
  custom_back_half?: string | null,
  generate_qr?: boolean
}

export const useTinyUrlStore = defineStore('url', () => {
  const $http = inject<any>('$http')!;
  const tinyUrl = ref<createTinyUrlPayloadDto>({
    long_url: '',
    title: '',
    custom_back_half: '',
    generate_qr: false
  });

  const error = ref({
    explanation: '',
    name: '',
    message: ''
  });

  async function createTinyUrl(tinyUrlDetails: createTinyUrlPayloadDto) {
    const response = await $http.post('/url', tinyUrlDetails);
    console.log(response);
    if (response.status == 'success') {
      console.log(response)
    } else {
      error.value = response;
    }
  }

  return {
    tinyUrl,
    createTinyUrl,
    error
  }

})
