'use client';

import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";

interface ForecastControlProps {
    showForecast: boolean;
    setShowForecast: (show: boolean) => void;
    baseline: number;
    setBaseline: (value: number) => void;
    maxBudget: number;
    forecastValue: number;
}

export function ForecastControl({
    showForecast,
    setShowForecast,
    baseline,
    setBaseline,
    maxBudget,
    forecastValue
}: ForecastControlProps) {

    const isExceeding = showForecast && forecastValue > baseline;

    return (
        <div className="p-4 border border-gray-100 rounded-lg bg-gray-50/50 mt-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <Switch
                        id="forecast-mode"
                        checked={showForecast}
                        onCheckedChange={setShowForecast}
                    />
                    <Label htmlFor="forecast-mode" className="font-medium">Enable Forecasting</Label>
                </div>
                {showForecast && (
                    <div className={`text-sm font-medium px-3 py-1 rounded-full ${isExceeding ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {isExceeding
                            ? `⚠️ Forecast exceeds budget by ${formatCurrency(forecastValue - baseline)}`
                            : '✅ Forecast is within budget'}
                    </div>
                )}
            </div>

            {showForecast && (
                <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Budget Baseline</span>
                        <span className="font-bold text-gray-900">{formatCurrency(baseline)}</span>
                    </div>
                    <Slider
                        defaultValue={[baseline]}
                        max={maxBudget * 1.5}
                        step={Math.max(1, Math.floor(maxBudget / 100))}
                        value={[baseline]}
                        onValueChange={(vals: number[]) => setBaseline(vals[0])}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>$0</span>
                        <span>{formatCurrency(maxBudget * 1.5)}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
