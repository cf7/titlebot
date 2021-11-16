# titlebot






#### "Going too fast" and "Trivial fix" overlooks
- might have some npm packages that belong in devDependencies and vice versa
- did not worry about vulnerabilities in npm packages
- might have some imports that are never used
- proxying frontend to backend comes with known risks [create-react-app](https://create-react-app.dev/docs/proxying-api-requests-in-development/)

#### Process

1)
Used `create-react-app` to initialize the application
2)
Setup Express server
3)
Setup Tests and Linter
4)
Setup Redis Caching

Stack
```
-React
-Bootstrap styling
-Express
-Jest/Enzyme (time-permitting)
-Redis (time-permitting)
```

## Setup (written as if to semi-experienced audience with explanations I wish I had when I was first learning to program)
Ideal environment for installing and running the application.
```
Mac OS
Terminal
Bash
```
Download and install [Node](https://nodejs.org/en/) onto your machine.

Clone the repo into a directory of your choosing ("download the project files") ("$" means use "bash" in Terminal on your Mac).

`$ git clone https://github.com/cf7/titlebot.git`

Navigate into the project directory.

`$ cd titlebot`

Run the following commands.

```
$ npm install
$ npm run build
$ npm run start

```

#### Notes
- Downgraded to React 16.0.0 for Enzyme compatibility

```
// are url inputs only home pages?

// handle user inputs: edge cases, preformat to spec before forwarding to server


// allow CORS on own server

// check for CORS (server-side might not need CORS support)
// check for null values
// check for no title tag
// check for browser support (assume "modern browser such as chrome or firefox")

```
