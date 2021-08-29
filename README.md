# ATM Milano - Info API

[![Test before deploy](https://github.com/moebiusmania/atmmi-info-api/actions/workflows/push.yml/badge.svg)](https://github.com/moebiusmania/atmmi-info-api/actions/workflows/push.yml)

> This project is not officially affiliated with ATM Milano in any ways, it's just a part-time project.

Simple Go service that turns the [ATM Milano news website](https://www.atm.it/it/AtmNews/Pagine/default.aspx) (*a messy and non-responsive website*) in a REST API JSON data for quicker, simpler and cleaner consulting.

## Built with
* [Go](https://golang.org/) v1.16+
* [Hapi](https://hapijs.com/)
* [X-ray](https://github.com/matthewmueller/x-ray)

## Install & run
Clone the repo
```
$ git clone https://github.com/moebiusmania/atmmi-info-api
```

locally starts the service
```
$ go run .
```

## Development
Build the binaries
```
$ go build .
```


## License
Released under the [MIT](LICENSE) license.