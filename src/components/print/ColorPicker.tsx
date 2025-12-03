import { h } from 'preact';
import type { JSX } from 'preact';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps): JSX.Element {
  const handleColorChange = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };

  const handleTextChange = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    // Basic hex validation
    if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div class="color-picker-field">
      <label class="color-picker-label">
        {label}
      </label>
      <div class="color-picker-inputs">
        <input
          type="color"
          value={value}
          onInput={handleColorChange}
          class="color-picker-swatch"
          title={`Sélectionner ${label}`}
        />
        <input
          type="text"
          value={value}
          onInput={handleTextChange}
          onBlur={handleTextChange}
          class="color-picker-text"
          placeholder="#000000"
          maxLength={7}
          pattern="^#[0-9A-Fa-f]{6}$"
        />
      </div>
    </div>
  );
}
