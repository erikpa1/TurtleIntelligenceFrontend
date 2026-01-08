#!/usr/bin/env node

// Created from https://claude.ai/share/d16fa2b4-74c0-4c6f-a685-eec13ee0af53
// https://claude.ai/chat/34105eb8-79a7-4caf-8648-385be5f5e2f5

const fs = require('fs');
const path = require('path');

/**
 * Recursively walks through directories to find all folders named '0_langs'
 * @param {string} dir - Directory to search
 * @param {string[]} results - Accumulator for results
 * @returns {string[]} Array of paths to 0_langs folders
 */
function findLangsFolders(dir, results = []) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (entry.name === '0_langs') {
          results.push(fullPath);
        }
        // Continue searching in subdirectories
        findLangsFolders(fullPath, results);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }

  return results;
}

/**
 * Deep merges two objects, combining nested properties
 * @param {Object} target - Target object
 * @param {Object} source - Source object to merge
 * @returns {Object} Merged object
 */
function deepMerge(target, source) {
  const result = { ...target };

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (
        source[key] instanceof Object &&
        !Array.isArray(source[key]) &&
        key in target &&
        target[key] instanceof Object &&
        !Array.isArray(target[key])
      ) {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }

  return result;
}

/**
 * Reads all JSON files from a 0_langs folder and organizes them by language
 * @param {string} langsPath - Path to 0_langs folder
 * @returns {Object} Object with language codes as keys and translation objects as values
 */
function readLangFiles(langsPath) {
  const translations = {};

  try {
    const files = fs.readdirSync(langsPath);

    for (const file of files) {
      if (path.extname(file) === '.json') {
        const langCode = path.basename(file, '.json');
        const filePath = path.join(langsPath, file);

        try {
          const content = fs.readFileSync(filePath, 'utf8');
          const data = JSON.parse(content);
          translations[langCode] = data;
        } catch (error) {
          console.error(`Error reading/parsing ${filePath}:`, error.message);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading langs folder ${langsPath}:`, error.message);
  }

  return translations;
}

/**
 * Main function to merge all translations
 */
function mergeTranslations() {
  const srcPath = path.resolve(__dirname, '../src');
  const outputPath = path.resolve(__dirname, '../public/translation');

  console.log('Starting translation merge...');
  console.log(`Source directory: ${srcPath}`);
  console.log(`Output directory: ${outputPath}`);

  // Check if src directory exists
  if (!fs.existsSync(srcPath)) {
    console.error(`Error: Source directory does not exist: ${srcPath}`);
    process.exit(1);
  }

  // Find all 0_langs folders
  console.log('\nSearching for 0_langs folders...');
  const langsFolders = findLangsFolders(srcPath);

  if (langsFolders.length === 0) {
    console.log('No 0_langs folders found.');
    return;
  }

  console.log(`Found ${langsFolders.length} 0_langs folder(s):`);
  langsFolders.forEach(folder => console.log(`  - ${folder}`));

  // Accumulate translations by language
  const mergedTranslations = {};

  console.log('\nProcessing translation files...');
  for (const langsFolder of langsFolders) {
    const translations = readLangFiles(langsFolder);

    for (const [langCode, data] of Object.entries(translations)) {
      if (!mergedTranslations[langCode]) {
        mergedTranslations[langCode] = {};
      }

      mergedTranslations[langCode] = deepMerge(
        mergedTranslations[langCode],
        data
      );

      console.log(`  Merged ${langCode}.json from ${langsFolder}`);
    }
  }

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputPath)) {
    console.log(`\nCreating output directory: ${outputPath}`);
    fs.mkdirSync(outputPath, { recursive: true });
  }

  // Write merged translations to output files
  console.log('\nWriting merged translation files...');
  let filesWritten = 0;

  for (const [langCode, data] of Object.entries(mergedTranslations)) {
    const outputFile = path.join(outputPath, `${langCode}.json`);

    try {
      fs.writeFileSync(outputFile, JSON.stringify(data, null, 2), 'utf8');
      console.log(`  ✓ ${langCode}.json`);
      filesWritten++;
    } catch (error) {
      console.error(`  ✗ Error writing ${langCode}.json:`, error.message);
    }
  }

  console.log(`\n✨ Done! Successfully wrote ${filesWritten} translation file(s).`);
}

// Run the script
try {
  mergeTranslations();
} catch (error) {
  console.error('Fatal error:', error);
  process.exit(1);
}