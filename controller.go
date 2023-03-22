package main

import (
	"encoding/json"
	"fmt"
	"time"

	osquery "github.com/osquery/osquery-go"
)

type Controller struct {
	socket  string
	client  *osquery.ExtensionManagerClient
	timeout time.Duration
}

func NewController(socket string, timeout time.Duration) (*Controller, error) {
	s := &Controller{
		socket:  socket,
		timeout: timeout,
	}

	c, err := osquery.NewClient(socket, timeout)

	if err != nil {
		return nil, fmt.Errorf("client error: %s", err)
	}

	s.client = c

	return s, nil
}
func (c Controller) GetTable(query string) (string, error) {

	//make the query to the daemon/shell
	res, err := c.client.Query(query)
	if err != nil {
		return "", fmt.Errorf("query error: %s", err)
	}

	if res.Status == nil {
		return "", fmt.Errorf("query returned nil status")
	}

	if res.Status.Code != 0 {
		return "", fmt.Errorf("query returned error: %s", res.Status.GetMessage())
	}

	//marshall the response string
	data, err := json.Marshal(res.Response)
	if err != nil {
		return "", fmt.Errorf("failed to marshall the query response, error: %s", err)
	}
	// return the result
	return string(data), nil
}
