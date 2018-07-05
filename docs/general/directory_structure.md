# Project directory structure

## Overview

Proper styling and consistent directory structure is very important to handle large codebase like loklak_search.

## Objectives

- Define the core structure of loklak_search
- Create a feature based file structure

## Core Structure

There are plenty of other ways to structure the application but we are following a normal collective structure with all similar features and component at one place.

The directory structure is as given below showing the core files and components:

```
├── .github/
├── e2e/
├── src/
│   │   ├── app/
│   │   |   ├── components
│   │   |   |   ├── ex.component.html
│   │   |   |   ├── ex.component.scss
│   │   |   |   ├── ex.component.spec.ts
│   │   |   |   ├── ex.component.ts
│   │   |   ├── actions/
│   │   |   ├── effects/
│   │   |   ├── models/
│   │   |   ├── reducers/
│   │   |   ├── services/
│   │   |   ├── shared/
│   │   |   ├── app.routing.module.ts
│   │   |   ├── app.component.html
│   │   |   ├── app.component.scss
│   │   |   ├── app.component.spec.ts
│   │   |   ├── app.component.ts
│   │   |   ├── app.module.ts
│   │   |   ├── index.ts
│   │   ├── assets/
│   │   |   ├── images/
│   │   |   ├── .gitkeep
│   │   |   ├── .npmignore
│   │   ├── environments/
│   │   ├── styles/
│   │   |   ├── partials/
│   │   |   ├── main.scss
│   │   ├── testing/
│   │   ├── browserlist
│   │   ├── index.html
│   │   ├── karma.conf.js
│   │   ├── main.ts
│   │   ├── manifest.json
│   │   ├── polyfills.ts
│   │   ├── styles.scss
│   │   ├── test.ts
│   │   ├── tsconfig.app.json
│   │   ├── tsconfig.spec.json
│   │   ├── tslint.json
│   │   ├── typings.d.ts
├── .editorconfig
├── .gitignore
├── .jshintrc
├── .travis.yml
├── angular.json
├── codecov.yml
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
├── sass-lint.yml
├── tsconfig.json
├── tslint.json
├── yarn.lock
```
