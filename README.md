# 🕵️ UI Audit - Chrome Extension

UI Audit is a Chrome Extension that scans the currently active webpage for common **accessibility** and **UX issues**. It performs checks like:

- Missing `alt` text on images
- Improper heading structure
- Tabindex misuse
- Non-focusable interactive elements
- Use of placeholder instead of labels
- Non-descriptive link text (e.g., "click here")
- Deprecated HTML tags
- Inline styles
- Poor color contrast
- Sticky/fixed elements overlapping content
- Missing `<title>` or `<meta name="description">`
- Horizontal scrolling (responsive design issues)

## Features

- Run audit on the current tab
- View all identified issues in a scrollable list
- Export the audit report as a downloadable PDF
- Clean and minimal popup UI

## Tech Stack

- React
- Vite
- Chrome Extension APIs
- Basic CSS styling
- [html2pdf.js](https://github.com/eKoopmans/html2pdf) for PDF generation

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ui-audit-extension.git
cd ui-audit-extension
```

### 2. Install dependencies

```bash
npm install
```
### 3. Build the extension

```bash
npm run build
```
### 4.Load extension into chrome

- Open Chrome and go to `chrome://extensions/`
- Enable Developer mode (toggle in the top-right)
- Click Load unpacked
- Select the dist/ directory from your project

### 5. Use the extension
- Navigate to any webpage
- Click the 🕵️ UI Audit icon in your extensions bar
- Hit the "Run Audit" button
- View issues or export as PDF

## Folder Structure

```plaintext
📦 ui-audit
┣ 📂 public
┃ ┗ 📂 icons
┃   ┣ 📄 icon16.png
┃   ┣ 📄 icon48.png
┃   ┗ 📄 icon128.png
┣ 📂 src
┃ ┣ 📂 assets
┃ ┣ 📂 components
┃ ┃ ┗ 📄 Report.jsx
┃ ┣ 📂 utils
┃ ┃ ┗ 📄 auditFunctions.js
┃ ┣ 📄 App.jsx
┃ ┣ 📄 main.jsx
┃ ┗ 📄 index.css
┣ 📄 manifest.json
┣ 📄 package.json
┣ 📄 vite.config.js
┗ 📄 README.md

```
##
Created with ❤️ by Keerthana.
