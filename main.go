package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gocolly/colly"
	"github.com/labstack/echo/v4"
)

type Service struct {
	Status string   `json:"status"`
	Now    string   `json:"now"`
	Routes []string `json:"routes"`
}

type News struct {
	Text string `json:"text"`
	Url  string `json:"url"`
}

const DOMAIN string = "https://www.atm.it"
const URL string = "https://www.atm.it/it/AtmNews/Pagine/default.aspx"

// Create a static JSON and serve it
func mainRoute(c echo.Context) error {
	s := Service{
		Status: "Up & running",
		Now:    time.Now().String(),
		Routes: []string{"/news", "/status", "/traffic"},
	}
	return c.JSON(http.StatusOK, s)
}

func newsRoute(c echo.Context) error {
	news := make([]News, 0)
	collector := colly.NewCollector(
		colly.AllowedDomains(DOMAIN),
	)

	fmt.Println(news)

	collector.OnHTML("#atm-comunicati div.news-item", func(element *colly.HTMLElement) {
		newsText := element.Text
		newsUrl := element.Attr("href")

		singleNews := News{
			Text: newsText,
			Url:  newsUrl,
		}

		news = append(news, singleNews)
	})

	collector.OnRequest(func(request *colly.Request) {
		fmt.Println("Visiting", request.URL.String())
	})

	go collector.Visit(URL)

	return c.JSON(http.StatusOK, news)
}

// Server bootstrapping
func main() {
	e := echo.New()           // initialize Echo
	e.GET("/", mainRoute)     // adding routes
	e.GET("/news", newsRoute) // adding routes
	//e.GET("/status", statusRoute) // adding routes
	//e.GET("/traffic", trafficRoute) // adding routes

	e.Logger.Fatal(e.Start(":8080")) // starting server
}
