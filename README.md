# Marathon Planner

A planning application with user authentication that allows users to plan their upcoming marathon. Users can create a manual training plan or generate a training plan through the app. It is possible to view upcoming marathons in Europe. Built with React, Flask and Firebase. Optimized for both desktop and mobile use. Deployed with Heroku.

## Live version
This application is live on https://marathonplanner-frontend.herokuapp.com/

## Project description

### Authentication
Authentication is handled through Firebase. It is possible to sign up, log in, log out and reset a password.

### Training planner screen
Users can view a calendar with all their planned trainings. It is possible to add a training to the calendar. Users can specify a title for the training and the distance and pace they plan to run. Furthermore, it is possible to remove trainings on a selected day. 

<img src="https://github.com/JochemVanDerMeer/MarathonPlanner/blob/main/public/screenshot1.png width="400">

### Generate trainings screen
Users can generate their own training plan for an upcoming marathon. They have to fill in a form and after submitting this these trainings will be visible at the training planner screen. The availability of the user and their easy and sprint pace is taken into account for generating the training plan. If a user wants to bulk remove trainings, this is possible by clicking on the designated button which deletes all scheduled trainings from their account.

<img src="https://github.com/JochemVanDerMeer/MarathonPlanner/blob/main/public/screenshot2.png" width="400">

### Upcoming marathons screen
Users can view dates of upcoming marathons in Europe in a table. The data is fetched from an API that I created with Python. The repository of this API can be found at: https://github.com/JochemVanDerMeer/MarathonAPI/tree/main

### Edit profile
Users can change their e-mail address and reset their password.

## Reflection

This project helped me to get more experience with React. I had used React in earlier projects, but I wanted to create a whole platform to experience handling all sides of an application, both backend and frontend. I tried to make the application as user-friendly as possible, by creating a clear design and make the interaction as simple as possible.
