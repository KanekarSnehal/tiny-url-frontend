<template>
      <div class="overflow-y-auto overflow-x-hidden fixed border-8 top-50 right-50 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
   <div class="relative p-4 w-full max-w-lg max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
         <div class="d-flex">
            <p class="px-4 py-2">Edit Link</p>
            <button type="button" @click="closeEditModal" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
               <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
               </svg>
               <span class="sr-only">Close modal</span>
            </button>
         </div>
         <div class="p-4 md:p-5 text-center">
            <div class="mb-4">
               <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
               <input v-model="title" v-bind="titleProps" type="text" id="first_name" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://example.com/my-long-url"/>
               <p class="text-red-600">{{ errors.title }}</p>
            </div>
            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
            <div class="mb-4">
               <div class="flex justify-between">
                  <div class="flex flex-col grow">
                     <label for="first_name" class="flex block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Domain 
                        <IconLock/>
                     </label>
                     <input v-model="domain" v-bind="domainProps" type="text" id="first_name" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="tinyurl.com" disabled/>
                  </div>
                  <div class="mt-auto mb-2 shrink mx-4">/</div>
                  <div class="flex flex-col grow">
                     <div class="flex flex-col">
                        <label for="first_name" class="flex block mb-2 text-sm font-medium text-gray-900 dark:text-white">Custom back-half (optional)</label>
                        <input v-model="backhalf" v-bind="backhalfProps" type="text" id="first_name" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                     </div>
                  </div>
               </div>
            </div>
            <button type="button" @click="submitEditDetails" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5">
            Save
            </button>
            <button @click="closeEditModal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
         </div>
      </div>
   </div>
</div>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';
import { ref, defineProps, defineEmits } from 'vue';
import { type tinyUrlListDto } from '../stores/tinyUrl';
import IconLock from '@/components/icons/IconLock.vue';

const props = defineProps({
    editUrlDetails: {
        type: Object as () => Partial<tinyUrlListDto>,
        required: true,
    },
});

const emits = defineEmits(['closeEditModal', 'submitEditDetails']);

function closeEditModal() {
    emits('closeEditModal');
}

function submitEditDetails() {
    emits('submitEditDetails', { title: title.value, custom_back_half: backhalf.value, id: props.editUrlDetails.id });
}

// Form validation
const required = (value: string) => (value ? undefined : 'This field is required');

const { defineField, handleSubmit, errors } = useForm({
    initialValues: {
        domain: "tinyurl.com",
        title: props.editUrlDetails.title,
        backhalf: props.editUrlDetails.custom_back_half ? props.editUrlDetails.custom_back_half : props.editUrlDetails.id,
    },
    validationSchema: {
        backhalf: required,
    },
});

// Define fields
const [title, titleProps] = defineField('title');
const [domain, domainProps] = defineField('domain');
const [backhalf, backhalfProps] = defineField('backhalf');
</script>