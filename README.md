# serviceo pro

serviceo pro is web application that power's both VMS (Vendor Management System) and PMS (Partner Management 
System). It is built on Angular 2 framework and utilizes number of libraries.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.2.

## Getting Started
To get started with development of this application, use the following steps once you have cloned the application:

- Run `npm install` to install all the dependencies
- Make sure you have following global npm packages installed:
  - @angular/cli 
  - typescript
  - typedoc

### Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Application Architecture

Detailed documentation for this application is available under **docs** directory of source root. It includes
details on application architecture, various components, coding practices and guidelines.

## Documentation

**Documentation** is very critical part of efficient development and we really push for adding documentation to 
your code. We use typedoc to generate documentation which runs the TypeScript compiler and extracts type 
information from the generated compiler symbols.

### Adding Documentation
You can embed documentation in your code using javadoc tags. Typedoc understands javadoc tags. For more 
details as what tags are supported, please visit [Typedoc]()http://typedoc.org/guides/doccomments/)

### Generating Documentation

* Make sure you have typedoc package installed globally
* Run `npm run docs` to generate new documentation based on documentation data embedded in the code.

# Toolbar Configuration

Please visit [Toolbar Documentation Page](https://bitbucket.org/sgAppDevTeam/sg-app-pro/src/renu/src/shared/components/toolbar/README.md) to use toolbar component.