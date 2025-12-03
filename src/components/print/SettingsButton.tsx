import { h } from 'preact';
import type { JSX } from 'preact';

interface SettingsButtonProps {
  onClick: () => void;
}

export function SettingsButton({ onClick }: SettingsButtonProps): JSX.Element {
  return (
    <button
      class="settings-button"
      onClick={onClick}
      aria-label="Ouvrir les paramètres d'impression"
      title="Paramètres d'impression"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M12 1v6m0 6v6m-8.66-7 5.2 3M16 12l5.2-3M4.86 17l5.2-3M16 12l5.2 3"></path>
      </svg>
      <span class="settings-button-text">Paramètres</span>
    </button>
  );
}
