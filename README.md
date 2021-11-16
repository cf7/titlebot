# Titlebot

#### Process

1) Attempted to used `create-react-app` to initialize the application
    - It worked for the most part until it came time to connect the frontend and backend.
    - The sealed up babel and webpack configs turned out to be a headache, so I ejected the app and recycled the files.
2) Used a good old-fashioned manual webpack configuration to develop and build the app
3) Set up the Express server
4) Made sure everything important was tested and linted

#### Ran out of time
    - Setup Redis Caching for historical lists

#### "Going too fast" and/or "Trivial fix" overlooks
    - There might be some unused dependencies or npm packages in wrong list (devDependencies vs dependencies)
    - I didn't not worry too much about vulnerabilities in npm packages
    - There might be some imports that never used

#### Stack
```
React
Bootstrap styling
Express
Jest/Enzyme Unit Tests
```

### Setup 
#### (written for broader audience)
Ideal environment for installing and running the application.
```
Mac OS
Terminal
Bash UNIX Shell
```
Download and install [Node](https://nodejs.org/en/) onto your computer.

Clone the repo into a directory of your choosing ("download the project files") ("$" means use "bash" in Terminal on your Mac).

`$ git clone https://github.com/cf7/titlebot.git`

Navigate into the project directory.

```
$ cd titlebot
```

Run the following commands from topmost level of the directory

```
$ npm install
$ npm run build
$ npm start
```


#### Notes
      - Downgraded to React 16.0.0 for Enzyme compatibility

