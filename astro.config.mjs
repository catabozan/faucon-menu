// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'astro/config';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRL3JRMT-XAoKJEfjQRPqggT5eBCcVDTPUnfKUf-isNptRMCtpj4EAEAEAoldVFIc1DRNyuDcV0sGw8/pub?output=csv';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
        define: {
            // Default to local sample CSV for testing
            // Replace with your Google Sheets CSV URL: https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?output=csv
            'import.meta.env.CSV_URL': JSON.stringify(process.env.CSV_URL || SHEET_URL || '/menu-sample.csv'),
            'import.meta.env.CURRENCY_SYMBOL': JSON.stringify(process.env.CURRENCY_SYMBOL || 'CHF'),
            'import.meta.env.CURRENCY_POSITION': JSON.stringify(process.env.CURRENCY_POSITION || 'after'),
        },
    },
});
