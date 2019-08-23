# Greenify


A React app that allows will Greenify your life! Rent your pot plants out to a loving community, or search for a new pot plant to join your home for a while.

[Click here to visit the site.](https://lucyod10.github.io/greenify-client/#/)

The website model is based on a renting system, where a user can opt to be either a rentee, or a renter.

A rentee can...
- Post their plants that they would like to rent out, including uploading an image, and setting the dates that the plant is available for.
- Browse other peoples plants, and rent out their plants if they wish!

A renter can...
- Browse the plant page, searching for specific breeds or simply searching all the plants up for rent!
- Make a booking for a plant when they find one they like. This booking can only be made within the dates that the rentee has chosen.

## Features

- Login, Logout and Sign up using JWT tokens between Rails and React.
- Two Quizzes:
  - 'What plant are you?'
    - Answer a series of questions which at the end will tally up and tell you what plant you are!
    - You can click through to a real plant that has been rented out, giving you the opportunity to book or comment on it!
  - 'How green is your thumb?'
    - Answer a series of questions about the care of plants, at the end getting a percentage of the answers you got correct.
- Plant search page
  - See all the plants that are currently up for rent
  - an interactive search feature which live loads the results as you type.
- Plant Show page
  - When you click on any plant up for rent, see all its details.
  - depending on whether you are logged in or not you have the options to make a booking, and/or leave a comment & rating on the plant.
- User Profile
  - See a user's bookings and plants up for rent on their profile page.
- Creat a plant
  - If you are logged in, and also have selected to be a rentee, you can create a plant to be put up for rent,

## Getting Started

To get started, click on the link above to visit the site. A new user will need to sign up by entering their email, a username and password. If you wish to be a rentee then you can check a box here.

From here you navigate through the site, clicking on the Plants menu item to see all plants, and search specific species. You can look at your user profile which will showcase the plants you have rented out, and/or booked.

You can then sign out, sign in and operate the website however you wish! Leave some nice comments on the plants that you particularly like!

If you are feeling inquisitive, we have a quiz section with two options in it. You can choose which quiz takes your fancy and go through the questions to reveal what type of plant you are, or how green your thumb is!

### Use the site locally

If you want to use the site locally, to have a look at how it works or to make any changes you'd like, simply clone down the repo (or fork, then clone):
```
git clone git@github.com:lucyod10/dinoland.git
```

You will need to install all the dependencies:
```
npm install
```

Then to serve on your local server:
```
npm run start
```

You can also host it on your github pages like I have. I have installed the gh pages dependency so by completing the install above, you should simply be able to set up your github settings (navigate to the forked project, then click on the settings tab. Here there is a github pages section where you need to change the branch to 'gh pages'). A useful tutorial on this can be found [here](https://reactgo.com/deploy-react-app-github-pages/).

Then to deploy your changes (must git commit first), run:
```
npm run deploy
```


## Technologies

- React
- Moment.js - to help with formatting the dates for availabilities, and bookings.
- react-router-dom - to create the routes for the SPA
- axios - for AJAX requests to the [API](https://lucyod10.github.io/greenify-client/#/)
- cloudinary-react - to upload and host the images of the plants.
- react-datepicker - to help with interactive calendar date picking functionalities.
  - The user can pick a from and to date to book a plant
  - The user can pick a from and to date when creating a plant, to set the availability
  - As well as blocking the booking dates of any given plant that have already been booked by another user.
- Rails for [backend](https://lucyod10.github.io/greenify-client/#/)
- JWT and Knock - user authentication

## Database Structure

The site is using the API backend ([which can be found here](https://lucyod10.github.io/greenify-client/#/). The api was developed in Ruby on Rails. There are 5 models, the relationship between them can be seen in this diagram:

![Image](/src/images/dirt.png)

[Click here to visit the site.](https://lucyod10.github.io/greenify-client/#/)
