const fs = require("fs");
const path = require("path");
const request = require("request");

/***************   HOME ROUTE (HTML) '/'****************************************/
const handleHomeRoute = (request, response) => {
  const url = request.url;

  const filePath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(`Error: ${error}`);
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1>Sorry, we'v had a problem on our end</h1>");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(file);
    }
  });
};

/***************  PUBLIC ROUTE (DOM, REQUEST, CSS) ****************************************/

const handlePublic = (request, response, url) => {
  const extension = url.split(".")[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    jpg: "image/jpeg",
    png: "image/jpeg",
    ico: "image/x-icon"
  };

  const filePath = path.join(__dirname, "..", url);

  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end("<h1>File not found</h1>");
    } else {
      response.writeHead(200, { "Content-Type": extensionType[extension] });
      response.end(file);
    }
  });
};

/*************** CO TECH API CALL ****************************************/

const handleCoTechRequest = (req, res) => {
  request(
    "https://www.coops.tech/wp-json/wp/v2/service",
    { json: true },
    (err, response, body) => {
      if (err) {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end("<h1>Sorry, server error.</h1>");
      } else {

        let serviceArr = [];
        const services = body.forEach(service => {

          // push object to array
          serviceArr.push({
            title: service.title.rendered,
            img: service.acf.featured_image.sizes.thumbnail,
            url: service.link
          })

        });
        
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(serviceArr));
      }
    }
  );
};



/*************** WIKI API CALL ****************************************/
// const handleCoTechRequest = (req, res) => {
//   request(
//     "https://www.coops.tech/wp-json/wp/v2/service",
//     { json: true },
//     (err, response, body) => {
//       if (err) {
//         response.writeHead(404, { "Content-Type": "application/json" });
//         response.end("<h1>Sorry, server error.</h1>");
//       } else {
//         let serviceArr = [];
//         const services = body.forEach(service => {
//           serviceArr.push(service.title.rendered);
//           serviceArr.push(service.link);
//         });
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify(serviceArr));
//       }
//     }
//   );
// };

module.exports = {
  handleHomeRoute,
  handlePublic,
  handleCoTechRequest
};
