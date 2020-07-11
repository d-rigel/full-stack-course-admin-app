const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));

//Can pass a limited number of options to this to override some defaults
const middlewares = jsonServer.defaults();

server.use(middlewares);

//To handle POST,PUT and PATCH you need to use a body-parser
server.use(jsonServer.bodyParser);

//Simulate delay on all requests
server.use(function (req, res, next) {
  setTimeout(next, 2000);
});

//Declaring custom routes below. Add custom route before JSON server router

//Add createdAt to all POSTS
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  //continue to JSON server router
  next();
});

server.post("/courses/", function (req, res, next) {
  const error = validateCourse(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.slug = createSlug(req.body.title); //Generate a slug for new courses
    next();
  }
});

//Use default router
server.use(router);

//Start server
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

//Centralized logic

//Returns a URL friendly slug

function createSlug(value) {
  return value
    .replace(/[^a-z0-9_]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function validateCourse(course) {
  if (!course.title) return "Title is required.";
  if (!course.authorId) return "Author is required.";
  if (!course.category) return "Category is required.";
  return "";
}
