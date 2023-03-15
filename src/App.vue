<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloSlick from './components/HelloSlick.vue'
</script>


<template>
  <div class="min-h-full">
    
    <RouterView />
    <HelloSlick msg="Powered by Slick" />
    
  </div>
</template>
