# AngularBoilerplate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.8.

# Dependencies

    Angular : 14
    Angular CLI : 14.2.10
    Angular Universal : 14.2.3
    Package Manager: npm version v8.5.0
    Node version v16.14.2

# Minimum requirement

    Node version v14.15

# Features

    Routing
    Lazy Loading
    Responsive Layout
    Server-side rendering (SSR) with Angular Universal
    Components
    Services
    Reactive Form
    Husky
    Eslint / Preetier
    Language Translation
    Theme changing

# Quick start

# select a repo from github or gitlab

# download the example or clone the repo from github

git clone http://gitlab.galaxyweblinks.com/root/angular-boilerplate.git

# change directory

cd angular-boilerplate

# Installation

npm install (installing dependencies)

------------------------------------------Husky instalation-------------------------------------------------

## Husky instalation

npm install husky --save-dev

# Enable Git hooks, To automatically have Git hooks enabled after install

npx husky install

# Create a hook

# To add a command to a hook or create a new one, use husky add <file> [cmd] (don't forget to run husky install before).

npx husky add .husky/pre-commit "npm test"
git add .husky/pre-commit

---

# Developpement

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

# Linter

npm run lint

# Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

# Compilation

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
Run `npm run build:ssr` to build the SSR project. The build artifacts will be stored in the `dist/` directory.

# Production

npm run serve:ssr
in your browser http://localhost:4000

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

