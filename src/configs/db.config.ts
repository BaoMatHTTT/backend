export const dbConfig = {
    connectionString: `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=${process.env.DB_HOST})(Port=${process.env.DB_PORT}))(CONNECT_DATA=(SID=${process.env.DB_SERVICE_NAME})))`
}