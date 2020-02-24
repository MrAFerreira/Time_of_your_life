'use strict';
const passEnvironmentVariablesToTemplates = (req, res, next) => {
  res.locals.environment = process.env;
  // Now we can access any environment variables from `hbs` views
  // For example, accessing the GOOGLE_MAPS_API_KEY
  // by writing {{ environment.GOOGLE_MAPS_API_KEY }}
  next();
};
module.exports = passEnvironmentVariablesToTemplates;
// Then use it like
// app.use(passEnvironmentVariablesToTemplates);
