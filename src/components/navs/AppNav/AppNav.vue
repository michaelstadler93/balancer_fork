<template>
  <AppNavAlert v-if="currentAlert" :alert="currentAlert" class="sticky top-0 right-0 h-screen"/>
  <nav id="app-nav" ref="appNav" class="px-2 lg:px-4  top-0 h-full ">
    <div class="flex flex-col h-full ">
      
        <router-link
          class="mb-3"
          :to="{ name: 'home' }"
          @click="trackGoal(Goals.ClickNavLogo)"
        >
          <AppLogo  />
        </router-link>
        <AppNavNetworkSelect class="mb-2"  />
     

      <div
        
        class="mb-2"
      >
        <AppNavToggle />
      </div>

      <div class="h-full relative">
        <div class="absolute left-0 bottom-0 w-full">
          <Stick_bar :c_ratio="10"/>
          <div class=" border-t border-gray-100 text-white py-5 ">
            <div>
              <img src="~@/assets/images/exchange/mark1.png" class=" w-8 h-auto inline ">
              $0
            </div >

            <div class="mt-5 flex content-around items-baseline text-gray-500">
              <div class="flex-grow"><BalIcon  name="send" size="sm" /></div>
              <div class="flex-grow"><BalIcon  name="twitter" size="sm" /></div>
              <div class="flex-grow"><BalIcon  name="twitter" size="sm" /></div>
              <div class="flex-grow"><BalIcon  name="smile" size="sm" /></div>
            </div>

            <div id="myflex" class="mt-5">
              <div class="">
                <BalIcon  name="sun" size="sm" />/
                <BalIcon  name="moon" size="sm" />
              </div>
              <div class="">
                <BalIcon  name="globe" size="sm" />
                <span>EN</span>
              </div>
            </div>


          </div>
        </div>
      </div>

    </div>
  </nav>
</template>

<script>
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue';
import useBreakpoints from '@/composables/useBreakpoints';
import AppLogo from '@/components/images/AppLogo.vue';
import AppIcon from '@/components/images/AppIcon.vue';
import Stick_bar from '@/components/images/Stick_bar.vue';
import AppNavAlert from './AppNavAlert.vue';
import AppNavToggle from './AppNavToggle.vue';
import AppNavActions from './AppNavActions.vue';
import AppNavNetworkSelect from './AppNavNetworkSelect.vue';
import useFathom from '@/composables/useFathom';
import useWeb3 from '@/services/web3/useWeb3';
import DarkModeToggle from '@/components/btns/DarkModeToggle.vue';
import useAlerts from '@/composables/useAlerts';

export default defineComponent({
  components: {
    AppLogo,
    AppNavAlert,
    AppNavToggle,
    AppNavNetworkSelect,
    Stick_bar
  },

  setup() {
    // COMPOSABLES
    const { bp, upToLargeBreakpoint } = useBreakpoints();
    const { trackGoal, Goals } = useFathom();
    const { connector } = useWeb3();
    const { currentAlert } = useAlerts();

    // DATA
    const appNav = ref(null);

    // COMPUTED
    const hideNetworkSelect = computed(() => connector.value?.id === 'gnosis');

    // METHODS
    function handleScroll() {
      if (window.scrollY === 0) {
        appNav.value.classList.remove('shadow-lg');
      } else {
        appNav.value.classList.add('shadow-lg');
      }
    }

    // CALLBACKS
    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      // data
      appNav,
      // computed
      bp,
      currentAlert,
      upToLargeBreakpoint,
      hideNetworkSelect,
      // methods
      trackGoal,
      Goals
    };
  }
});
</script>

<style scoped>
#app-nav {
  @apply w-full z-20;
  @apply border-b border-transparent;
  transition: all 0.2s ease-in-out;
}
#myflex{
  display:flex;
  justify-content: space-between;
}
</style>
