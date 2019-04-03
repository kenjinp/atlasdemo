# Atlas Demo

> Show off the features of three-octoplane

This is a demo / prototype for the Blue Brain Project Atlas to show off a possible future implementation using our new octree plane slicing technology.

## Development

Install dependencies:

```sh
npm i
```

To start in development mode, run:

```sh
npm run start
```

Lint code:

```sh
npm run lint
```

Run unit tests:

```sh
npm test
```

## Build for production

Compile app in `dist/` folder.

```sh
npm run build
```

You can run the app with:

```sh
node dist/server.js
```

## Build a Docker image

```sh
docker build . --tag=atlasdemo
```

## ENV variables list

- `BASE_PATH`: The base of the app: i.e. `/staging/atlas` if hosted on `https://bbp-nexus.epfl.ch/staging/atlas` (default is `/`)
- `HOST_NAME`: name of host where application is available from: i.e. `https://bbp-nexus.epfl.ch` (default is protocol + host where server is running from)
- `CLIENT_ID`: The application name used for _OpenID Connect_ authentication (default is `atlasdemo`)
- `API_ENDPOINT`: The URL pointing to Nexus API. Default is '/'
- `SECURE`: Is nexus web running in https or not. Default is `false`

## Getting involved

Issue tracking is centralized into [the main Blue Brain Nexus repository](https://github.com/BlueBrain/nexus).

There are several channels provided to address different issues:

- **Feature request**: If there is a feature you would like to see in this application, please first consult the [list of open feature requests](https://github.com/BlueBrain/nexus/issues?q=is%3Aopen+is%3Aissue+label%3Afeature+label%3Afrontend+label%3Aatlasdemo). In case there isn't already one, please [open a feature request](https://github.com/BlueBrain/nexus/issues/new?labels=feature,frontend,atlasdemo) describing your feature with as much detail as possible.
- **Bug report**: If you have found a bug, please create an issue [here](https://github.com/BlueBrain/nexus/issues/new?labels=bug,frontend,atlasdemo).
