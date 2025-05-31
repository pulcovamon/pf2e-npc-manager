.PHONY: backend clear-db install frontend app

backend:
	cd backend && npx nodemon --exec npx ts-node src/server.ts

frontend:
	cd frontend && npm run dev

clear-db:
	rm -f backend/database.sqlite

install:
	cd backend && npm install

app:
	make backend &
	make frontend
