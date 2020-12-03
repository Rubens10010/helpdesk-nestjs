# go to docs/task-management-compose.yml

- stop postgresql service
- $ docker-compose -f task-management-compose.yml up -d
- go to http://localhost:8888/ user:postgres pw:123456

# Create nest project

- nest new project | cd project
- npm i --save @nestjs/typeorm typeorm pg
- create new ormconfig.ts in src project path

# manage database

- nest g module database
- edit file src/database/database.module.ts

# typeorm scripts

- add to package.json

```
"typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js --config src/ormconfig.ts",
"typeorm:migrate": "yarn typeorm migration:generate -n",
"typeorm:run": "yarn typeorm migration:run",
"typeorm:revert": "yarn typeorm migration:revert"
```

- run: npm run typeorm:migrate Init
- create src/entity/task.entity.ts
- npm run typeorm:migrate AddTask
- This will create the migrations folder with entity table sql
- Execute migration: npm run typeorm:run

# Modulos

- nest g module task
- nest g controller task
- nest g service task

# Modulo task agregar entidades

- editar: imports: [TypeOrmModule.forFeature([Task])],

# service constructor

```
constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}
```

# task controller

- edit: @Controller('tasks')

```
constructor(private readonly taskService: TaskService) {}

  @Post()
  public async createOne(@Body() createTaskRequest: CreateTaskDTO) {
    const resp = await this.taskService.createOne(createTaskRequest);

    return resp;
  }
```

# CRUD

- Writing public async functions in controller -> use service functions -> service uses repository functions.
- Transform all responses to DTO objects.

# enable cors

- in main.ts
- app.enableCors();
