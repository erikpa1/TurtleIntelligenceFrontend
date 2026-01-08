// created on https://claude.ai/chat/89dd7826-aa5c-4d43-86c2-fcfdeb30246a
#!/usr/bin/env node

// Translation script using local Ollama model
// Translates missing keys from source language to target languages

const fs = require('fs');
const path = require('path');
const http = require('http');

// ============================================================================
// CONFIGURATION
// ============================================================================

const OLLAMA_MODEL = 'deepseek-r1:7b';
const OLLAMA_HOST = 'localhost';
const OLLAMA_PORT = 11434;
const SOURCE_LANGUAGE = 'en'; // Base language to translate from

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

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
 * Flattens a nested object into dot-notation keys
 * @param {Object} obj - Object to flatten
 * @param {string} prefix - Current prefix for recursion
 * @returns {Object} Flattened object
 */
function flattenObject(obj, prefix = '') {
  const flattened = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (
        obj[key] instanceof Object &&
        !Array.isArray(obj[key]) &&
        obj[key] !== null
      ) {
        Object.assign(flattened, flattenObject(obj[key], newKey));
      } else {
        flattened[newKey] = obj[key];
      }
    }
  }

  return flattened;
}

/**
 * Unflattens a dot-notation object back to nested structure
 * @param {Object} obj - Flattened object
 * @returns {Object} Nested object
 */
function unflattenObject(obj) {
  const result = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const keys = key.split('.');
      let current = result;

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];

        if (i === keys.length - 1) {
          current[k] = obj[key];
        } else {
          current[k] = current[k] || {};
          current = current[k];
        }
      }
    }
  }

  return result;
}

// ============================================================================
// OLLAMA API FUNCTIONS
// ============================================================================

/**
 * Makes a request to local Ollama API
 * @param {string} prompt - The prompt to send
 * @returns {Promise<string>} The response from the model
 */
function callOllamaAPI(prompt) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      model: OLLAMA_MODEL,
      prompt: prompt,
      stream: false
    });

    const options = {
      hostname: OLLAMA_HOST,
      port: OLLAMA_PORT,
      path: '/api/generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response.response || '');
        } catch (error) {
          reject(new Error(`Failed to parse Ollama response: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Ollama API request failed: ${error.message}`));
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Creates a translation prompt for the LLM
 * @param {string} text - Text to translate
 * @param {string} sourceLang - Source language code
 * @param {string} targetLang - Target language code
 * @returns {string} The formatted prompt
 */
function createTranslationPrompt(text, sourceLang, targetLang) {
  const languageNames = {
    en: 'English',
    sk: 'Slovak',
    cs: 'Czech',
    de: 'German',
    fr: 'French',
    es: 'Spanish',
    it: 'Italian',
    pl: 'Polish',
    ru: 'Russian',
    uk: 'Ukrainian',
    hu: 'Hungarian',
    ro: 'Romanian',
    bg: 'Bulgarian',
    hr: 'Croatian',
    sr: 'Serbian',
    sl: 'Slovenian'
  };

  const sourceLangName = languageNames[sourceLang] || sourceLang;
  const targetLangName = languageNames[targetLang] || targetLang;

  return `Translate the following text from ${sourceLangName} to ${targetLangName}.
Only provide the translation, nothing else. Do not include explanations or notes.

Text to translate: "${text}"

Translation:`;
}

/**
 * Translates a single text using Ollama
 * @param {string} text - Text to translate
 * @param {string} sourceLang - Source language code
 * @param {string} targetLang - Target language code
 * @returns {Promise<string>} Translated text
 */
async function translateText(text, sourceLang, targetLang) {
  const prompt = createTranslationPrompt(text, sourceLang, targetLang);

  console.log(`\n📤 Sending to LLM (${sourceLang} → ${targetLang}):`);
  console.log(`   "${text}"`);

  try {
    const translation = await callOllamaAPI(prompt);
    const cleanedTranslation = translation.trim().replace(/^["']|["']$/g, '');

    console.log(`📥 Received from LLM:`);
    console.log(`   "${cleanedTranslation}"`);

    return cleanedTranslation;
  } catch (error) {
    console.error(`❌ Translation failed: ${error.message}`);
    return text; // Return original text on failure
  }
}

// ============================================================================
// TRANSLATION LOGIC
// ============================================================================

/**
 * Finds missing keys in target language compared to source
 * @param {Object} sourceFlat - Flattened source language object
 * @param {Object} targetFlat - Flattened target language object
 * @returns {string[]} Array of missing keys
 */
function findMissingKeys(sourceFlat, targetFlat) {
  const missingKeys = [];

  for (const key in sourceFlat) {
    if (sourceFlat.hasOwnProperty(key)) {
      if (!targetFlat.hasOwnProperty(key) || targetFlat[key] === '') {
        missingKeys.push(key);
      }
    }
  }

  return missingKeys;
}

/**
 * Translates missing keys for a target language
 * @param {Object} sourceData - Source language data
 * @param {Object} targetData - Target language data
 * @param {string} sourceLang - Source language code
 * @param {string} targetLang - Target language code
 * @returns {Promise<Object>} Updated target language data
 */
async function translateMissingKeys(sourceData, targetData, sourceLang, targetLang) {
  const sourceFlat = flattenObject(sourceData);
  const targetFlat = flattenObject(targetData);
  const missingKeys = findMissingKeys(sourceFlat, targetFlat);

  if (missingKeys.length === 0) {
    console.log(`✓ No missing keys for ${targetLang}`);
    return targetData;
  }

  console.log(`\n🔄 Translating ${missingKeys.length} missing key(s) for ${targetLang}:`);

  let translatedCount = 0;
  const updatedTargetFlat = { ...targetFlat };

  for (let i = 0; i < missingKeys.length; i++) {
    const key = missingKeys[i];
    const sourceText = sourceFlat[key];

    console.log(`\n[${i + 1}/${missingKeys.length}] Key: ${key}`);

    const translation = await translateText(sourceText, sourceLang, targetLang);
    updatedTargetFlat[key] = translation;
    translatedCount++;

    // Small delay to avoid overwhelming the API
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n✅ Translated ${translatedCount} key(s) for ${targetLang}`);

  return unflattenObject(updatedTargetFlat);
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

/**
 * Main function to translate missing keys across all languages
 */
async function translateLanguages() {
  const srcPath = path.resolve(__dirname, '../src');

  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║          Language Translation Script (Ollama)                  ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  console.log(`\nModel: ${OLLAMA_MODEL}`);
  console.log(`Source directory: ${srcPath}`);
  console.log(`Source language: ${SOURCE_LANGUAGE}`);

  // Check if src directory exists
  if (!fs.existsSync(srcPath)) {
    console.error(`\n❌ Error: Source directory does not exist: ${srcPath}`);
    process.exit(1);
  }

  // Find all 0_langs folders
  console.log('\n🔍 Searching for 0_langs folders...');
  const langsFolders = findLangsFolders(srcPath);

  if (langsFolders.length === 0) {
    console.log('❌ No 0_langs folders found.');
    return;
  }

  console.log(`✓ Found ${langsFolders.length} 0_langs folder(s):`);
  langsFolders.forEach(folder => console.log(`  • ${folder}`));

  // Process each 0_langs folder
  for (const langsFolder of langsFolders) {
    console.log('\n' + '═'.repeat(70));
    console.log(`📁 Processing: ${langsFolder}`);
    console.log('═'.repeat(70));

    const translations = readLangFiles(langsFolder);

    // Check if source language exists
    if (!translations[SOURCE_LANGUAGE]) {
      console.log(`⚠️  No ${SOURCE_LANGUAGE}.json found in this folder, skipping...`);
      continue;
    }

    const sourceData = translations[SOURCE_LANGUAGE];
    const targetLanguages = Object.keys(translations).filter(
      lang => lang !== SOURCE_LANGUAGE
    );

    if (targetLanguages.length === 0) {
      console.log(`⚠️  No target languages found in this folder, skipping...`);
      continue;
    }

    console.log(`\n📝 Source language: ${SOURCE_LANGUAGE}`);
    console.log(`🎯 Target languages: ${targetLanguages.join(', ')}`);

    // Translate for each target language
    for (const targetLang of targetLanguages) {
      console.log('\n' + '─'.repeat(70));
      console.log(`🌐 Processing language: ${targetLang}`);
      console.log('─'.repeat(70));

      const targetData = translations[targetLang];
      const updatedData = await translateMissingKeys(
        sourceData,
        targetData,
        SOURCE_LANGUAGE,
        targetLang
      );

      // Write updated translation file
      const outputFile = path.join(langsFolder, `${targetLang}.json`);
      try {
        fs.writeFileSync(
          outputFile,
          JSON.stringify(updatedData, null, 2),
          'utf8'
        );
        console.log(`💾 Saved: ${outputFile}`);
      } catch (error) {
        console.error(`❌ Error writing ${outputFile}:`, error.message);
      }
    }
  }

  console.log('\n' + '═'.repeat(70));
  console.log('✨ Translation complete!');
  console.log('═'.repeat(70) + '\n');
}

// ============================================================================
// SCRIPT EXECUTION
// ============================================================================

// Run the script
(async () => {
  try {
    await translateLanguages();
  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
})();