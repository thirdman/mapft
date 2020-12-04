# infinft-flow

- Vue/Nuxt served via vercel
- push to staging branch and view at https://staging.infinft.app
- push to production branch and view at https://infinft.app

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

```

### Compiles and minifies for production

```
npm run build
```
