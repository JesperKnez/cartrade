// File: dbConnect.js
//Author: Jesper Knez

//database connection in constructor
class DbConnect {
    constructor(mysql, host, user, password, database, dateStrings) {
        if(dateStrings !== true){
            dateStrings == false
        }
        this.connection = mysql.createConnection({
            host: host,
            user: user,
            'password': password,
            database: database,
            dateStrings: dateStrings
        });
        this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to the database:', err);
            } else {
                console.log('Connected to the database');
            }
        });
    }
}
    
module.exports = DbConnect;