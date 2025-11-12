import type { CSVRow } from './types';

// Mapping from French CSV headers to English property names
const COLUMN_MAPPING: Record<string, keyof CSVRow> = {
  'Categorie': 'category',
  'Sous-Categorie': 'subcategory',
  'Nom': 'name',
  'Quantite': 'quantity',
  'Prix': 'price',
  'Commentaire': 'comment',
};

/**
 * Parse CSV text handling commas inside quotes and trimming whitespace
 * Maps French column names to English property names
 */
export function parseCSV(csvText: string): CSVRow[] {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];

  // Parse header
  const headers = parseCSVLine(lines[0]);

  // Parse rows
  const rows: CSVRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const row: any = {};
      headers.forEach((header, index) => {
        const trimmedHeader = header.trim();
        const englishKey = COLUMN_MAPPING[trimmedHeader] || trimmedHeader;
        row[englishKey] = values[index].trim();
      });
      rows.push(row as CSVRow);
    }
  }

  return rows;
}

/**
 * Parse a single CSV line, handling commas inside quotes
 */
function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let currentValue = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      // Handle escaped quotes (double quotes)
      if (insideQuotes && nextChar === '"') {
        currentValue += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      // End of field
      values.push(currentValue);
      currentValue = '';
    } else {
      currentValue += char;
    }
  }

  // Add last value
  values.push(currentValue);

  return values;
}
