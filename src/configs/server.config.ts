export const serverConfig = {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 4000,
    sessionKey: process.env.SESSION_KEY || 'simple_key'
}