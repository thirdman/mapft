# SVG TOkens

- Vue/Nuxt served via vercel
- push to staging branch and view at xxx
- push to production branch and view at xxx

.env variables are set locally in the .env file, but served on deploys via vercel env variables.

## Project setup

```
npm install
```

### For development

```
npm run dev

Notes:
- local nodejs requires v12
- whitelist your wallet in ui/devAddresses to allow dev mode

### Color Themes & UI settings
- UI state is controlled by the `UiStore` store, and values saved to local storage.
- Colors are managed by css variables, which are set by a theme class applied to the `#body` element.
- themes can be a dark or light mode, which is set when the them is applied. This is used by accessing the `contrastMode` variable. (also saved in local storage)
- When using icons, pass through the `contrastMode` prop, which will allow them to invert when depending on color mode


```

### Compiles and minifies for production

```
npm run build
```

### Bugs

Apparently with this combination of npm modules, the sass-loader fails when upgraded past 7.0.1

Currently the version is set in package.json: "sass-loader": "7.0.1",
