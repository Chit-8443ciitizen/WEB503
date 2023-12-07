
const express = require ('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
const port = 3000;
app.listen(port, ()=>{
    console.log(`Ứng dụng đang chạy với port: ${port}`);

})
app.get('/',(req, res) => {
     res.send(`
        <h3>Lab 01</h3> <br>
        <a href="/api">Bài 1</a> <br>
        <a href="/product"  >Bài 2.1 - product: </a> <br>
        <a href="/add-product"  >Bài 2.2 - add-product: </a> 
        <hr>
        <a href="/inventors">Bài 3: Xây dựng ứng dụng thông tin nhà khoa học</a> <br>
        
        <hr>
    `)
})

// ------------ bài 1------------
app.get('/api', (req, res) => {
    //console.log(`Yêu cầu POST tới /api`);
    res.send('Phản hồi thành công'); // Trả về phản hồi
});
// truy cập tới server thông qua http thì chưa có phản hồi vì chưa thực hiện đúng cách xử lý yêu cầu POST và trả về phản hồi từ server. 
// Sau đó, khi bạn truy cập vào /api thông qua HTTP, bạn sẽ nhận được phản hồi từ server.

// ---------------- bài 2 --------------
// router

app.get('/add-product', (req, res)=>{
    res.send(`
    <p>Đây là trang add product</p>
        <form action="/product" method="GET">
                <input type="text" name="productName" placeholder="badminton"> 
             <button type="submit">Add product</button>
        </form>
        
    `); 
})
app.get('/product', (req, res) => {
    const productName = req.query.productName; 
    encodeURIComponent(productName);
    res.send(`
        <p>Đây là trang product</p> 
        <p>Giá trị của productName: ${(productName) || 'Không có giá trị'}</p>
    `);
});
// ---     bài 3 -------------
//data
const inventors = [
    { id:1, first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { id:2, first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { id:3, first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { id:4, first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { id:5, first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { id:6, first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 }
    ]
app.get('/inventors', (req, res) => {
    let list='<h2>Danh sách nhà khoa học<ul>';
    inventors.forEach(e => {
    list+=`<li><a style="text-decoration:none;color:green;" href="/inventor/${e.id}">${e.last}</a></li>`;
    });
    list+='</ul></h2>';
    res.send(`<a href="/add-inventor">Add inventor</a>
    ${list};
    `);

   
    });
    
app.get('/inventor/:id', (req, res) => {
    let id=req.params.id;
    inventor=inventors.find(e=>e.id==id);
    info=`<h2>Thông tin chi tiết nhà khoa học:Full name: ${inventor.first} ${inventor.last}, Year: ${inventor.year},
    Passed: ${inventor.passed}</h2>`;
    res.send(info);
    });

// ---------- bài 4 ---------------

app.get('/add-inventor', (req, res)=>{
    res.send(`
    <h3>Thêm nhà khoa học</h3>
    <form action="/inventors" method="POST">
            <input type="text" name="first" placeholder="first name" style=" width: 100px"> 
            <input type="text" name="last" placeholder="last name" style=" width: 100px">  <br>
            <input type="text" name="year" placeholder="year of birth" style=" width: 100px"> 
            <input type="text" name="passed" placeholder="year of passed" style=" width: 100px">  <br>
            <button type="submit">Add Inventor</button>
    </form>
        
    `); 
})
app.post('/inventors', (req, res) => {
    const newInventor = {
        id: inventors.length + 1,
        first: req.body.first,
        last: req.body.last,
        year: parseInt(req.body.year),
        passed: parseInt(req.body.passed),
    };
    inventors.push(newInventor);
    
    // Redirect to the /inventors route to display the updated list
    res.redirect('/inventors');
    // let rowInventor = []; 
    // rowInventor.push(length.inventors + 1);
    // rowInventor.push(req.query.first);
    // rowInventor.push(req.query.last);
    // rowInventor.push(req.query.year);
    // rowInventor.push(req.query.passed);

    // if (rowInventor != "") {inventors.push(rowInventor)};
    // rowInventor = [];
    // res.redirect('/inventors?')
    
});