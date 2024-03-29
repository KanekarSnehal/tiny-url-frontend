<template>
  <div class="sm:ml-64 bg-slate-100">
     <div class="p-4 mt-14 w-8/12 mx-auto">
      <p class="text-3xl">Links</p>
      <hr class="h-px mt-4 mb-8 bg-gray-200 border-0 dark:bg-gray-700">
       
      <div v-if="tinyUrlList.length > 0">
        <div class="flex p-4 bg-white rounded-md gap-4 mb-8" v-for="tinyUrl in tinyUrlList" :key="tinyUrl.id">

          <div class="flex gap-4">
            <div class="flex justify-center items-center w-14 h-14 border-2 rounded-full">
              <img :src="getImageSrc(tinyUrl.long_url)" alt="Rounded avatar">
            </div>

            <div class="flex flex-col gap-4">
              <div class="flex flex-col">
                <p class="text-xl font-bold">{{ tinyUrl.title }}</p>
                <p class="font-bold text-sky-600">{{ tinyUrl.id }}</p>
                <p class="text-sm">{{ tinyUrl.long_url }}</p>
              </div>
  
              <div class="mt-auto flex">
                <IconCalendar/>
                <p class="text-sm ml-2">{{ formattedDate(new Date(tinyUrl.expiration)) }}</p>
              </div>
            </div>

          </div>

          <div class="ml-auto flex gap-2 items-start">
            <button class="flex border-2 bg-slate-100 px-2  py-1 rounded-md items-center font-semibold">
              <IconCopy/>
              Copy
            </button>
            <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              <IconEdit/>
            </button>
            <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              <IconDelete/>
            </button>
          </div>

        </div>
      </div>
     </div>
  </div>
</template>
<script setup lang="ts">
import IconCalendar from '@/components/icons/IconCalendar.vue';
import IconCopy from '@/components/icons/IconCopy.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import { useTinyUrlStore, type createTinyUrlListDto } from '../stores/tinyUrl';
import { onMounted, reactive, ref } from 'vue';

const tinyUrlStore = useTinyUrlStore();

let tinyUrlList = reactive<createTinyUrlListDto[]>([]);

onMounted(async () => {
  const response = await tinyUrlStore.getAllTinyUrlList();
  tinyUrlList = response;
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

</script>
