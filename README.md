# Project finder Hybrid app

Project finder is an Ionic Hybrid app for Android and iOS. It is meant to be a platform for people to search members for their project or search for projects they want to be a member of. 

This app was written for a semester project for the FH Hagenberg, but it isn't fully finished/polished and not ready for a release.

Table of Contents
=================

  * [Authentication](#authentication)
     * [Social Login](#social-login)
  * [Livetickers](#livetickers)
  * [Installation](#installation)
     * [Sharing Livetickers](#sharing-livetickers)
     * [Creating a Liveticker](#creating-a-liveticker)
     * [Liveticker events](#liveticker-events)
        * [Text](#text)
        * [Image](#images)
  * [Channels](#channels)
  * [Cloud functions](#cloud-functions)
     * [Notifications](#notifications)
     * [Search](#search)
     * [Queue System](#queue-system)
        * [Database Security](#database-security)

## Authentication

Project finder doesn't rely on services like Firebase, so almost everything is done by the backend server. Authentication is handled via JWT Tokens.

When a user logs in he recieves an Access and a Refresh Token. The Access Token is valid for 30 minutes and can be refreshed with the Refresh Token. To validate the JWT Tokens and add the User to the request, Passport is used: <a href="passportjs.org">passportjs.org</a>

<img src="https://dzone.com/storage/temp/4804973-flow-jwt-large.jpg" />

### Social Login

Users can also register/login with a Google account. On their first login a new user is created. This is done by using the ID Token that is generated when a user authenticates locally with a Google account. This token is then validated on the server and the needed data for the registration is extracted from the Google user object.

