import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'

export interface createTinyUrlPayloadDto {
  long_url: string;
  title?: string | null;
  custom_back_half?: string | null;
  generate_qr?: boolean;
}

export interface tinyUrlListDto {
  long_url: string;
  title?: string | null;
  custom_back_half?: string | null;
  qr_code?: string | null
  id: string;
  expiration: string;
  created_at: string;
  copied?: boolean;
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
    if (response.status == 'success') {
      console.log(response)
    } else {
      error.value = response;
    }
  }

  async function getAllTinyUrlList() {
    const response = await $http.get('/url');
    if (response.status == 'success') {
      return response;
    } else {
      error.value = response;
      return error;
    }
  }

  async function deleteTinyUrl(id: string) {
    const response = await $http.delete(`/url/${id}`);
    if (response.status == 'success') {
      return response;
    } else {
      error.value = response;
      return error;
    }
  }

  async function updateTinyUrl(editUrlDetails: Partial<tinyUrlListDto>) {
    const response = await $http.put(`/url`, editUrlDetails);
    if (response.status == 'success') {
      return response;
    } else {
      error.value = response;
      return error;
    }
  }

  return {
    tinyUrl,
    createTinyUrl,
    getAllTinyUrlList,
    deleteTinyUrl,
    updateTinyUrl,
    error
  }

})
