import { h } from 'preact';
import type { JSX } from 'preact';
import { getAvailablePresets } from '@/utils/printSettings';
import type { PresetName } from '@/utils/printSettingsTypes';

interface PresetSelectorProps {
  currentPreset: PresetName | null;
  onPresetSelect: (presetName: PresetName) => void;
}

export function PresetSelector({ currentPreset, onPresetSelect }: PresetSelectorProps): JSX.Element {
  const presets = getAvailablePresets();

  return (
    <div class="preset-selector-section">
      <label class="preset-selector-label">
        Thème prédéfini
      </label>
      <div class="preset-selector-buttons">
        {presets.map(preset => (
          <button
            key={preset.name}
            class={`preset-button ${currentPreset === preset.name ? 'active' : ''}`}
            onClick={() => onPresetSelect(preset.name)}
            type="button"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
