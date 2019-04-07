.PHONY: build test clean

ME=`id -u`:`id -g`

dshell:
	@echo "Running a Docker shell... 🐚"
	@docker-compose run --rm --user ${ME} --entrypoint bash atlasdemo

install:
	@echo "Installing project's dependencies... 🚀"
	@npm i

start:
	@echo "starting all the things in dev mode"
	@node_modules/.bin/http-server ./@data --cors & npm start ^ open http://127.0.0.1:8000

examples:
	@echo "start examples"
	@node_modules/.bin/http-server -p 9000 & open http://127.0.0.1:9000/%40slicer/examples/