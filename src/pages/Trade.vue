<template>
  <div class="">

    <div class="flex flex-wrap">
      <div class="flex-grow  text-left"><h2 class="text-white">TRADE</h2></div>
      <div class="flex-grow  item-center text-right"> <button class="mybutton text-xs ">CONNECT WALLET</button></div>
    </div>

    <div class="mt-2  button_container flex">
      <button class="flex-grow text-xs button_bar">EXCHANGE</button>
      <button class="flex-grow text-xs button_bar">LIQUIDITY</button>
    </div>

    <div class="trade-container">
      <BalLoadingBlock v-if="appLoading || loadingTokenLists" class="h-96" />
      <template v-else>
        <TradeCard v-if="tradeInterface === TradeInterface.BALANCER" />
        <TradeCardGP v-else-if="tradeInterface === TradeInterface.GNOSIS" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import TradeCard from '@/components/cards/TradeCard/TradeCard.vue';
import TradeCardGP from '@/components/cards/TradeCardGP/TradeCardGP.vue';
import useTokenLists from '@/composables/useTokenLists';
import { TradeInterface } from '@/store/modules/app';
import usePoolFilters from '@/composables/pools/usePoolFilters';

export default defineComponent({
  components: {
    TradeCard,
    TradeCardGP
  },

  setup() {
    // COMPOSABLES
    const store = useStore();
    const { loadingTokenLists } = useTokenLists();
    const { setSelectedTokens } = usePoolFilters();

    // COMPUTED
    const appLoading = computed(() => store.state.app.loading);
    const tradeInterface = computed(() => store.state.app.tradeInterface);

    onMounted(() => {
      // selectedPoolTokens are only persisted between the Home/Pool pages
      setSelectedTokens([]);
    });

    return {
      appLoading,
      tradeInterface,
      loadingTokenLists,
      TradeInterface
    };
  }
});
</script>

<style scoped>
.button_container{
  @apply max-w-full mx-auto ;
  max-width: 450px;
}
.trade-container {
  @apply max-w-full mx-auto mt-px xs:mt-2;
  max-width: 450px;
}

@media (min-height: 840px) {
  .trade-container {
    @apply md:mt-8;
  }
}
.mybutton{
  padding: 8px;
  background-color: #5ce1e6;
  color: black;
}
.button_bar{
  padding: 8px;
  background-color: #06061b;
  color: white;
  border-style: solid;
  border-width: 3px;
  border-color: #154259;
}
.button_bar:hover{
  background-color: #5ce1e6;
  color: black;
}
</style>
