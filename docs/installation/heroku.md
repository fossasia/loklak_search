# Heroku

One-click Heroku deployment is available:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/fossasia/loklak_search)

### Steps for Manual Deployment

* We need to install heroku on our local machine. Type the following in your linux terminal:
	* ```wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh```
  This installs the Heroku Toolbelt on your machine to access heroku from the command line.
  For windows user, install from [here](https://devcenter.heroku.com/articles/heroku-cli#windows)
* Next we need to login to our heroku server (assuming that you have already created an account). Type the following in the terminal:
	* ```heroku login``` (for windows user on cygwin or git bash: ```winpty heroku login```)
    * Enter your credentials and login.
* Once logged in we need to create a space on the heroku server for our application. This is done with the following command
	* ```heroku create```
* Add nodejs build pack to the app
    * ```heroku buildpacks:set heroku/nodejs```
* Then we will deploy the code to heroku.
	* ```git push heroku development``` or
    * ```git push heroku yourbranch:development``` if you are in a different branch than development
