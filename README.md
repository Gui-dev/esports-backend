<h1 align="center">
  eSports
</h1>
<p align="center">
  <img src="./.screens/logo.svg" alt="eSports" title="eSports"/>
</p>


# 💻 Project
<p>
ESports é um App para você convidar um amigo(a) para aquela jogatina, é só conectar no app e convidar o amigo(a)
</p>

##  ✨ Technologies used
  - [Node](https://nodejs.org)
  - [Typescript](https://www.typescriptlang.org)
  - [Express](https://expressjs.com)
  - [Prisma](https://www.prisma.io/)

# 🚀 How to run
## Install dependencies
  yarn install

## create the tables in the database
  npx prisma migrate

## Run the app
  yarn dev

### Request

<p>Create Ad</p>

```bash
POST /games/:game_id/ads
```
<span>Datas</span>

```bash
{
	"name": "Clark Kent",
	"yearsPlaying": 2,
	"discord": "gui.js#9614",
	"weekDays": [0, 5, 6],
	"hourStart": "12:00",
	"hourEnd": "15:00",
	"useVoiceChannel": true
}

``` 

<p>Get Discord By Ad</p>

```bash
GET /ads/:ad_id/discord
```

<p>List Games</p>

```bash
GET /games
```

<p>List Ads by Game</>

```bash
GET /games/:game_id/ads
```

## 📄 Licença

This project is under the MIT license. See the file [LICENSE](LICENSE.md) for more details
