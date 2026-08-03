export default {
  "*.{md,mdx}": "markdown-table-formatter",
  "*.{ts,tsx,js,jsx,json}": () => ["npm run lint:fix", "npm run build"],
};
