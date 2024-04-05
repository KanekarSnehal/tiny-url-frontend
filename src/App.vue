<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import SideBar from '@/components/SideBar.vue';
import Header from '@/components/Header.vue';
const route = useRoute();
</script>

<template>
  <Header v-if="!route.meta.hideHeaderAndSidebar" />
  <SideBar v-if="!route.meta.hideHeaderAndSidebar"/>
  <RouterView/>
</template>