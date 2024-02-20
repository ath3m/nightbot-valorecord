# NightBot Valorant !record command
External script to accompany Valorant !record command for NightBot on Twitch channels.

Commands in NightBot are restricted to Twitch chat's 500-character limit. So, this command is implemented in an external script and a remote url is called to retrieve this JS snippet.

`!record` command is used to display Win-Loss-Draw stats for Valorant games played for the duration of a stream. Valorant match data of the player is retrieved from api.henrikdev.xyz

## Setup
```!addcom !record $(touser), $(eval $(urlfetch json https://raw.githubusercontent.com/ath3m/nightbot-valorecord/main/script.js)('$(twitch $(channel) "{{uptimeLength}}")','$(twitch $(channel) "{{uptimeAt}}")',$(urlfetch json https://api.henrikdev.xyz/valorant/v1/lifetime/mmr-history/{region}/{name}/{tag}?size=20), $(urlfetch json https://api.henrikdev.xyz/valorant/v1/lifetime/matches/{region}/{name}/{tag}?mode=competitive&size=20))).```
 
 Expected response:
 ```
 Today's Win/Loss/Draw record is 3 - 1 - 0. (+47RR) 
 ```


`region` should be replaced with the player's region (eu, na, latam, br, ap, kr).

`name` should be replaced with the player's Riot username.

`tag` should be replaced with the player's Riot tag.

`size` The used APIs fetch match data upto ~2 months, so it is suggested to limit the size to 30. (It is also unlikely !record  of >30 games would be needed per stream).

`mode` can be replaced based on preference (competitive, custom, deathmatch, escalation, teamdeathmatch, replication, snowballfight, spikerush, swiftplay, unrated). Remove the query from url for all modes.

## Contributing
The main intention was to use NightBot's custom command features and so this may not be the best implementation for this task.
However, if you would like to improve this solution, feel free to contribute by submitting a pull request!

## Credits
Check out HenrikDev API here: https://github.com/Henrik-3/unofficial-valorant-api

Originally forked from https://github.com/nosrettep/ValorantRecordCommand