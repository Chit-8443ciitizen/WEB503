import mysql from "mysql2";
export const poolConnectDB = () =>{
    // let pool = mysql.createPool({
    //     connectionLimit: 10,
    //     host: 'b3y5zsbgulhli6dchlgg-mysql.services.clever-cloud.com',
    //     user: 'uksqhkuftxyjptsn',
    //     password: 'qegEFpTn4imTQcZAjTpi',
    //     database: 'b3y5zsbgulhli6dchlgg',
    // });
    let pool = mysql.createPool({
        
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'assignment',
    });


    return pool;
}