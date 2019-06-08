# ANGULAR MINESWEEPER :triangular_flag_on_post: :bomb:

>![responsive web app](https://github.com/grynyk/minesweeper/blob/master/view/src/assets/minesweeper_scr.jpg)

**application which allows user to** 
login, register, observe the results history, configure gameboard dimensions, configure number of mines, mark specific box with flags "it can be a mine" or "it must be a mine" using single click or reveal boxes with double click.

# [DEMO](https://ng-minesweeper-app.herokuapp.com/)

## TECHNOLOGIES

**Front-end:** TypeScript, Angular 8, Angular Material, Html/SCSS, FxLayout.

**Back-end:** JavaScript ES6, Node.js/Express.js, PostgreSQL, node-postgres, babel, bcrypt, jsonwebtoken.

# HOW TO RUN
- Clone this repo.
- Run 'npm install' in the root directory to install backend dependencies.
- Run 'npm install' in the /view directory to install frontend dependencies.
- Create .env file in root folder and declare an url to database in it (postgres://{db_username}:{db_password}@{host}:{port}/{db_name}).
- Run 'npm run dev-start' in root directory should start your server.
- Edit proxy-config.json in view directory and edit the target attribute with your port, by default its 3000 (This is made to skip CORS issues):
```
{
    "/api":{
        "target":"http://localhost:3000",
        "secure": false,
        "changeOrigin":true
    }
}
```
- Run 'npm start' in /view directory to start Angular
- Voilà !

# DATABASE

### users 

Column | Type | Nullable 
--- | ---  | --- 
id | uuid | NO 
username | character varying | NO 
password | character varying | NO
created_date | date | NO 
wins | integer | YES 
losts | integer | YES 

### game_results 

Column | Type | Nullable 
--- | ---  | --- 
id | uuid | NO 
user_id | uuid | NO 
dimensions | character varying | NO 
mode | character varying | NO
created_date | date | NO 
score | integer | YES 
win | boolean | YES 
