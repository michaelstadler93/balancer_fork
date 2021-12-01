<template>
  <div :class="`flex flex-col text-xs text-gray-500`">

    <router-link
      :to="{ name: 'home' }"
      :class="[
        ' px-6 rounded-l-lg',
        'mt-4',
        { [activeClasses]: !isTradePage }
      ]"
      @click="trackGoal(Goals.ClickNavInvest)"
    >
      {{ $t('HOME') }}
    </router-link>

    


    <router-link
      :to="{ name: 'trade' }"
      :class="[
        ' px-6 rounded-l-lg',
        'mt-4',
        { [activeClasses]: isTradePage }
      ]"
      @click="trackGoal(Goals.ClickNavTrade)"
    >
      {{ $t('TRADE') }}
    </router-link>

    <router-link
      :to="{ name: 'home' }"
      :class="[
        ' px-6 rounded-l-lg',
        'mt-4',
        { [activeClasses]: isTradePage }
      ]"
      @click="trackGoal(Goals.ClickNavTrade)"
    >
      {{ $t('FARM') }}
    </router-link>

    <router-link
      :to="{ name: 'home' }"
      :class="[
        ' px-6 rounded-l-lg',
        'mt-4',
        { [activeClasses]: isTradePage }
      ]"
      @click="trackGoal(Goals.ClickNavTrade)"
    >
      {{ $t('POOL') }}
    </router-link>

    <router-link
      :to="{ name: 'home' }"
      :class="[
        ' px-6 rounded-l-lg',
        'mt-4',
        { [activeClasses]: isTradePage }
      ]"
      @click="trackGoal(Goals.ClickNavTrade)"
    >
      {{ $t('WALLET') }}
    </router-link>

      <router-link
      :to="{ name: 'home' }"
      :class="[
        ' px-6 rounded-l-lg',
        'mt-4',
        { [activeClasses]: isTradePage }
      ]"
      @click="trackGoal(Goals.ClickNavTrade)"
    >
      {{ $t('SETTINGS') }}
    </router-link>

  </div>
</template>

<script lang="ts">
import useFathom from '@/composables/useFathom';
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'AppNavToggle',

  props: {
    darkModeBg: { type: String, default: '800' }
  },

  setup() {
    const route = useRoute();
    const activeClasses = 'text-white border-l-2 border-white';
    const isTradePage = computed(() => route.name === 'trade');
    const { trackGoal, Goals } = useFathom();

    return {
      isTradePage,
      activeClasses,
      trackGoal,
      Goals
    };
  }
});
</script>

<style scoped>
.app-nav-toggle {
  @apply h-10 flex items-center rounded-lg shadow;
  font-variation-settings: 'wght' 600;
}

.toggle-link {
  @apply h-full flex items-center;
}
</style>
