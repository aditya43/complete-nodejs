## About This Project
Complete NodeJS guide.

## Current Status
WIP (Work In Progress)!

## License
Open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

-----------------------

## Important Notes
- [Debugging Using Node Debugger](#debugging-using-node-debugger)

### Debugging Using Node Debugger
- Add `debugger` keyword wherever you want to stop your program execution and begin debugging. For e.g.:
    ```
    //app.js

    console.log('Hello World');
    debugger; // This is where program execution will stop and you can start debugging.
    console.log('Hello World 1');
    ```
- Run `app.js` above with `inspect` command as below:
    ```
    // In terminal

    node inspect app.js
    ```
- Open `Google Chrome Browser` and enter following URL:
    ```
    chrome://inspect/#devices
    ```
- You should see your current Node app under `Remote Target`. Click on `inspect` link.
- On left hand side, click on `Add folder to workspace` and add your project directory.