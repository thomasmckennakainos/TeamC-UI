var validate = require("validate.js");

var constraints = {
  bandId: {
    presence: true,
    type: "string",
  },
  jobFamilyId: {
    presence: true,
    type: "string",
  },
  role_title: {
    presence: { allowEmpty: false },
    type: "string",
    length: {
      maximum: 35,
      message: "Must be 35 characters or less",
    },
  },
  jobSpecification: {
    presence: { allowEmpty: false },
    type: "string",
    length: {
      maximum: 500,
      message: "Must be 500 characters or less",
    },
  },
  jobSpecLink: {
    presence: { allowEmpty: false },
    url: true,
  },
};

function isUpdatedJobRoleValid(job) {
  var validationResult = validate(job, constraints, { format: "detailed" });

  if (validationResult) {
    throw new Error(validationResult[0].error);
  }
  var jobObject = {
    bandId: job.bandId.trim(),
    jobFamilyId: job.jobFamilyId.trim(),
    role_title: job.role_title.trim(),
    jobSpecification: job.jobSpecification.trim(),
    jobSpecLink: job.jobSpecLink.trim(),
  };
  return jobObject;
}

exports.isUpdatedJobRoleValid = isUpdatedJobRoleValid;
