# ATM Milano - Info API

> This project is not officially affiliated with ATM Milano in any ways, it's just a part-time project.

Simple Go service that turns the [ATM Milano news website](https://www.atm.it/it/AtmNews/Pagine/default.aspx) (*a messy and non-responsive website*) in a REST API JSON data for quicker, simpler and cleaner consulting.

## Built with
* [Go](https://golang.org/) v1.16+
* [Echo](https://echo.labstack.com/) - routing
* [goquery](https://pkg.go.dev/github.com/PuerkitoBio/goquery) - parse HTML

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