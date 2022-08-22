/**
 * This utility makes it easier to automatically auto-import the components from the UI Module
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
  uiFeaturePath = path.join(__dirname, '..', '..', '..', 'app-modules', 'ui')
  uiFeatureDirectories = getDirectories(uiFeaturePath).map((directory) => `~/app-modules/ui/${directory}/components`)
} catch (err) {
  console.warn('WARN: nuxt.config > components - Unable to iterate over UI Feature components to auto-import. UI Features may not work')
  console.warn('WARN: Check ~/app-modules/ui directory exists')
  uiFeatureDirectories = []
}

export {
  uiFeatureDirectories
};