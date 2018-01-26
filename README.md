# Project finder Hybrid app

Project finder is an Ionic Hybrid app for Android and iOS. It is meant to be a platform for people to search members for their project or search for projects they want to be a member of. 

This app was written for a semester project for the FH Hagenberg, but it isn't fully finished/polished and not ready for a release.

Table of Contents
=================

  * [Authentication](#authentication)
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
