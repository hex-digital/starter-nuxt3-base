/**
 * This utility makes it easier to automatically auto-import the components from the UI Feature
 */

const path = require('path');
import fs from 'fs'

function getDirectories(source: string) {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

let uiFeaturePath
let uiFeatureDirectories: Array<string> = [];

try {
  uiFeaturePath = path.join(__dirname, '..', '..', '..', 'features', 'ui')
  uiFeatureDirectories = getDirectories(uiFeaturePath).map((directory) => `~/features/ui/${directory}/components`)
} catch (err) {
  console.warn('WARN: nuxt.config > components - Unable to iterate over UI Feature components to auto-import. UI Features may not work')
  console.warn('WARN: Check ~/features/ui directory exists')
  uiFeatureDirectories = []
}

export {
  uiFeatureDirectories
};