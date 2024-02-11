.PHONY: test coverage

deps: .deps-api .deps-webapp

down:
	docker-compose down

up: .up-api .up-webapp

test: .test-api .test-webapp

coverage: .coverage-api .coverage-webapp

.deps-api:
	docker-compose run -v "${PWD}/api:/opt/app" node yarn install

.deps-webapp:
	docker-compose run -v "${PWD}/webapp:/opt/app" node yarn install

.up-api: .deps-api
	docker-compose up -d api

.up-webapp: .deps-webapp
	docker-compose up -d app

.test-api: .deps-api
	docker-compose run -v "${PWD}/api:/opt/app" -e CI=true node yarn test

.test-webapp: .deps-webapp
	docker-compose run -v "${PWD}/webapp:/opt/app" -e CI=true node yarn test

.coverage-api: .deps-api
	docker-compose run -v "${PWD}/api:/opt/app" -e CI=true node yarn test --coverage

.coverage-webapp: .deps-webapp
	docker-compose run -v "${PWD}/webapp:/opt/app" -e CI=true node yarn coverage
