# ATM Milano - Info API

> This project is not officially affiliated with ATM Milano in any ways, it's just a part-time project.

Simple Node.js service that turns the [ATM Milano news website](https://www.atm.it/it/AtmNews/Pagine/default.aspx) (a messy, non-responsive website) in a REST API JSON data for quicker, simpler and cleaner consulting.

## Built with
* Node.js 16.x
* [Hapi](https://hapijs.com/)
* [X-ray](https://github.com/matthewmueller/x-ray)

## Install & run
Clone and run 
```
$ npm ci
```

starts the service
```
$ npm start
```

## Development
Similar to `start` but with Nodemon
```
$ npm run dev
```

Run lint (with `XO`) & test suite (with `Ava`)
```
$ npm test
```

## License
Released under the [MIT](LICENSE) license.