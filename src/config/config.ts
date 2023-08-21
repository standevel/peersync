/* eslint-disable prettier/prettier */
export default () => ({
    PORT: parseInt(process.env.PORT) || 3000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1/peersync',
});
