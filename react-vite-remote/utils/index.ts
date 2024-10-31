/**
 * DNT: методы утилиты остались от разработки
 *      пока оставил на случай если они поднадобяться
 */

import fs from "fs";

/**
 * Constant defines pattern to ignore folders or files while getting shared list
 */
export const ignorePatterns = /(node_modules)|(icon-view)|(themes)/gi;

export function isDirectory(path: string): boolean {
  return fs.existsSync(path) && fs.lstatSync(path).isDirectory();
}

export function getSharedAlfaCoreCompontents(): string[] {
  const prefix = "./node_modules/@alfalab/core-components";
  const list = fs.readdirSync(prefix);

  const parsedList = list
    .filter((x: string) => !x.match(ignorePatterns))
    .filter((x: string) => isDirectory(prefix + "/" + x))
    .map((x: string) => prefix + "/" + x);

  return parsedList;
}
