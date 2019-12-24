## About This Project
Complete NodeJS guide.

## Current Status
WIP (Work In Progress)!

## License
Open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

-----------------------

## Important Notes
- [Debugging Using Node Debugger](#debugging-using-node-debugger)
- [Call Stack](#call-stack)
- [Event Loop](#event-loop)

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
- On left hand side, click on `Add folder to workspace`.

### Call Stack
- `Call Stack` is a simple data structure provided by the `V8 JavaScript Engine`.
- It's job is to track the execution of our program and it does that by keeping track of all of the functions that are currently running.
- The `Call Stack` data structure uses `FILO (First In Last Out)` to track the execution of our program.

### Event Loop
- `Event Loop` looks at 2 things:
    * It looks at the `Call Stack`.
    * And it looks at the `Callback Queue`.
- If the `Call Stack` is empty, it's going the run the items from `Callback Queue`.
- The `Event Loop` actually have to wait until `Call Stack` is empty before it could run items from `Callback Queue`.
- None of our `Asynchronous Functions` are going to run unless `main() Function` is done executing.
- Node uses other threads (`C++`) behind the scene for `Node APIs`.

### Test