/* eslint-disable prettier/prettier */
export default () => ({
    PORT: parseInt(process.env.PORT) || 3000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1/peersync',
    BASE_FE_URI: 'https://workspace-hrsn.onrender.com/',
    BASE_BE_URI: 'https://workspace-api.onrender.com/api/v1/',
    APP_NAME: 'Peer Sync',
    EMAIL: 'account@easylabsltd.com'
});
// 'mongodb+srv://peer_user:sNbeRPv0Gt3aIHZ6@cluster0.vrx0p3m.mongodb.net/peersync?retryWrites=true&w=majority',