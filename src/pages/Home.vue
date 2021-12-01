<template>
  <div class="lg:container lg:mx-auto pt-1 md:pt-1">
    <template v-if="isWalletReady">
      <div class="px-4 lg:px-0">
        <h3 class="mb-4">{{ $t('myV2Investments') }}</h3>
      </div>
      <PoolsTable
        :isLoading="isLoadingUserPools"
        :data="userPools"
        :noPoolsLabel="$t('noInvestments')"
        showPoolShares
        :selectedTokens="selectedTokens"
        class="mb-8"
      />
      <div class="px-4 lg:px-0" v-if="!hideV1Links">
        <div class="text-black-600">{{ $t('seeV1BalancerInvestments') }}</div>
        <BalLink :href="EXTERNAL_LINKS.Balancer.PoolsV1Dashboard" external>{{
          $t('goToBalancerV1Site')
        }}</BalLink>
      </div>
      <div class="mb-16" />
    </template>
    <template v-else>
      <div class="flex flex-wrap">
        <img src="~@/assets/images/exchange/button2.png" class="flex-grow w-1/4 m-2">
        <img src="~@/assets/images/exchange/button3.png" class="flex-grow w-1/4 m-2">
        <img src="~@/assets/images/exchange/button4.png" class="flex-grow w-1/4 m-2">
      </div>

      <div class="flex "> 
        <div class="flex-grow w-2/5 m-2">
          <img src="~@/assets/images/exchange/button8.png" >
        </div>
        <div class="flex-grow w-2/5 m-2">
          <div class="flex flex-col">
            <img src="~@/assets/images/exchange/button5.png">
            <div class="flex">
              <img src="~@/assets/images/exchange/button6.png" class="flex-grow w-1/4 mr-2 ">
              <img src="~@/assets/images/exchange/button7.png" class="flex-grow w-1/4 ml-2">
            </div>
          </div>
        </div>

      </div>
    </template>
    

    
    
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { EXTERNAL_LINKS } from '@/constants/links';
import TokenSearchInput from '@/components/inputs/TokenSearchInput.vue';
import PoolsTable from '@/components/tables/PoolsTable/PoolsTable.vue';
import FeaturedPools from '@/components/sections/FeaturedPools.vue';
import usePools from '@/composables/pools/usePools';
import useWeb3 from '@/services/web3/useWeb3';
import usePoolFilters from '@/composables/pools/usePoolFilters';
import useAlerts, { AlertPriority, AlertType } from '@/composables/useAlerts';

export default defineComponent({
  components: {
  },

  setup() {
    // COMPOSABLES
    const router = useRouter();
    const { t } = useI18n();
    const { isWalletReady, isV1Supported, appNetworkConfig } = useWeb3();
    const isElementSupported = appNetworkConfig.supportsElementPools;
    const {
      selectedTokens,
      addSelectedToken,
      removeSelectedToken
    } = usePoolFilters();

    const {
      pools,
      userPools,
      isLoadingPools,
      isLoadingUserPools,
      loadMorePools,
      poolsHasNextPage,
      poolsIsFetchingNextPage,
      poolsQuery
    } = usePools(selectedTokens);
    const { addAlert, removeAlert } = useAlerts();

    // COMPUTED
    const filteredPools = computed(() =>
      selectedTokens.value.length > 0
        ? pools.value?.filter(pool => {
            return selectedTokens.value.every((selectedToken: string) =>
              pool.tokenAddresses.includes(selectedToken)
            );
          })
        : pools?.value
    );

    const hideV1Links = computed(() => !isV1Supported);

    watch(poolsQuery.error, () => {
      if (poolsQuery.error.value) {
        addAlert({
          id: 'pools-fetch-error',
          label: t('alerts.pools-fetch-error'),
          type: AlertType.ERROR,
          persistent: true,
          action: poolsQuery.refetch.value,
          actionLabel: t('alerts.retry-label'),
          priority: AlertPriority.MEDIUM
        });
      } else {
        removeAlert('pools-fetch-error');
      }
    });

    return {
      // data
      filteredPools,
      userPools,
      isLoadingPools,
      isLoadingUserPools,

      // computed
      isWalletReady,
      hideV1Links,
      poolsHasNextPage,
      poolsIsFetchingNextPage,
      selectedTokens,
      isElementSupported,

      //methods
      router,
      loadMorePools,
      addSelectedToken,
      removeSelectedToken,

      // constants
      EXTERNAL_LINKS
    };
  }
});
</script>
