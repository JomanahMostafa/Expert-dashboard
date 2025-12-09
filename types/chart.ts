/**
 * Chart data type definitions
 * Used for type safety in chart components
 */

export interface ChartDataPoint {
  month: string;
  desktop: number;
  mobile: number;
}

export interface PieChartDataPoint {
  browser: string;
  visitors: number;
  fill: string;
}

export interface ChartConfig {
  [key: string]: {
    label: string;
    color?: string;
  };
}

