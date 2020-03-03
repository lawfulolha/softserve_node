module.exports = function(app) {
    const jobs = require("../controllers/job.controller.js");


    let router = require("express").Router();

    app.post("/jobs/", jobs.create);

    app.get("/jobs/", jobs.findAll);

    app.get("/jobs/user/:id", jobs.findByUser);

    app.get("/jobs/tags/:technologies", jobs.findByTags);

    app.get("/jobs/:id", jobs.findById);

    app.put("/jobs/:id", jobs.update);

    app.delete("/jobs/:id", jobs.delete);

    app.delete("/jobs/", jobs.deleteAll);

    app.delete("/jobs/user/:id", jobs.deleteAllFromUser);

    app.use('/jobs', router);
};
