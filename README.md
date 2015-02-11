# warrior

our website

*repo named after HMS Warrior <3*

## adding events

each event is in `_posts`, you can [make a new file directly from github](https://github.com/uopcs/warrior/new/gh-pages/_posts)

they're all written in [markdown](http://daringfireball.net/projects/markdown/syntax), HTML is rendered through md too

here's an template of how a post should look:
```
---
hash: unique-name-here # this is the unique hash for linking
title:  "This is the title of the event"
date:   2015-01-01 19:30:00 # should have both date and time YYYY-MM-DD HH:MM:SS  
place: [Building name, room in building, etc] # an array of place information
facebook: "https://www.facebook.com/events/123456789/" # this is the link to the facebook event
---

Main post information here, you can use Markdown which includes HTML as that renders through as well.
```

then save it as `[date]-[hash].md` for example for the above `2015-01-01-unique-name-here.md`

## changing details
some details such as the description and social network links are in the `_config.yml` file

## development

use jekyll to build locally, but you can just make a new .md file in posts and send a pull request as it will generate automatically using GitHub pages

## credit

we're using:

+ [Jekyll](http://jekyllrb.com/) - to generate the website on Github Pages
+ [jQuery](http://jquery.com/) - obvious uses
+ [Leaflet](http://leafletjs.com/) - for our mapping!
    + [OpenSourceMaps](http://www.openstreetmap.org/) for the German-style map tiles
    + brunob's [Fullscreen code](https://github.com/brunob/leaflet.fullscreen)
+ [Raphaël](http://raphaeljs.com/) - For the animated SVG background images
