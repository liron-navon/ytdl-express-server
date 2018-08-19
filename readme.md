# ytdl-express-server

A simple youtube-dl express application, it has only one route that allows to download youtube videos with ease, simply call: `info/VjO55pKuBo4`, you can also pass flags directly to ytdl by calling: `info/VjO55pKuBo4?flags[]=--no-geo-bypass`, as a response you will get a large json object containing all available data on the video including different formats and their download url's.

##### * this will not work on windows machines.
