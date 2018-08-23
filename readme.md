# ytdl-express-server

A simple youtube-dl express application, it has only one route that allows to download youtube videos with ease, simply call: `info/VjO55pKuBo4`, you can also pass flags directly to ytdl by calling: `info/VjO55pKuBo4?flags[]=--no-geo-bypass`.

##### * this will not work on windows machines properly.

deploy to heroku:
```
heroku create
```
```
git push heroku master
```
```
heroku open
```

debug:
run: ```npm run debug```, get a websocket url and open:
```
chrome-devtools://devtools/bundled/js_app.html?experiments=true&v8only=true&<WEBSOCKET_URL>
```