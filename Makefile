.PHONY: backend clear-db install

backend:
	cd backend && npx nodemon --exec npx ts-node src/server.ts

clear-db:
	rm -f backend/database.sqlite

install:
	cd backend && npm install
