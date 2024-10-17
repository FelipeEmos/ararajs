<div align="center">
  <a href="https://arara.dev">
    <img src="https://arara.dev/readme/arara.png" width=1000 alt="arara banner" />
  </a>
</div>
<br />
<div align="center">

[![NPM Version](https://img.shields.io/npm/v/arara)](https://www.npmjs.com/package/arara)
[![NPM Downloads](https://img.shields.io/npm/dm/arara)](https://www.npmjs.com/package/arara)
[![License](https://img.shields.io/github/license/araradev/arara)](https://github.com/araradev/arara/blob/main/LICENSE)

**[Documentation](https://arara.dev/) • [Discussions](https://github.com/araradev/arara/discussions)**
</div>

## About
This is the [tailwindcss](https://tailwindcss.com/) plugin for [arara](https://arara.dev/). It adds modifiers to style primitives based on their state:

```tsx
<Dialog.Content
  class="arara-open:animate-in arara-closed:animate-out"
>
  ...
</Dialog.Content>
```

## Getting started
Install the plugin with the package manager of your choice:

```bash
npm install @arara/tailwind
```

Then add the plugin to your `tailwind.config.js` file:

```js
module.exports = {
  // ...
  plugins: [
    // Use it with the default prefix 'arara'
    require('@arara/tailwind'),
    // or with a custom prefix
    require('@arara/tailwind')({ prefix: 'ui' }),
    // ...
  ],
}
```
