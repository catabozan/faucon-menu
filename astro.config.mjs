// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRL3JRMT-XAoKJEfjQRPqggT5eBCcVDTPUnfKUf-isNptRMCtpj4EAEAEAoldVFIc1DRNyuDcV0sGw8/pub?output=csv';

const CURRENCY_SYMBOL = 'CHF';
const CURRENCY_POSITION = 'after'; // 'before' or 'after'
const SHOW_DOTS = true;

// https://astro.build/config
export default defineConfig({
    integrations: [preact()],
    vite: {
        plugins: [tailwindcss()],
        define: {
            // Default to local sample CSV for testing
            // Replace with your Google Sheets CSV URL: https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?output=csv
            'import.meta.env.CSV_URL': JSON.stringify(process.env.CSV_URL || SHEET_URL || '/menu-sample.csv'),
            'import.meta.env.CURRENCY_SYMBOL': JSON.stringify(process.env.CURRENCY_SYMBOL || CURRENCY_SYMBOL || 'CHF'),
            'import.meta.env.CURRENCY_POSITION': JSON.stringify(process.env.CURRENCY_POSITION ||CURRENCY_POSITION || 'after'),
            'import.meta.env.SHOW_DOTS': JSON.stringify((process.env.SHOW_DOTS || SHOW_DOTS) === 'false' ? 'false' : 'true'),
        },
    },
});
