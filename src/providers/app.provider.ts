import useTokenLists from '@/composables/useTokenLists';
import useTokens from '@/composables/useTokens';
import symbolKeys from '@/constants/symbol.keys';
import { provide, computed, InjectionKey, ComputedRef } from 'vue';
import { useStore } from 'vuex';

/**
 * TYPES
 */
export interface AppProviderResponse {
  appLoading: ComputedRef<boolean>;
}

/**
 * SETUP
 */
export const AppProviderSymbol: InjectionKey<AppProviderResponse> = Symbol(
  symbolKeys.Providers.App
);

/**
 * AppProvider
 * Provides global app level properties
 */
export default {
  name: 'AppProvider',

  setup(props, { slots }) {
    const store = useStore();
    const { loadingTokenLists } = useTokenLists();
    const { loading: loadingTokens } = useTokens();

    const appLoading = computed(
      () =>
        store.state.app.loading ||
        loadingTokenLists.value ||
        loadingTokens.value
    );

    provide(AppProviderSymbol, {
      // computed
      appLoading
    });

    return () => slots.default();
  }
};
