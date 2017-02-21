# platform-ui
A UI for the viewing part of the comp410 project.

See the <a href=kc34.github.io/platform-ui>demo</a>.

# Demo
Click the "ListData?uri=/ (Github Pages)" button in the Step 0 section.
This sends the GET request ListData?uri=/, which returns a JSON to populate the dropdown menu with.

(If you run this as a server with python -m SimpleHTTPServer,
you can use the first button, which uses /ListData?uri=/. We'll probably use that in the final thing.)

Next, in Step 1, select the URI that you want to send as a query string with /GetData.
Don't get too excited, they all go to the same place right now.

Next, in Step 2, hit "GO (Github Pages)" unless you're doing the python thing. Then you can hit the normal button.
This step sends a GET request, then sends the data to the display canvas.

In Step 3, the final GET request will be displayed, with the data below.

# Plans for integration.
The HTML elements should be able to be copy-pasted into whatever.
The JQuery code for the HTML elements are in httpsender.js, which can probably also be copy-pasted over.

Currently, displaycanvas.js is just a stub thing.
We call its init() function to start it up,
and then we call its receiveData() function to send data into it.
These functions are just placeholders, and I'm open to changing the code to support different canvas procedures.

# Suggestions?
Please let me know. I have no idea what I'm doing.
