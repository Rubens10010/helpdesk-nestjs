# HELP DESK OUIS PROJECT

# INSTALL PROJECT BACKEND

cd helpdesk-api
npm install
npm run start

# auth

nest g module auth --no-spec
nest g controller auth --no-spec
nest g service auth --no-spec

# user crud

nest g module user --no-spec
nest g controller user --no-spec
nest g service user --no-spec
nest g class user/dtos/createUser.dto --no-spec
nest g class user/dtos/editUser.dto --no-spec
nest g class user/entities/user.entity --no-spec

## GOOGLE AUTHENTICATION

- npm i @nestjs/passport passport passport-google-oauth20
- create file: src/auth/google.strategy.ts
- create routes for request and callback with @UseGuards(AuthGuard('google')) in auth.controller.ts
- Add GoogleStrategy to providers array in auth.module.ts
- use auth.service.ts to connect to users.service.ts and call login/register methods

# user .env file

- npm i dotenv
- npm i -D @types/dotenv
- create .env file
- add to main.ts: import 'dotenv/config';
- call variables: process.env.API_PORT

# .env using nestjs ConfigModule

- npm install @nestjs/config

# database

- npm i --save @nestjs/typeorm typeorm pg
- go to src/ create ormconfig.ts
- nest g module database
- edit file src/database/database.module.ts
- add to package.json scripts:

```
"typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js --config src/ormconfig.ts",
"typeorm:migrate": "npm run typeorm migration:generate -- -n",
"typeorm:run": "npm run typeorm migration:run",
"typeorm:revert": "npm run typeorm migration:revert"
```

- typeorm allows using typescript
- typeorm:migrate generates migrations
- typeorm:run executes latest migrations in folder
- typeorm:rever ctrl + z

## create entities

- Create src/entity folder
- create user.entity.ts
- add entity to users module
- add to Module(): imports: [TypeOrmModule.forFeature([User])],

## run migrations

https://github.com/typeorm/typeorm/blob/master/docs/migrations.md

- first create database in postgres
- Next we will generate migrations folder and generate first migration "init"
- This will generate migration init automatically from changes made to entities
- npm run typeorm:migrate Init
- Run the first migration
- npm run typeorm:run
- This will create users table in db
- Use this same cycle for each migration needed

# Work in service

- Once created the entity and db table
- add to users.service.ts constructor:

```
constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
```

- Create CRUD functions

```
public async getOne(userId: number) {
    const task: User = await this.userRepository.findOne(userId);

    if (!task)
      throw new NotFoundException(`Task with the id ${userId} was not found`);

    /*const taskDTO: TaskDTO = this.entityToDTO(task);

    return taskDTO;*/
    return task;
```

## Validation

npm install class-validator --save
validate DTOs

# Passport authentication
npm install @nestjs/passport passport

# JWT functionality

$ npm install --save @nestjs/jwt passport-jwt
$ npm install --save-dev @types/passport-jwt
$ npm install cookie-parser @types/cookie-parser
$ Install strategy of authentication for google
$ Install JWT generation
- Manage JWT with cookies by placing in controller login method for google auth.
- npm i cookie-parser --save
```
@Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() response: Response) {
    const {user} = req;
    const cookie = await this.authService.login(user);
    response.setHeader('Set-Cookie', cookie);
    console.log(user);
    return response.send(user);
    //This will return an acces_token only if is validated
    //return this.authService.login(req.user);
  }
```