module.exports = {
  client: 'pg',
  connection: {
    host     : process.env.dbhost || 'localhost',
    user     : process.env.dbuser || 'user',
    password : process.env.dbpassword || '',
    database : process.env.dbname || 'test',
    charset  : 'utf8'
  }
};
