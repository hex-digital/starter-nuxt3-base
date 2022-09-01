<template>
  <pre><code><slot /></code></pre>
</template>

<style scoped>
pre {
  background: #262629;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  color: #fff;
  font-family: 'Source Code Pro', 'Courier New', Courier, monospace;
  font-size: 12px;
  line-height: 170%;
  overflow: auto;
  padding: 20px 20px 0;
}

code {
  display: block;
  overflow-x: auto;
  padding-bottom: 20px;
  padding-right: 45px;
}
</style>
