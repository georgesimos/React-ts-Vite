export type AssetClass = 'Macro' | 'Equities' | 'Credit';

export interface FinancialInstrument {
  ticker: string;
  price: number;
  assetClass: AssetClass;
}
