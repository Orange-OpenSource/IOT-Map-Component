# Development

## Setup environment

```sh
nvm use
```

```sh
cd src/iotMapManager
npm i
cd -
npm --prefix src/iotMapManager run watch
```

Now open a new terminal and run:

```sh
npm i
npm run start
```

To check that everything is working, open a browser and go to http://localhost:4200.

From this point on, you can edit the code of the library and the page will automatically reload with the changes (e.g. change `#FFDD00` to `#FF0000` and the warning markers will become red instead of yellow).