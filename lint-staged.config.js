module.exports = {
  './src/*.{ts,tsx,vue}': [
    () => 'yarn --cwd src nuxi typecheck --noEmit', // Have to run typecheck on all files via a function - can't check just staged files
    'eslint --fix',
  ],
  './src/*.{js,jsx}': 'eslint --fix',
}
