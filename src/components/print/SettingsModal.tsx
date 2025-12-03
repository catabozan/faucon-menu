import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import type { JSX } from 'preact';
import { ColorPicker } from './ColorPicker';
import { NumberInput } from './NumberInput';
import { CategoryManager } from './CategoryManager';
import { PresetSelector } from './PresetSelector';
import { getDefaultPrintSettings } from '@/utils/printSettings';
import type { PrintSettings, PresetName } from '@/utils/printSettingsTypes';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: PrintSettings;
  onSettingsChange: (settings: PrintSettings) => void;
  onPresetSelect: (presetName: PresetName) => void;
  currentPreset: PresetName | null;
}

type TabType = 'colors' | 'typography' | 'spacing' | 'layout' | 'categories';

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
  onPresetSelect,
  currentPreset,
}: SettingsModalProps): JSX.Element | null {
  const [activeTab, setActiveTab] = useState<TabType>('colors');

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleReset = () => {
    if (confirm('Réinitialiser tous les paramètres aux valeurs par défaut ?')) {
      const defaults = getDefaultPrintSettings();
      onSettingsChange({
        ...defaults,
        categories: settings.categories, // Keep category settings
      });
    }
  };

  const updateSettings = (partial: Partial<PrintSettings>) => {
    onSettingsChange({ ...settings, ...partial });
  };

  return (
    <div class="settings-modal-backdrop" onClick={handleBackdropClick}>
      <div class="settings-modal">
        {/* Header */}
        <div class="settings-modal-header">
          <h2 class="settings-modal-title">Paramètres d'impression</h2>
          <button
            class="settings-modal-close"
            onClick={onClose}
            aria-label="Fermer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Preset Selector */}
        <PresetSelector
          currentPreset={currentPreset}
          onPresetSelect={onPresetSelect}
        />

        {/* Tabs */}
        <div class="settings-tabs">
          <button
            class={`settings-tab ${activeTab === 'colors' ? 'active' : ''}`}
            onClick={() => setActiveTab('colors')}
            type="button"
          >
            Couleurs
          </button>
          <button
            class={`settings-tab ${activeTab === 'typography' ? 'active' : ''}`}
            onClick={() => setActiveTab('typography')}
            type="button"
          >
            Typographie
          </button>
          <button
            class={`settings-tab ${activeTab === 'spacing' ? 'active' : ''}`}
            onClick={() => setActiveTab('spacing')}
            type="button"
          >
            Espacement
          </button>
          <button
            class={`settings-tab ${activeTab === 'layout' ? 'active' : ''}`}
            onClick={() => setActiveTab('layout')}
            type="button"
          >
            Mise en page
          </button>
          <button
            class={`settings-tab ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
            type="button"
          >
            Catégories
          </button>
        </div>

        {/* Content */}
        <div class="settings-content">
          {/* Colors Tab */}
          <div class={`settings-tab-panel ${activeTab === 'colors' ? 'active' : ''}`}>
            <div class="settings-section">
              <ColorPicker
                label="Titre de la page"
                value={settings.colors.pageTitle}
                onChange={(value) => updateSettings({ colors: { ...settings.colors, pageTitle: value } })}
              />
              <ColorPicker
                label="Titres des catégories"
                value={settings.colors.categoryTitle}
                onChange={(value) => updateSettings({ colors: { ...settings.colors, categoryTitle: value } })}
              />
              <ColorPicker
                label="Titres des sous-catégories"
                value={settings.colors.subcategoryTitle}
                onChange={(value) => updateSettings({ colors: { ...settings.colors, subcategoryTitle: value } })}
              />
              <ColorPicker
                label="Prix"
                value={settings.colors.prices}
                onChange={(value) => updateSettings({ colors: { ...settings.colors, prices: value } })}
              />
              <ColorPicker
                label="Lignes pointillées"
                value={settings.colors.dottedLines}
                onChange={(value) => updateSettings({ colors: { ...settings.colors, dottedLines: value } })}
              />
              <ColorPicker
                label="Quantités"
                value={settings.colors.quantityText}
                onChange={(value) => updateSettings({ colors: { ...settings.colors, quantityText: value } })}
              />
              <ColorPicker
                label="Noms des items"
                value={settings.colors.itemName}
                onChange={(value) => updateSettings({ colors: { ...settings.colors, itemName: value } })}
              />
              <ColorPicker
                label="Couleur de fond"
                value={settings.colors.backgroundColor}
                onChange={(value) => updateSettings({ colors: { ...settings.colors, backgroundColor: value } })}
              />
            </div>
          </div>

          {/* Typography Tab */}
          <div class={`settings-tab-panel ${activeTab === 'typography' ? 'active' : ''}`}>
            <div class="settings-section">
              <NumberInput
                label="Taille de base"
                value={settings.typography.baseFontSize}
                onChange={(value) => updateSettings({ typography: { ...settings.typography, baseFontSize: value } })}
                min={6}
                max={14}
                step={0.5}
                unit="pt"
              />
              <NumberInput
                label="Taille titre"
                value={settings.typography.titleSize}
                onChange={(value) => updateSettings({ typography: { ...settings.typography, titleSize: value } })}
                min={0.8}
                max={3.0}
                step={0.1}
                unit="rem"
              />
              <NumberInput
                label="Poids titre"
                value={settings.typography.titleWeight}
                onChange={(value) => updateSettings({ typography: { ...settings.typography, titleWeight: value } })}
                min={100}
                max={900}
                step={100}
                unit=""
              />
              <NumberInput
                label="Taille catégories"
                value={settings.typography.categorySize}
                onChange={(value) => updateSettings({ typography: { ...settings.typography, categorySize: value } })}
                min={0.8}
                max={2.0}
                step={0.1}
                unit="rem"
              />
              <NumberInput
                label="Poids catégories"
                value={settings.typography.categoryWeight}
                onChange={(value) => updateSettings({ typography: { ...settings.typography, categoryWeight: value } })}
                min={100}
                max={900}
                step={100}
                unit=""
              />
              <NumberInput
                label="Taille sous-catégories"
                value={settings.typography.subcategorySize}
                onChange={(value) => updateSettings({ typography: { ...settings.typography, subcategorySize: value } })}
                min={0.8}
                max={1.5}
                step={0.05}
                unit="rem"
              />
              <NumberInput
                label="Taille items"
                value={settings.typography.itemSize}
                onChange={(value) => updateSettings({ typography: { ...settings.typography, itemSize: value } })}
                min={0.5}
                max={1.2}
                step={0.05}
                unit="rem"
              />
              <NumberInput
                label="Poids items"
                value={settings.typography.itemWeight}
                onChange={(value) => updateSettings({ typography: { ...settings.typography, itemWeight: value } })}
                min={100}
                max={900}
                step={100}
                unit=""
              />
              <NumberInput
                label="Taille prix"
                value={settings.typography.priceSize}
                onChange={(value) => updateSettings({ typography: { ...settings.typography, priceSize: value } })}
                min={0.5}
                max={1.2}
                step={0.05}
                unit="rem"
              />
              <NumberInput
                label="Poids prix"
                value={settings.typography.priceWeight}
                onChange={(value) => updateSettings({ typography: { ...settings.typography, priceWeight: value } })}
                min={100}
                max={900}
                step={100}
                unit=""
              />
              <NumberInput
                label="Hauteur de ligne"
                value={settings.typography.lineHeight}
                onChange={(value) => updateSettings({ typography: { ...settings.typography, lineHeight: value } })}
                min={0.8}
                max={2.0}
                step={0.1}
                unit=""
              />
            </div>
          </div>

          {/* Spacing Tab */}
          <div class={`settings-tab-panel ${activeTab === 'spacing' ? 'active' : ''}`}>
            <div class="settings-section">
              <NumberInput
                label="Marge en dessous du titre"
                value={settings.spacing.titleMarginBottom}
                onChange={(value) => updateSettings({ spacing: { ...settings.spacing, titleMarginBottom: value } })}
                min={0}
                max={3}
                step={0.1}
                unit="rem"
              />
              <NumberInput
                label="Espacement catégories"
                value={settings.spacing.categorySpacing}
                onChange={(value) => updateSettings({ spacing: { ...settings.spacing, categorySpacing: value } })}
                min={0}
                max={3}
                step={0.1}
                unit="rem"
              />
              <NumberInput
                label="Espacement sous-catégories"
                value={settings.spacing.subcategorySpacing}
                onChange={(value) => updateSettings({ spacing: { ...settings.spacing, subcategorySpacing: value } })}
                min={0}
                max={2}
                step={0.1}
                unit="rem"
              />
              <NumberInput
                label="Espacement items"
                value={settings.spacing.itemSpacing}
                onChange={(value) => updateSettings({ spacing: { ...settings.spacing, itemSpacing: value } })}
                min={0}
                max={2}
                step={0.1}
                unit="rem"
              />
              <NumberInput
                label="Espacement lignes de tableau"
                value={settings.spacing.tableRowSpacing}
                onChange={(value) => updateSettings({ spacing: { ...settings.spacing, tableRowSpacing: value } })}
                min={0}
                max={1}
                step={0.05}
                unit="rem"
              />
            </div>
          </div>

          {/* Layout Tab */}
          <div class={`settings-tab-panel ${activeTab === 'layout' ? 'active' : ''}`}>
            <div class="settings-section">
              <NumberInput
                label="Nombre de colonnes"
                value={settings.layout.columns}
                onChange={(value) => updateSettings({ layout: { ...settings.layout, columns: Math.round(value) } })}
                min={1}
                max={8}
                step={1}
                unit=""
              />
              <NumberInput
                label="Opacité du logo"
                value={settings.layout.logoOpacity}
                onChange={(value) => updateSettings({ layout: { ...settings.layout, logoOpacity: value } })}
                min={0}
                max={1}
                step={0.05}
                unit=""
              />
            </div>
          </div>

          {/* Categories Tab */}
          <div class={`settings-tab-panel ${activeTab === 'categories' ? 'active' : ''}`}>
            <div class="settings-section">
              <h3 class="settings-section-title">Ordre et visibilité</h3>
              <p style="color: #9ca3af; font-size: 0.875rem; margin-bottom: 1rem;">
                Glissez pour réorganiser, décochez pour masquer
              </p>
              <CategoryManager
                order={settings.categories.order}
                visibility={settings.categories.visibility}
                onOrderChange={(order) => updateSettings({ categories: { ...settings.categories, order } })}
                onVisibilityChange={(visibility) => updateSettings({ categories: { ...settings.categories, visibility } })}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div class="settings-modal-footer">
          <div class="settings-modal-footer-left">
            <button
              class="settings-modal-btn settings-modal-btn-secondary"
              onClick={handleReset}
              type="button"
            >
              Réinitialiser
            </button>
          </div>
          <button
            class="settings-modal-btn settings-modal-btn-primary"
            onClick={onClose}
            type="button"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
