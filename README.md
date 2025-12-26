# FNC Tracking

This project was bootstrapped with [vite](https://vite.dev/guide/):

    yarn create vite

## Base updates

### Packages

Additional packages

    yarn add react-router-dom
    yarn add @mui/material @emotion/react @emotion/styled
    yarn add jotai
    yarn add gh-pages --save-dev
    
### Configuration

Add homepage to `package.json`:

    {
    "homepage": "https://<username>.github.io/<repo-name>/"
    }

and deploy scripts.

    {
        "scripts": {
            "build": "vite build",
            "predeploy": "yarn build",
            "deploy": "gh-pages -d dist"
        }
    }

Set Vite base in `vite.config.js`.

    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import path from "path";

    export default defineConfig({
        base: "/fnc-tracking/",
        plugins: [react()],
        resolve: {
            alias: {
            "@": path.resolve(__dirname, "src"),
            },
        },
    })


## Develop, build, & deploy

Develop: 

    yarn start

Build:

    yarn build

Deploy

    yarn deploy



