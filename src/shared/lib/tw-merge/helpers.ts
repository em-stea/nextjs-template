import type {NextConfig} from "next";

import fs from "fs";
import path from "path";

let hasLoggedGenerationAttemptInThisProcess = false;

const SEMANTIC_TOKENS_DIR = path.join(process.cwd(), "src/shared/styles/semantic-tokens");
const OUTPUT_PATH = path.join(process.cwd(), "src/shared/lib/tw-merge/generated-config.json");

/**
 * Parsea un archivo CSS y extrae los tokens de variables CSS dentro de @theme
 */
function parseCSSTokens(filePath: string): Record<string, string[]> {
  try {
    const cssContent = fs.readFileSync(filePath, "utf-8");
    const tokens: Record<string, string[]> = {};

    // Soporta `@theme { ... }` y `@theme inline { ... }`
    const themeBlockRegex = /@theme[^{]*\{([^}]+)\}/g;
    const variableRegex = /--([a-zA-Z0-9_-]+):\s*[^;]+;/g;

    let themeMatch: RegExpExecArray | null;

    while ((themeMatch = themeBlockRegex.exec(cssContent)) !== null) {
      const themeContent = themeMatch[1];
      let match: RegExpExecArray | null;

      // Reset lastIndex: themeContent is a new string each iteration
      variableRegex.lastIndex = 0;

      while ((match = variableRegex.exec(themeContent)) !== null) {
        const fullVariableName = match[1];
        const parts = fullVariableName.split("-");

        if (parts.length < 2) continue;

        const prefix = parts[0];
        // En Tailwind v4, `_` en el nombre del token mapea a `.` en la utility (--text-3_5 → text-3.5)
        const tokenName = parts.slice(1).join("-").replaceAll("_", ".");

        if (!Object.hasOwn(tokens, prefix)) {
          tokens[prefix] = [];
        }

        if (!tokens[prefix].includes(tokenName)) {
          tokens[prefix].push(tokenName);
        }
      }
    }

    return tokens;
  } catch (error) {
    console.error("Error leyendo el archivo CSS:", error);

    return {};
  }
}

function mergeTokens(target: Record<string, string[]>, source: Record<string, string[]>): void {
  for (const [prefix, tokenList] of Object.entries(source)) {
    if (!Object.hasOwn(target, prefix)) {
      target[prefix] = [];
    }

    for (const token of tokenList) {
      if (!target[prefix].includes(token)) {
        target[prefix].push(token);
      }
    }
  }
}

/**
 * Genera el archivo de configuración JSON automáticamente
 */
function generateConfigFile(): void {
  const isFirstLoggingAttemptInThisProcess = !hasLoggedGenerationAttemptInThisProcess;

  if (isFirstLoggingAttemptInThisProcess) {
    console.log("🔍 Generando configuración TailwindMerge desde:", SEMANTIC_TOKENS_DIR);
  }

  if (!fs.existsSync(SEMANTIC_TOKENS_DIR)) {
    console.warn("No se encontró el directorio de semantic tokens:", SEMANTIC_TOKENS_DIR);

    return;
  }

  const tokens: Record<string, string[]> = {};
  const cssFiles = fs
    .readdirSync(SEMANTIC_TOKENS_DIR)
    .filter((file) => file.endsWith(".css"))
    .map((file) => path.join(SEMANTIC_TOKENS_DIR, file));

  for (const cssFilePath of cssFiles) {
    mergeTokens(tokens, parseCSSTokens(cssFilePath));
  }

  for (const prefix of Object.keys(tokens)) {
    tokens[prefix].sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));
  }

  const configContent = `${JSON.stringify(tokens, null, 2)}\n`;
  const outputDir = path.dirname(OUTPUT_PATH);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, {recursive: true});
  }

  let shouldWrite = true;

  if (fs.existsSync(OUTPUT_PATH)) {
    const existingContent = fs.readFileSync(OUTPUT_PATH, "utf-8");

    shouldWrite = existingContent !== configContent;
  }

  if (shouldWrite) {
    fs.writeFileSync(OUTPUT_PATH, configContent);

    if (isFirstLoggingAttemptInThisProcess) {
      console.log("✅ Configuración TailwindMerge actualizada");
      console.log("📊 Tokens encontrados:");
      Object.entries(tokens).forEach(([prefix, tokenList]) => {
        console.log(`   ${prefix}: ${String(tokenList.length)} tokens`);
      });
    }
  } else if (isFirstLoggingAttemptInThisProcess) {
    console.log("ℹ️ Configuración TailwindMerge sin cambios");
  }

  if (isFirstLoggingAttemptInThisProcess) {
    hasLoggedGenerationAttemptInThisProcess = true;
  }
}

export function withTailwindMergeConfig(config: NextConfig): NextConfig {
  generateConfigFile();

  return config;
}
