# Docker

[![Deploy to Docker Cloud](https://files.cloud.docker.com/images/deploy-to-dockercloud.svg)](https://cloud.docker.com/stack/deploy/?repo=https://github.com/fossasia/loklak_search)

* Get the latest version of docker. See the [offical site](https://docs.docker.com/engine/installation/) for installation info for your platform.

* Install the latest version of docker-compose. Windows and Mac users should have docker-compose by default as it is part of Docker toolbox. For Linux users, see the
[official guide](https://docs.docker.com/compose/install/).

* Run `docker` and in terminal to see if they are properly installed.

* Clone the project and cd into it.

```bash
git clone https://github.com/fossasia/loklak_search.git && cd loklak_search
```

* In the terminal window, run `docker build -t loklak_search:latest` to build loklak_search's docker image. This process can take some time.

* After build is done, run `docker run -d -p 4200:4200 loklak_search` to start the server.
