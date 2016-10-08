# loklak_search

[![Build Status](https://travis-ci.org/fossasia/loklak_search.svg?branch=master)](https://travis-ci.org/fossasia/loklak_search)
[![Join the chat at https://gitter.im/loklak/loklak](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/loklak/loklak)
[![Code Climate](https://codeclimate.com/github/fossasia/loklak_search/badges/gpa.svg)](https://codeclimate.com/github/fossasia/loklak_search)
[![codecov](https://codecov.io/gh/fossasia/loklak_search/branch/master/graph/badge.svg)](https://codecov.io/gh/fossasia/loklak_search)
[![Dependency Status](https://gemnasium.com/badges/github.com/fossasia/loklak_search.svg)](https://gemnasium.com/github.com/fossasia/loklak_search)

The loklak_search creates a website using the loklak server as a data source. The goal is to get a search site, that offers timeline search as well as custom media search, account and geolocation search.

In order to run the service you can use the API of http://api.loklak.org or install your own loklak server data storage engine. [loklak_server](https://github.com/loklak/loklak_server) is a server application which collects messages from various social media tweet sources, including twitter. The server contains a search index and a peer-to-peer index sharing interface. All messages are stored in an elasticsearch index.

---

## Communication

Please join our mailing list to discuss questions regarding the project: https://groups.google.com/forum/#!forum/loklak

Our chat channel is on gitter here: https://gitter.im/loklak/loklak

## Installation

There is no 'installation' process for loklak_search, it consist of web pages which must work in a local environment, hosted in the file system and hosted as github pages as well. This repository will host the pages as github pages.

## Technology Stack

### Components

* Angular2

## Services and Dependencies

### Bower

The goal is to use [Bower](http://bower.io) to manage front-end dependencies in future.

### Loklak Server
See here to run your own https://github.com/loklak/loklak_server (reccommended), and change `apiUrl` in config accordingly. Last resource, or for production is `http://api.loklak.org

## Contributions, Bug Reports, Feature Requests

This is an Open Source project and we would be happy to see contributors who report bugs and file feature requests submitting pull requests as well. Please report issues in the GitHub tracker.

## Branch Policy

Note: For the initialization period all commits go directly to the gh-pages branch. In the next stages we follow the branch policy as below:

We have the following branches
 * **development**
	 All development goes on in this branch. If you're making a contribution,
	 you are supposed to make a pull request to _development_.
	 PRs to gh-pages must pass a build check and a unit-test check on Travis
 * **gh-pages**
   This contains shipped code. After significant features/bugfixes are accumulated on development, we make a version update, and make a release.

## License

This project is currently licensed under the The MIT License (MIT). A copy of LICENSE.md should be present along with the source code. To obtain the software under a different license, please contact FOSSASIA.
