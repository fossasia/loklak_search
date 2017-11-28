# Heroku

One-click Heroku deployment is available:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/fossasia/loklak_search)

### Steps for Manual Deployment

* We need to install heroku on our machine. Type the following in your linux terminal:
	* ```wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh```
  This installs the Heroku Toolbelt on your machine to access heroku from the command line.
* Next we need to login to our heroku server (assuming that you have already created an account). Type the following in the terminal:
	* ```heroku login```
    * Enter your credentials and login.
* Once logged in we need to create a space on the heroku server for our application. This is done with the following command
	* ```heroku create```
* Add nodejs build pack to the app
    * ```heroku buildpacks:add --index 1 heroku/nodejs```
* Then we deploy the code to heroku.
	* ```git push heroku master``` or
    * ```git push heroku yourbranch:master``` if you are in a different branch than master