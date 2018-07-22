# loklak_search

[![Join the chat at https://gitter.im/loklak/loklak](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/loklak/loklak)
[![Code Climate](https://codeclimate.com/github/fossasia/loklak_search/badges/gpa.svg)](https://codeclimate.com/github/fossasia/loklak_search)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/cf7beeb59bce451f9e02958f301554d8)](https://www.codacy.com/app/fossasia/loklak_search?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=fossasia/loklak_search&amp;utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/fossasia/loklak_search/branch/master/graph/badge.svg)](https://codecov.io/gh/fossasia/loklak_search)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/fossasia/loklak_search.svg)](http://isitmaintained.com/project/fossasia/loklak_search "Percentage of issues still open")
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/fossasia/loklak_search.svg)](http://isitmaintained.com/project/fossasia/loklak_search "Average time to resolve an issue")

Development: [![Build Status](https://travis-ci.org/fossasia/loklak_search.svg?branch=development)](https://travis-ci.org/fossasia/loklak_search)
Master: [![Build Status](https://travis-ci.org/fossasia/loklak_search.svg?branch=master)](https://travis-ci.org/fossasia/loklak_search)

The loklak_search creates a website using the loklak server as a data source. The goal is to get a search site, that offers timeline search as well as custom media search, account and geolocation search.

In order to run the service, you can use the API of https://api.loklak.org or install your own loklak server data storage engine. [loklak_server](https://github.com/loklak/loklak_server) is a server application which collects messages from various social media tweet sources, including Twitter. The server contains a search index and a peer-to-peer index sharing interface. All messages are stored in an elasticsearch index.

The site of this repo is deployed on the GitHub gh-pages branch and automatically deployed here: https://loklak.org. The branches are deployed on Heroku for testing: 
* Development: https://loklak-search-dev.herokuapp.com
* Master: https://loklak-search.herokuapp.com

---

## Communication

Please join our mailing list to discuss questions regarding the project: https://groups.google.com/forum/#!forum/opntec-dev

Our chat channel is on gitter here: https://gitter.im/loklak/loklak

## Technology Stack
##### Components
* HTML - Structure of the web page generated.
* CSS - Styling options and details of the web page.
* JavaScript(JSON) - Used to store information for deploying the application such as dependencies.
* Angular 6 - Structure for deployment of the web page.
* Bootstrap 3.3.2 - Responsive Design

## Requirements
* [Angular-cli](https://github.com/angular/angular-cli#installation)
* node v8.9+
* npm v5.5+

## Installation
First, we will need to install angular-cli by using the following command:
```sh
$ npm install -g @angular/cli
```
After installing angular-cli we need to install our required node modules, so we will do that by using the following command:
```sh
$ npm install
```

## How to deploy?
### Running on localhost:
* **Step 1:** Fork loklak_search repository and clone it to your desktop
* **Step 2:** Then cd into that cloned folder
* **Step 3:** Deploy locally by running this:```$ ng serve```

#### How to use ngrx/StoreDevtools?
* **Step 1:** Install the `Redux Devtools` [extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en-US).
* **Step 2:** We don't enable the ReduxDevtools by default due to performance considerations. To enable this, un-comment the *StoreDevtools* `import` in `app.module.ts`.

**Note:** Please make sure that you comment the *StoreDevtools* `import` again before making the PR.

### For deploying with [Surge](https://surge.sh/):

Surge will automatically generate deployment link whenever a pull request passes Travis CI. 

Suppose pull request number is 150 and it passes Travis CI. The deployment link can be found here: `https://pr-150-fossasia-LoklakSearch.surge.sh`

### For deploying with [Github Pages](https://pages.github.com/):
With these very simple steps you can have loklak_search deployed:
* **Step 1:** Fork loklak_search repository and clone it to your desktop
* **Step 2:** Then check out to your master branch `$ git checkout master`
* **Step 3:** Deploy running this: ```$ npm run deploy```
* **Step 4:** Visit `https://yourusername.github.io/loklak_search` and you should see the search running
* **Step 5:** As you search you might see that it can't find anything, to resolve this, on search you will see there is a red shield on search bar, click on it and allow to load scripts
* **Step 6:** Reload and you will have a function loklak search page deployed with github pages.

### For deploying with [Heroku](https://www.heroku.com/):

loklak_search can be deployed on Heroku using:
1. [Deployment on Heroku](docs/installation/heroku.md)

One-click Heroku deployment is also available:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/fossasia/loklak_search)

### Loklak Server
See here to run your own https://github.com/loklak/loklak_server (recommended), and change `apiUrl` in config accordingly. Last resource, or for production is https://api.loklak.org

## Contributions, Bug Reports, Feature Requests

This is an Open Source project and we would be happy to see contributors who report bugs and file feature requests, submitting the pull requests as well. Please report issues in the GitHub tracker.

## Branch Policy

We have the following branches:
 * **development**
   All development goes on in the development branch. If you're making a contribution, please make a pull request to _development_. PRs to the branch must pass a build check and a unit-test check on Travis (https://loklak-search.herokuapp.com - Is running off the latest development branch).
 * **master**
	 This branch contains shipped code. After significant features/bug-fixes are accumulated on development, development branch is merged into master branch. (https://loklak.org - Is running off the lastest master branch.).
 * **gh-pages**
   This contains the autogenerated code of the master branch that is generated by Travis.

## License

This project is currently licensed under [GNU Lesser General Public License v3.0](./LICENSE). To obtain the software under a different license, please contact FOSSASIA.
