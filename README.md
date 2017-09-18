# ATM Milano - Info API

Simple Node.js service that turns the [ATM Milano news website](https://www.atm.it/it/AtmNews/Pagine/default.aspx) (a messy, non-responsive website) in a REST API JSON data for quicker, simpler and cleaner consulting.

## Built with
* Node.js 8.5.x (*experimental ES modules flag enabled*)
* [Hapi](https://hapijs.com/)
* [X-ray](https://github.com/matthewmueller/x-ray)

## Install & run
Clone and run 
```
$ yarn
```

starts the service
```
$ yarn start
```

as above but with Nodemon (for development)
```
$ yarn dev
```

## Note on ES Modules
In building this project I wanted to work with the newly released Node.js 8.5.0 engine that supports, behind a flag, native ES modules. Since [Now](https://zeit.co/now), the service where I'm hosting the running project, still does not support versions greater than 8.4.x, I've added the [@std/esm](https://www.npmjs.com/package/@std/esm) package to make it work in *"production"*, but locally you will need version 8.5.0.

## License
[MIT](LICENSE).