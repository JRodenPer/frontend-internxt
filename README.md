## Internxt FrontEnd technical test

### Usage/installation instructions

We use yarn as package manager, here are the commands you need to work with the project

- Install dependencies `yarn`
- Run the dev server `yarn run start`
- Run the tests `yarn run test` (you can find tests already in the project, we use jest for them)

### What to build

We will need you to build a photos gallery, the gallery needs to be responsive according to this design:

https://www.figma.com/file/1GAU39TgxeVf9My7So8aMX/FrontEnd-Technical-Test-Design?node-id=0%3A1

We don't need a "similar" design, we want to see how you develop the design we are giving you. You have all the info needed such pixels, spacings etc inside the Figma file.

You need to add tests to cover all the logical code you add to the application.

You can add extra details if you want as fine as you keep the timing in mind.

### Whats in the code already

- Getting the photos for the gallery
  You can obtain a list of photos with their image urls from `./src/__dont_modify__/api/photos.ts` (dont modify means you can't modify the files inside that directory).

- Testing your code
  There's already a test setup ready to test your code, we use Jest for that

Some notes:

The getPhotos function sometimes throws an error intentionally, you will need to handle it, you cannot delete the error throwing function (it simulates unexpected errors such server not available for example)

### What we want to see

- We want to see how you structure the code you write and how you prepare it taking into account maintanability, legibility and testing

- We want to see how you adapt your programming style to already existing code

### What you can do

- You can add as much code as you want

### What you can't do

- You can't modify what's inside the **dont_modify** directory.
- You can't add external libraries, if you add one, the test won't be valid. We believe that the test requisites are simple enough to be resolved without libraries.
