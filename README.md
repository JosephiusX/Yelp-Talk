# Yelp-Talk
1 basic express app

        npm i express mongoose ejs
        require express
        set it to app variable
        require path
        set view engine to be ejs
        set views path to be absolute

2 model basics

        mkdir models
        in models: touch comments.js
        in comments.js file require mongoose:
            const mongoose = require('mongoose);

        require and connect to mongodb:
            with mongodb connection code

        in app.js set up a route and require mongoose as well

            test it out by visiting localhost:3000/makecomment
                then in mongo shell to see if comment saved:
            >use talk-app
            db.comments.find()

3 comment index

        mkdir comments
        in comments make index.ejs file

4 Comment Show

        finally got show working, forgot to add / before comment in the route in the app.js file

5 comment new and create
    
    seems to be working

6 comment edit and update

    2 routes one for the form one for submitting the form

    npm i method-override
        require in app.js

7 delete comment

    seems to be working with the help of method-override
