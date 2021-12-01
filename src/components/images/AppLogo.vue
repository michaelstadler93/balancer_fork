<template>
  <div class="flex items-center">
    <AppIcon />
    <span class="mr-1 font-secondary text-white text-xl font-semibold">
      Aspen
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppIcon from './AppIcon.vue';

export default defineComponent({
  name: 'AppLogo',

  components: {
    AppIcon
  }
});
</script>
