<template>
    <div class="sm:ml-64">
       <form @submit="onSubmit">
          <div class="p-4 mt-14 w-6/12 mx-auto">
             <p class="text-3xl mb-4">Create new</p>
             <div class="mb-4">
                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Destination</label>
                <input v-model="destination" v-bind="destinationProps" id="first_name" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://example.com/my-long-url" />
                <p class="text-red-600">{{ errors.destination }}</p>
             </div>
             <div class="mb-4">
                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title(optional)</label>
                <input v-model="title" v-bind="titleProps" type="text" id="first_name" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://example.com/my-long-url"/>
                <p class="text-red-600">{{ errors.title }}</p>
             </div>
             <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
             <p class="text-3xl mb-4">Ways to share</p>
             <div class="mb-4">
                <p class="text-lg font-bold mb-2">Short link</p>
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
             <div class="mb-4">
                <p class="text-lg font-bold mb-2">QR code (optional)</p>
                <label class="inline-flex items-center cursor-pointer">
                   <input type="checkbox" v-model="generateQR" v-bind="generateQRProps" class="sr-only peer">
                   <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                   <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Generate a QR Code to share anywhere people can scan it</span>
                </label>
             </div>
          </div>
          <div class="fixed bottom-0 z-20 w-full bg-white">
             <hr>
             <div class="ml-auto p-4">
                 <RouterLink to="/" class="text-blue-700 mr-6">Cancel</RouterLink>
                 <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
             </div>
             <div>
             </div>
          </div>
       </form>
    </div>
 </template>
<script setup lang="ts">
import IconLock from '@/components/icons/IconLock.vue';
import { useForm } from 'vee-validate';
import { useTinyUrlStore, type createTinyUrlPayloadDto } from '../stores/tinyUrl';
import { useRouter } from 'vue-router';

const tinyUrlStore = useTinyUrlStore();
const router = useRouter();

function validUrl(value: string) {
   const urlPattern = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,})(\/\S*)?$/i;
   if (value && urlPattern.test(value)) {
      return true;
   }
   return 'This field must be a valid url';
}

// Create the form
const { defineField, handleSubmit, errors } = useForm({
   initialValues: {
      domain: "tinyurl.com",
      destination: '',
      title: null,
      backhalf: null,
      generateQR: false
   },
   validationSchema: {
      destination: validUrl,
   },
});

// Define fields
const [destination, destinationProps] = defineField('destination');
const [title, titleProps] = defineField('title');
const [domain, domainProps] = defineField('domain');
const [backhalf, backhalfProps] = defineField('backhalf');
const [generateQR, generateQRProps] = defineField('generateQR');




// Submit handler
const onSubmit = handleSubmit(async formValues => {
   // Submit to API
   console.log(formValues);
   const createTinyUrlPayload: createTinyUrlPayloadDto = {
      long_url: formValues.destination,
      title: formValues.title,
      custom_back_half: formValues.backhalf,
      generate_qr: formValues.generateQR
   }
   await tinyUrlStore.createTinyUrl(createTinyUrlPayload);
   router.push('/links');
});

</script>