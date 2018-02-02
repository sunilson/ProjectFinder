# Project finder Hybrid app

Project finder is an Ionic Hybrid app for Android and iOS. It is meant to be a platform for people to search members for their project or search for projects they want to be a member of. 

This app was written for a semester project for the FH Hagenberg, but it isn't fully finished/polished and not ready for a release.

Table of Contents
=================

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

## Authentication

Project finder doesn't rely on services like Firebase, so almost everything is done by the backend server. Authentication is handled via JWT Tokens.

<img src="https://i.imgur.com/nfTPcjU.gifv" />

When a user logs in he recieves an Access and a Refresh Token. The Access Token is valid for 30 minutes and can be refreshed with the Refresh Token. To validate the JWT Tokens and add the User to the request, Passport is used: <a href="passportjs.org">passportjs.org</a>

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


### Apply for project

Every user can apply for a project. The author has then to accept or decline the application. A user can only apply once to a project.

### Closing and deleting

When a project is closed no new applications can be made. Also the chat will be disabled and all existing applications are deleted.

When a project is deleted all relations are removed also.

## Offline functionality

## Search

## Notifications and Emails
