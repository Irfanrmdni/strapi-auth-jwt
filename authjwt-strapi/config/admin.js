module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '87dcf54e6aee4a6ece7fa636ece6fac4'),
  },
});
