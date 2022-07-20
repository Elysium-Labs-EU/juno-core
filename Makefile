SHELL := /bin/bash
run-vite-2:
	rm -rf node_modules
	yarn add vite@2.9.13
	yarn add @vitejs/plugin-react@1.3.2
	yarn
	yarn start

run-vite-3:
	rm -rf node_modules
	yarn add vite
	yarn add @vitejs/plugin-react
	yarn
	yarn start