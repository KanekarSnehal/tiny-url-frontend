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
                <p @click="navigateToDetails(tinyUrl.id)" class="text-xl font-bold">{{ tinyUrl.title }}</p>
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
            <button @click="navigateToDetails(tinyUrl.id)" type="button"
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

<DeleteUrlModal v-if="isDeleteModalOpen" @closeDeleteModal="closeModal" @submitDeleteDetails="deleteUrl"/>

<EditUrlDetailsModal v-if="isEditModalOpen" :editUrlDetails="editUrlDetails" @closeEditModal="closeEditModal" @submitEditDetails="submitEditDetails"/>

</template>
<script setup lang="ts">
import IconCalendar from '@/components/icons/IconCalendar.vue';
import IconCopy from '@/components/icons/IconCopy.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import { useTinyUrlStore, type tinyUrlDto } from '../stores/tinyUrl';
import { onMounted, reactive, ref } from 'vue';
import EditUrlDetailsModal from '@/components/EditUrlDetailsModal.vue';
import { useRouter } from 'vue-router';
import DeleteUrlModal from '@/components/DeleteUrlModal.vue';

const tinyUrlStore = useTinyUrlStore();

const state: { tinyUrlList: tinyUrlDto[] } = reactive({ tinyUrlList: [] });

const isDeleteModalOpen = ref(false);

const deleteId = ref('');

const isEditModalOpen = ref(false);

const editUrlDetails = ref<Partial<tinyUrlDto>>({
  title: '',
  custom_back_half: '',
  id: '',
});

const router = useRouter();

onMounted(async () => {
  const response = await tinyUrlStore.getAllTinyUrlList();
  state.tinyUrlList = response.data.map((d: tinyUrlDto) => ({ ...d, copied: false }));
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
      state.tinyUrlList = response.data.map((d: tinyUrlDto) => ({ ...d, copied: false }));
  }
}

function openEditModal(url: tinyUrlDto) {
  editUrlDetails.value = url;
  isEditModalOpen.value = true;
}

function closeEditModal() {
  isEditModalOpen.value = false;
};

async function submitEditDetails(url: Partial<tinyUrlDto>, urlId: string) {
  const response = await tinyUrlStore.updateTinyUrl(url, urlId);
  if (response.status == "success") {
    isEditModalOpen.value = false;
    const response = await tinyUrlStore.getAllTinyUrlList();
    state.tinyUrlList = response.data.map((d: tinyUrlDto) => ({ ...d, copied: false }));
  }
}

function navigateToDetails(id: string) {
  router.push(`/links/${id}/details`);
}

</script>
