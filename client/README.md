# aurelia-api-loopback-sample

A simple sample of the aurelia-skeleton where [aurelia-api](https://github.com/SpoonX/aurelia-api) is used to connect to a [loopback](http://loopback.io/) server.

## Running The App

To run the app, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

```shell
  npm install
```

3. Ensure that [Gulp](http://gulpjs.com/) is installed globally. If you need to install it, use the following command:

```shell
  npm install -g gulp
```

  > **Note:** Gulp must be installed globally, but a local version will also be installed to ensure a compatible version is used for the project.

4. Ensure that [jspm](http://jspm.io/) is installed globally. If you need to install it, use the following command:

```shell
  npm install -g jspm
```

>   **Note:** jspm must be installed globally, but a local version will also be installed to ensure a compatible version is used for the project.

5. Install the client-side dependencies with jspm:

```shell
  jspm install -y
```

6. To run the app, execute the following command:

```shell
  gulp watch
```

7. Browse to [http://localhost:9000](http://localhost:9000) to see the app. You can make changes in the code found under `src` and the browser should auto-refresh itself as you save files.
