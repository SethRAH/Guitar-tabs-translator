# WELCOME
Guitar tabs translator is supposed to be a quick tool to translate guitar tablature to score music (only one note at a time) and back. It currently only translates from 
Guitar Tablature to Scientific Pitch Notation (ex: "C#4"). In the next release I'm planning on allowing you to switch the input from guitar tablature to scientific pitch
notation and the output from scientific pitch notation to guitar tablature. After I get those down pretty good, then I plan on tackling how to render/create a form for 
scored music.

### Frameworks/Libraries
This app uses TypeScript, which is a higher level javascript language that compiles into JavaScript ES5. The `*.ts` files you see here are type script files. When you run the
TypeScript server, it will look for changes in the `*.ts` files and generate a `*.js` and `*.js.map` for each one.

This app also uses Angular 2 and is my first attempt at using Angular 2 so please let me know if I'm not following certain conventions or if I did anything really backwards.

### Downloading and using for the first time
If you download or branch from this repo, there are a couple of steps you have to take prior to running the app. The below directions were mostly taken from the Angular
quickstart tutorial with some slight modifications. They were included here for convenience but you can find them at https://angular.io/docs/ts/latest/quickstart.html .
First: Make sure you are running node version `4.4.x+` and npm version `3.x.x`. You can check your version of node/npm by bringing up a terminal/console window and running
the commands: `node -v` and `npm -v`

Once you are sure you have a good version of both node and npm, navigate to the app root folder in your terminal/console (the folder that houses this README.md) and run the
following command: `npm install` this will go through and install any node modules outlined in the package.json into a "node_modules" folder and also create a "typings" folder.
If the "typings" folder doesn't show up you'll need to manually install it with the following command: `npm run typings install`

You should only have to run the above the first time you want to run the app unless you make modifications to package.json. The next step is to run the lite server that does the
TypeScript compilation so you'll want this running whenever you want to run the app. In the app root folder, run the following command: `npm start`. Now if you make a change to a
`*.ts` file and save it, you should see the changes replicate to the associated `*.js` and `*.js.map` files. Also, since we have browserfy, if you have the app running while you 
make changes, any change to the app files should cause the app to refresh with the newest source.
