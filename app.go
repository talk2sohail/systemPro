package main

import (
	"context"
	"fmt"
	"os"
	"time"

	logger "github.com/wailsapp/wails/v2/pkg/logger"
)

// App struct
type App struct {
	ctx    context.Context
	c      *Controller
	socket string
	log    logger.Logger
}

// NewApp creates a new App application struct
func NewApp() *App {
	log := logger.NewDefaultLogger()
	return &App{log: log}
}

func (a *App) SetSocket(name string) {
	// you can setup some validation here
	a.socket = name
}

func (a *App) GetSocket(name string) string { return a.socket }

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {

	args := os.Args[1:]
	socket := args[0]

	if socket == "" {
		a.log.Fatal("Please provide the socket file path")
	}

	a.SetSocket(socket)

	ctrl, err := NewController(a.socket, time.Second)
	if err != nil {
		a.log.Fatal(fmt.Sprintf("Failed to create the controller, error: %s", err))
	}
	a.c = ctrl
	a.ctx = ctx
}

func (a *App) QueryTable(tableName string) (string, error) {
	response, err := a.c.GetTable(tableName)

	if err != nil {
		a.log.Error(err.Error())
		return "", fmt.Errorf("%s", err)
	}
	return response, nil
}
