export const getAll = () =>{
    const sql = `SELECT * FROM sanpham`;
    return sql;
}
export const insertProduct= (data) =>{
    const sql = `INSERT INTO sanpham (title, price, description, imageURL) VALUES 
    ()
    `;
    return sql;
}