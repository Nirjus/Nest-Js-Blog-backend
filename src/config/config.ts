export default () => ({
  jwtSecret: process.env.JWT_SECRET,
  refreshSecret: process.env.REFRESH_TOKEN,
});
