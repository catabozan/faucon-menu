import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import type { JSX } from 'preact';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
}

export function NumberInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit = '',
}: NumberInputProps): JSX.Element {
  const [textValue, setTextValue] = useState(value.toString());

  // Update text value when prop value changes
  useEffect(() => {
    setTextValue(value.toString());
  }, [value]);

  const handleSliderChange = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.currentTarget.value);
    onChange(newValue);
  };

  const handleTextChange = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    setTextValue(e.currentTarget.value);
  };

  const handleTextBlur = () => {
    const numValue = parseFloat(textValue);
    if (!isNaN(numValue)) {
      // Clamp value to min/max
      const clampedValue = Math.max(min, Math.min(max, numValue));
      onChange(clampedValue);
      setTextValue(clampedValue.toString());
    } else {
      // Reset to current value if invalid
      setTextValue(value.toString());
    }
  };

  const handleTextKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div class="number-input-field">
      <label class="number-input-label">
        {label}
      </label>
      <div class="number-input-controls">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onInput={handleSliderChange}
          class="number-input-slider"
          title={label}
        />
        <div class="number-input-text-wrapper">
          <input
            type="text"
            value={textValue}
            onInput={handleTextChange}
            onBlur={handleTextBlur}
            onKeyDown={handleTextKeyDown}
            class="number-input-text"
            size={6}
          />
          {unit && <span class="number-input-unit">{unit}</span>}
        </div>
      </div>
    </div>
  );
}
