const User = require("../models/user.model");
module.exports = (sequelize, Sequelize) => {
    const Job = sequelize.define("job", {
        title: {
            type: Sequelize.STRING
        },
        technologies: {
            type: Sequelize.STRING
        },
        salary: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER,

        }
    });

    return Job;
};
