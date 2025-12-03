import { h } from 'preact';
import { useState } from 'preact/hooks';
import type { JSX } from 'preact';

interface CategoryManagerProps {
  order: string[];
  visibility: { [key: string]: boolean };
  onOrderChange: (order: string[]) => void;
  onVisibilityChange: (visibility: { [key: string]: boolean }) => void;
}

export function CategoryManager({
  order,
  visibility,
  onOrderChange,
  onVisibilityChange,
}: CategoryManagerProps): JSX.Element {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: DragEvent, index: number) => {
    setDraggedIndex(index);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  const handleDragOver = (e: DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);

    if (draggedIndex === null || draggedIndex === index) return;

    const newOrder = [...order];
    const [removed] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(index, 0, removed);

    onOrderChange(newOrder);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleVisibilityToggle = (categoryName: string, checked: boolean) => {
    onVisibilityChange({
      ...visibility,
      [categoryName]: checked,
    });
  };

  const handleSelectAll = () => {
    const allVisible = Object.fromEntries(
      order.map(name => [name, true])
    );
    onVisibilityChange(allVisible);
  };

  const handleDeselectAll = () => {
    const allHidden = Object.fromEntries(
      order.filter(name => !name.startsWith('__BREAK__')).map(name => [name, false])
    );
    onVisibilityChange(allHidden);
  };

  const handleAddColumnBreak = (afterIndex: number) => {
    const newOrder = [...order];
    const breakId = `__BREAK__${Date.now()}`;
    newOrder.splice(afterIndex + 1, 0, breakId);
    onOrderChange(newOrder);
  };

  const handleRemoveColumnBreak = (index: number) => {
    const newOrder = order.filter((_, i) => i !== index);
    onOrderChange(newOrder);
  };

  const isColumnBreak = (name: string) => name.startsWith('__BREAK__');

  return (
    <div class="category-manager">
      <div class="category-manager-actions">
        <button
          type="button"
          class="category-manager-action-btn"
          onClick={handleSelectAll}
        >
          Tout sélectionner
        </button>
        <button
          type="button"
          class="category-manager-action-btn"
          onClick={handleDeselectAll}
        >
          Tout désélectionner
        </button>
      </div>

      <div class="category-list">
        {order.map((categoryName, index) => (
          <>
            {isColumnBreak(categoryName) ? (
              <div
                key={categoryName}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                onDragLeave={handleDragLeave}
                class={`category-item column-break-item ${draggedIndex === index ? 'dragging' : ''} ${dragOverIndex === index ? 'drag-over' : ''}`}
              >
                <span class="drag-handle" title="Glisser pour réorganiser">
                  ⋮⋮
                </span>
                <span class="column-break-label">
                  ─── Saut de colonne ───
                </span>
                <button
                  type="button"
                  class="remove-break-btn"
                  onClick={() => handleRemoveColumnBreak(index)}
                  title="Supprimer le saut de colonne"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div
                key={categoryName}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                onDragLeave={handleDragLeave}
                class={`category-item ${draggedIndex === index ? 'dragging' : ''} ${dragOverIndex === index ? 'drag-over' : ''}`}
              >
                <span class="drag-handle" title="Glisser pour réorganiser">
                  ⋮⋮
                </span>
                <input
                  type="checkbox"
                  checked={visibility[categoryName] !== false}
                  onChange={(e) => handleVisibilityToggle(categoryName, e.currentTarget.checked)}
                  class="category-checkbox"
                  id={`category-${categoryName}`}
                />
                <label htmlFor={`category-${categoryName}`} class="category-name">
                  {categoryName}
                </label>
                <button
                  type="button"
                  class="add-break-btn"
                  onClick={() => handleAddColumnBreak(index)}
                  title="Ajouter un saut de colonne après"
                >
                  +
                </button>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
