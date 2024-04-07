<template>
  <div class="sm:ml-64 bg-slate-100 fixed bottom-0 top-0 right-0 left-0 overflow-auto">
     <div class="p-4 mt-14 w-8/12 mx-auto">
      <p class="text-3xl">Links</p>
      <hr class="h-px mt-4 mb-8 bg-gray-200 border-0 dark:bg-gray-700">
       
      <div v-if="state.tinyUrlList.length > 0">
        <div class="flex p-4 bg-white rounded-md gap-4 mb-8" v-for="tinyUrl in state.tinyUrlList" :key="tinyUrl.id">

          <div class="flex gap-4">
            <div class="flex justify-center items-center w-14 h-14 border-2 rounded-full">
              <img :src="getImageSrc(tinyUrl.long_url)" alt="Rounded avatar">
            </div>

            <div class="flex flex-col gap-4">
              <div class="flex flex-col">
                <p class="text-xl font-bold">{{ tinyUrl.title }}</p>
                <a target="_blank" :href="getTinyUrl(tinyUrl.custom_back_half ? tinyUrl.custom_back_half : tinyUrl.id)" class="font-bold text-sky-600">{{ tinyUrl.custom_back_half ? tinyUrl.custom_back_half : tinyUrl.id }}</a>
                <a target="_blank" :href="tinyUrl.long_url" class="text-sm">{{ tinyUrl.long_url }}</a>
              </div>
  
              <div class="mt-auto flex">
                <IconCalendar/>
                <p class="text-sm ml-2">{{ formattedDate(new Date(tinyUrl.created_at)) }}</p>
              </div>
            </div>

          </div>

          <div class="ml-auto flex gap-3.5 items-start shrink-0">
            <button class="flex border-2 bg-slate-100 px-2  py-1 rounded-md items-center font-semibold" @click="copyText(getTinyUrl(tinyUrl.id), tinyUrl.id)">
              <IconCopy/>
              {{ tinyUrl.copied ? 'Copied' : 'Copy' }}
            </button>
            <button type="button" @click="openEditModal(tinyUrl)" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              <IconEdit/>
            </button>
            <button type="button" @click="openDeleteModal(tinyUrl.id)" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              <IconDelete/>
            </button>
            <button type="button"
              class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              View Details
            </button>
          </div>

        </div>
      </div>

      <div v-if="state.tinyUrlList.length === 0" class="text-center mt-8">
          <p class="text-lg mb-8">No Tiny Urls found</p>
          <RouterLink to="/create" class="text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded w-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create Tiny Url</RouterLink>
      </div>
     </div>
  </div>

  <div v-if="isDeleteModalOpen" class="overflow-y-auto overflow-x-hidden fixed border-8 top-50 right-50 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" @click="closeModal" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4 md:p-5 text-center">
                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this url?</h3>
                <button type="button" @click="deleteUrl" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Yes, I'm sure
                </button>
                <button @click="closeModal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
            </div>
        </div>
    </div>
  </div>

<EditUrlDetailsModal v-if="isEditModalOpen" :editUrlDetails="editUrlDetails" @closeEditModal="closeEditModal" @submitEditDetails="submitEditDetails"/>

</template>
<script setup lang="ts">
import IconCalendar from '@/components/icons/IconCalendar.vue';
import IconCopy from '@/components/icons/IconCopy.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import { useTinyUrlStore, type tinyUrlListDto } from '../stores/tinyUrl';
import { onMounted, reactive, ref, computed } from 'vue';
import EditUrlDetailsModal from '@/components/EditUrlDetailsModal.vue';
import { useForm } from 'vee-validate';

const tinyUrlStore = useTinyUrlStore();

const state: { tinyUrlList: tinyUrlListDto[] } = reactive({ tinyUrlList: [] });

const isDeleteModalOpen = ref(false);

const deleteId = ref('');

const isEditModalOpen = ref(false);

const editUrlDetails = ref<Partial<tinyUrlListDto>>({
  title: '',
  custom_back_half: '',
  id: '',
});



onMounted(async () => {
  const response = await tinyUrlStore.getAllTinyUrlList();
  state.tinyUrlList = response.data.map((d: tinyUrlListDto) => ({ ...d, copied: false }));
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
    const obj = state.tinyUrlList.find(t => t.id == id);
    if(obj?.copied) return;
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
      const response = await tinyUrlStore.getAllTinyUrlList();
      state.tinyUrlList = response.data.map((d: tinyUrlListDto) => ({ ...d, copied: false }));
  }
}

function openEditModal(url: tinyUrlListDto) {
  editUrlDetails.value = url;
  isEditModalOpen.value = true;
}

function closeEditModal() {
  isEditModalOpen.value = false;
};

async function submitEditDetails(url: Partial<tinyUrlListDto>) {
  const response = await tinyUrlStore.updateTinyUrl(url);
  if (response.status == "success") {
    isEditModalOpen.value = false;
    const response = await tinyUrlStore.getAllTinyUrlList();
    state.tinyUrlList = response.data.map((d: tinyUrlListDto) => ({ ...d, copied: false }));
  }
}
</script>
