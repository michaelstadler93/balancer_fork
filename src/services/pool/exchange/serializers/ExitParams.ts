import PoolExchange from '..';
import { encodeExitStablePool } from '@/lib/utils/balancer/stablePoolEncoding';
import { encodeExitWeightedPool } from '@/lib/utils/balancer/weightedPoolEncoding';
import { parseUnits } from '@ethersproject/units';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { isStable } from '@/composables/usePool';

export default class ExitParams {
  private exchange: PoolExchange;
  private isStablePool: boolean;
  private dataEncodeFn: (data: any) => string;
  private toInternalBalance = false;

  constructor(exchange) {
    this.exchange = exchange;
    this.isStablePool = isStable(exchange.pool);
    this.dataEncodeFn = this.isStablePool
      ? encodeExitStablePool
      : encodeExitWeightedPool;
  }

  public serialize(
    account: string,
    amountsOut: string[],
    bptIn: string,
    exitTokenIndex: number | null,
    exactOut: boolean
  ): any[] {
    const parsedAmountsOut = this.parseAmounts(amountsOut);
    const parsedBptIn = parseUnits(bptIn, this.exchange.pool.onchain.decimals);
    const txData = this.txData(
      parsedAmountsOut,
      parsedBptIn,
      exitTokenIndex,
      exactOut
    );

    return [
      this.exchange.pool.id,
      account,
      account,
      {
        assets: this.exchange.pool.tokenAddresses,
        minAmountsOut: parsedAmountsOut.map(amount =>
          // This is a hack to get around rounding issues for MetaStable pools
          // TODO: do this more elegantly
          amount.gt(0) ? amount.sub(1) : amount
        ),
        userData: txData,
        toInternalBalance: this.toInternalBalance
      }
    ];
  }

  private parseAmounts(amounts: string[]): BigNumber[] {
    return amounts.map((amount, i) => {
      const token = this.exchange.pool.tokenAddresses[i];
      return parseUnits(
        amount,
        this.exchange.pool.onchain.tokens[token].decimals
      );
    });
  }

  private txData(
    amountsOut: BigNumberish[],
    bptIn: BigNumberish,
    exitTokenIndex: number | null,
    exactOut: boolean
  ): string {
    const isSingleAssetOut = exitTokenIndex !== null;

    if (isSingleAssetOut) {
      return this.dataEncodeFn({
        kind: 'ExactBPTInForOneTokenOut',
        bptAmountIn: bptIn,
        exitTokenIndex
      });
    } else if (exactOut) {
      return this.dataEncodeFn({
        amountsOut,
        maxBPTAmountIn: bptIn
      });
    } else {
      return this.dataEncodeFn({
        kind: 'ExactBPTInForTokensOut',
        bptAmountIn: bptIn
      });
    }
  }
}
