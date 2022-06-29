all: client server node-server tests
docker: server tests

client:
	npm run build:client

server:
	npm run build:server

node-server:
	./node_modules/.bin/tsc server.ts

tests:
	./node_modules/.bin/tsc tests.ts
