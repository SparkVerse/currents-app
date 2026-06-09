export type FrankfurterResponse = {
  rates: Record<string, Record<string, number>>;
};
export type TrendPoint = {
  date: string;
  rate: number;
};
