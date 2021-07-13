# Yelp-Talk

basic express app

        npm i express mongoose ejs
        require express
        set it to app variable
        require path
        set view engine to be ejs
        set views path to be absolute

model basics

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

comment index

        mkdir comments
        in comments make index.ejs file

Comment Show

        finally got show working, forgot to add / before comment in the route in the app.js file

comment new and create

    `seems to be working

comment edit and update

        2 routes one for the form one for submitting the form

        npm i method-override
        require in app.js

delete comment

        seems to be working with the help of method-override

        *************************

setting up user Schema

        in models touch user.js
        require mongoose
        require User for association

User validation

        npm i validator@10.9.0
            require it in models files

setting up user route (endpoints)

        test with postman, placing the json User object in the req body
        we should get a 202 and send testing ( it was sent but not saved yet so nothing will be in db yet)

        automatically parse incoming jason in the app.js file:
                 app.use(express.json())

organizing routes directory

        mkdir routers
                in it touch comments.js
                cut comment routes from index to comments.js file
                require express, comment schema and,  express router.
                change all instances of app to router
                export router at the bottom of the page
                app.use comment
                require it in the app.js file

        repeat for user
                require userSchema in route file so it can be used in the routes

move mongoose connect

                make db dir and touch mongoose.js in it
                require mongoose in that file

                in app.js require mongoose.js app without setting it to a variable:
                        require("./db/mongoose")

moving forward i think i need to split comments models into 2 models topic and phrase so that I can set up sanitization to ensure only one topic of a kind can be created.
then I will need to associate a phrase with a topic as it is created.

CRD for topics is setup and working ------- still need Update

CRD for users is working now ------------- still need Update

need to setup postman routs for phrase routes to see if they are working properly

        mkdir phrases in views
        in phrases dir touch edit index new and show ejs pages for phrases like they are setup for topics

having trouble creating a phrase, it works with postman but its not working on the page.

                on postman :

        create phrase works --------------------------- POST /phrases redirects to show page
        read phrases works ---------------------------- GET /phrases
        read phrase works ----------------------------- GET /phrases/:id
        delete phrase works --------------------------- DELETE /phrases/:id

                on local host :

        create phrase dosent work --- /phrases/new directs to show , cannot POST /phrases/show ?? check the route and remove new maybe,
        read phrases works,---------- /phrases
        read phrase works,----------- /phrases/:id
        delete phrases works -------- /phrases

        FOUND THE ISSUE: on my phrases/show.ejs page the form action was set to phrases/show instead of phrases/new
        PS .... should have known that my ejs files was the place to look

full crud for user is setup

setting up update for Phrases and topics
