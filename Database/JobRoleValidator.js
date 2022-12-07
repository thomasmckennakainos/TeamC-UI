var validate = require("validate.js");

var constraints = {
    band: {
        presence: true,
        type: "string"
    },
    family: {
        presence: true,
        type: "string"
    },
    title: {
        presence: { allowEmpty: false },
        type: "string",
        length: {
            maximum: 35,
            message: "Must be 35 characters or less"
        }
    },
    specification: {
        presence: { allowEmpty: false },
        type: "string",
        length: {
            maximum: 255,
            message: "Must be 255 characters or less"
        }
    },
    link: {
        presence: { allowEmpty: false },
        url: true,
        length: {
            maximum: 500,
            message: "Must be 500 characters or less"
        }
    },
};

function isValidJobRole(job) {
  var validationResult = validate(job, constraints, { format: "detailed" });

  if (validationResult) {
    throw new Error(validationResult[0].error);
  }
  var jobObject = {
    band_id: job.band.trim(),
    job_family_id: job.family.trim(),
    kainos_job_title: job.title.trim(),
    job_specification: job.specification.trim(),
    job_spec_link: job.link.trim(),
  };
  return jobObject;
}

exports.isValidJobRole = isValidJobRole;
