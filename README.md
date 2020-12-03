# Como Instalar

# Backend port 3000

- cd task-management-api
- stop postgresql service
- docker-compose -f docs/task-management-compose.yml up -d
- go to http://localhost:8888/ then login user:postgres pw:123456
- npm install
- npm run typeorm:migrate Init
- npm run typeorm:run
- npm run start:dev

# Test in postman

- Insert tasks to database by sending post request to http://localhost:8080/task
- request body:

```
{
    "title": "task 3",
    "description": "creada ahora"
}
```

# Frontend port 8080

- cd frontend
- npm install
- npm run serve

# Test go to:

http://localhost:8080/user/tasks
