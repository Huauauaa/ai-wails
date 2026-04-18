package main

import (
	"context"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet is exposed to the frontend as an example binding.
func (a *App) Greet(name string) string {
	if name == "" {
		name = "there"
	}
	return "Hello " + name + ", welcome to ai-wails."
}
