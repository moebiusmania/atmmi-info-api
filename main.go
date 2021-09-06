package main

import (
	"log"
	"net/http"
	"regexp"
	"strings"
	"time"

	"github.com/PuerkitoBio/goquery"
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

type LineStatus struct {
	Line   string `json:"line"`
	Text   string `json:"text"`
	Status string `json:"status"`
}

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

// handling the /news route
func newsRoute(c echo.Context) error {
	news := make([]News, 0)

	doc := getDocument()

	doc.Find("#atm-comunicati div.news-item a").Each(func(index int, item *goquery.Selection) {
		text := item.Text()
		url, _ := item.Attr("href")

		singleNews := News{
			Text: text,
			Url:  url,
		}

		news = append(news, singleNews)
	})

	return c.JSON(http.StatusOK, news)
}

// handling the /status route
func statusRoute(c echo.Context) error {
	lines := make([]LineStatus, 0)

	doc := getDocument()

	re := regexp.MustCompile(`[M][0-9]`)

	doc.Find("#StatusLinee tr").Each(func(index int, item *goquery.Selection) {
		line, _ := item.Find("div.StatusLinee_Stretch").Attr("id")
		text := item.Find("div.StatusLinee_DirezioneScritta").Text()
		status := item.Find("div.StatusLinee_Stretch").Text()

		if len(line) > 0 {
			singleLine := LineStatus{
				Text:   strings.TrimSpace(text),
				Line:   re.FindStringSubmatch(line)[0],
				Status: strings.TrimSpace(status),
			}

			lines = append(lines, singleLine)
		}
	})

	return c.JSON(http.StatusOK, lines)
}

// handling the /trffic route
func trafficRoute(c echo.Context) error {
	traffic := make([]News, 0)

	doc := getDocument()

	doc.Find("#subhomepage-cx-infomobilita > div:nth-child(1) > table div.item.link-item a").Each(func(index int, item *goquery.Selection) {
		text := item.Text()
		url, _ := item.Attr("href")

		entry := News{
			Text: text,
			Url:  url,
		}

		traffic = append(traffic, entry)
	})

	return c.JSON(http.StatusOK, traffic)
}

func getDocument() *goquery.Document {
	doc, err := goquery.NewDocument(URL)
	if err != nil {
		log.Fatal(err)
	}
	return doc
}

// Server bootstrapping
func main() {
	e := echo.New()                 // initialize Echo
	e.GET("/", mainRoute)           // adding routes
	e.GET("/news", newsRoute)       // adding routes
	e.GET("/status", statusRoute)   // adding routes
	e.GET("/traffic", trafficRoute) // adding routes

	e.Logger.Fatal(e.Start(":8080")) // starting server
}
