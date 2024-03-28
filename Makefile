.PHONY: test coverage

deps: .deps-backend .deps-frontend

down:
	docker-compose down

up: .up-backend .up-frontend

test: .test-backend .test-frontend

coverage: .coverage-backend .coverage-frontend

.deps-backend:
	docker-compose run -v "${PWD}/backend:/opt/app" node yarn install

.deps-frontend:
	docker-compose run -v "${PWD}/frontend:/opt/app" node yarn install

.up-backend: .deps-backend
	docker-compose up -d backend

.up-frontend: .deps-frontend
	docker-compose up -d app

.test-backend: .deps-backend
	docker-compose run -v "${PWD}/backend:/opt/app" -e CI=true node yarn test

.test-frontend: .deps-frontend
	docker-compose run -v "${PWD}/frontend:/opt/app" -e CI=true node yarn test

.coverage-backend: .deps-backend
	docker-compose run -v "${PWD}/backend:/opt/app" -e CI=true node yarn test --coverage

.coverage-frontend: .deps-frontend
	docker-compose run -v "${PWD}/frontend:/opt/app" -e CI=true node yarn coverage
