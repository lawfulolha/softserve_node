const db = require("../models");
const Job = db.job;
const Op = db.Sequelize.Op;
const User = db.user;
const Role = db.role;

exports.create = (req, res) => {
    let user = req.body.userId;
    let errors = [];
   if (!req.body.title) {
               errors.push("Title can not be empty!");
    }
    if (!req.body.technologies) {
       errors.push("Please add at least one technology");
    }
    if (!req.body.description) {
       errors.push("Description can not be empty!");
    }
   const job = {
        title: req.body.title,
        technologies: req.body.technologies,
        description: req.body.description,
        salary: req.body.salary ? req.body.salary : undefined,
        userId: user
    };

    Job.create(job)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Job."
            });
        });
};



exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Job.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving jobs."
            });
        });
};

exports.findByUser = (req, res) => {
    const user = req.query.userId;
    let condition = user ? { userId: { [Op.iLike]: `%${user}%` } } : null;

    Job.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving job ads."
            });
        });
};

exports.findByTags = (req, res) => {
    const term = req.params.technologies;
    Job.findAll({  where:{   technologies:{    [Op.like]:'%'+term+'%' }}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving job ads."
            });
        });
};
exports.findById = (req, res) => {
    const id = req.params.id;

    Job.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Job with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Job.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Job was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Job with id=${id}. Maybe Job Ad was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Job with id=" + id
            });
        });
};



exports.delete = (req, res) => {
    const id = req.params.id;

    Job.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Job Ad was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Job Ad with id=${id}. Maybe Job Ad was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Job Ad with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Job.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Jobs were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all job ads."
            });
        });
};

exports.deleteAllFromUser = (req, res) => {
    const user_Id = req.body.user.id;
    Job.destroy({
        where: {userId: user_Id},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Jobs were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all job ads."
            });
        });
};
