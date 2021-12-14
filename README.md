# Titlebot
A simple web scraping app with a single feature. Given a homepage url, it will retrieve the home page's title from the `<title>` tag.

Site: [https://titlebot.herokuapp.com/](https://titlebot.herokuapp.com/)

---

### Setup 
#### (written for broader audiences)
Ideal environment for installing and running the application.
```
MacOS
Terminal
Bash UNIX Shell
```
Download and install [Node](https://nodejs.org/en/) onto your computer.

Clone the repo into a directory of your choosing ("download the project files") ("$" means use "bash" in Terminal on your Mac).

```
$ git clone https://github.com/cf7/titlebot.git
```

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

Testing the app
```
$ npm test
```
(Warning: some unit tests fully mount each component, making Jest take a long time to run)

---

#### Dev Process

1) Attempted to used `create-react-app` to initialize the application
    - It worked for the most part until it came time to connect the frontend and backend.
    - The sealed up babel and webpack configs turned out to be a headache, so I ejected the app and recycled the files.
2) Used a good old-fashioned manual webpack configuration to develop and build the app
3) Set up the Express server
4) Made sure everything important was tested and linted

#### Ran out of time
    - Setting up Redis Caching for user's url search history

#### "Going too fast" and/or "Trivial fix" overlooks
    - There might be some unused dependencies or npm packages in the wrong list (devDependencies vs dependencies)
    - I didn't not worry too much about vulnerabilities in npm packages
    - There might be some imports that never used

#### Stack
```
React
Bootstrap styling
Express
Jest/Enzyme Unit Tests
Webpack
```

#### Notes
      - Downgraded to React 16.0.0 for Enzyme compatibility
      - are the url inputs only home pages?
      - handle user inputs: edge cases, preformat before forwarding to server
      - handle returns: server-side processing of returned html and titles
      - allow CORS on own server?
      - check sites for CORS?
      - check for null values
      - check for no title tag
      - check for browser support (assume "modern browser such as chrome or firefox")
      - etc.
