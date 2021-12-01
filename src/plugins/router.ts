import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/pages/Home.vue';
import Pool from '@/pages/Pool.vue';
import LiquidityMining from '@/pages/LiquidityMining.vue';
import Trade from '@/pages/Trade.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/farm', name: 'farm', component: Home },
  { path: '/wallet', name: 'wallet', component: Home },
  { path: '/settings', name: 'settings', component: Home },
  { path: '/trade/:assetIn?/:assetOut?', name: 'trade', component: Trade },
  {
    path: '/swap/:assetIn?/:assetOut?',
    redirect: to => {
      return `/trade${to.path.split('/swap')[1]}`;
    }
  },
  { path: '/pool/:id', name: 'pool', component: Pool },
  {
    path: '/liquidity-mining',
    name: 'liquidity-mining',
    component: LiquidityMining
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', redirect: '/' }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
