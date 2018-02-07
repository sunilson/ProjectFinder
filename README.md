# Project finder Hybrid app

Project finder is an Ionic Hybrid app for Android and iOS. It is meant to be a platform for people to search members for their project or search for projects they want to be a member of. 

This app was written for a semester project for the FH Hagenberg, but it isn't fully finished/polished and not ready for a release.

Table of Contents
=================
  * [Server and Database](#server-and-database)
  * [Authentication](#authentication)
     * [Social Login](#social-login)
     * [Server Side](#server-side)
  * [User Feed](#user-feed)
  * [Projects](#projects)
     * [Adding Projects](#adding-projects)
     * [Apply for Project](#apply-for-project)
     * [Closing and deleting](#closing-and-deleting)
  * [Offline functionality](#offline-functionality)
  * [Search](#search)
  * [Notifications and Emails](#notifications-and-emails)
  
## Server and Database

The server is created with NodeJS and the Express Framework which is used for the REST API. The database is a MongoDB.

## Authentication

Project finder doesn't rely on services like Firebase, so almost everything is done by the backend server. Authentication is handled via JWT Tokens.

<img src="https://media.giphy.com/media/3o7WIDOHvEjYlqyQMw/giphy.gif">

When a user logs in he recieves an Access and a Refresh Token. The Access Token is valid for 30 minutes and can be refreshed with the Refresh Token. To validate the JWT Tokens and add the User to the request, Passport is used: <a href="passportjs.org">passportjs.org</a>. The app will silently try to refresh the access token if the server responds with a 401 Error. If that's not possible the user is logged out.

<img src="https://dzone.com/storage/temp/4804973-flow-jwt-large.jpg" />


### Social Login

Users can also register/login with a Google account. On their first login a new user is created. This is done by using the ID Token that is generated when a user authenticates locally with a Google account. This token is then validated on the server and the needed data for the registration is extracted from the Google user object.

### Server-Side

On the server the JWT Tokens are handled with <a href="http://www.passportjs.org/">PassportJS</a> and the NPM module <a href="https://www.npmjs.com/package/jsonwebtoken">jsonwebtoken</a>

## User Feed

The starting page of the app is the feed. Here the user can see his own projects, joined projects, applications to projects and interesting projects.

<img src="https://i.imgur.com/9xlcsGE.png" width="200">

## Projects

Projects are the core of the application. Every user can create projects and apply/join projects of other members. Projects have the following fields:

<ul>
 <li>Title</li>
 <li>Description</li>
 <li>Max. member amount</li>
 <li>Global/Specific location</li>
 <li>Payment</li>
 <li>Skills useful for project</li>
</ul>

### Adding projects

<img src="https://media.giphy.com/media/l4pTf33KBCIFJ5ey4/giphy.gif" />

### Apply for project

Every user can apply for a project. The author has then to accept or decline the application. A user can only apply once to a project.

<img src="https://media.giphy.com/media/3o7WIrVXOANXiLXqes/giphy.gif" />

### Accept or decline application

The author can then view the application and either accept or decline it.

<img src="https://media.giphy.com/media/3o7WIP5RUMbXlMvKeY/giphy.gif" />

### Closing and deleting

When a project is closed no new applications can be made. Also the chat will be disabled and all existing applications are deleted.

When a project is deleted all relations are removed also.

<img src="https://media.giphy.com/media/3ohs4BSdSYIaxXzbIQ/giphy.gif" />

### Project chat

Every project offers a socket.io chat for its members. The socket.io connection is also secured via the Token authentification. 

<img src="https://media.giphy.com/media/xThtakyTnmX5BEMXVC/giphy.gif" />

## Offline functionality

The already downloaded data should be available when the user is offline. This is done with a local SqLite database. All data that is returned with a request is stored in that database. For that, the MongoDB structure had to be mapped to an SQL structure (Join tables instead of Refs, etc.) When a user makes a request, the data is loaded via RxJS from the local and the online repository. 

## Search

The search feature is accomplished with the <a href="https://algolia.com">Algolia</a> online service. There the most important fields like title, description, coordinates, etc. are indexed and can be searched through queries, filters, etc. The resultset is then populated with data from the MongoDB.

<img src="https://media.giphy.com/media/xUOwG0o301tYgz8L3q/giphy.gif" />

## Notifications and Emails

Notifications about events like new applications or an application status change are sent out from the Node server via FCM. Every device stores its device token upon login in the MongoDB with the user ID, so the server can send notifications to that device.

<img src="https://media.giphy.com/media/xUOwG5Yw9nhVwT1qik/giphy.gif" />

Emails are sent out using the <a href="https://www.mailgun.com/">Mailgun</a> online service from the Node server. They are sent out for the user activation and the password reset. Those forms are rendered on the server with the <a href="http://olado.github.io/doT/index.html">doT.js</a> template engine.
