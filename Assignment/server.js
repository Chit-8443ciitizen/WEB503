import express from "express";
import bodyParser from "body-parser";
import path from "path";
import multer from "multer";
import { poolConnectDB } from "./db/connect.js";
import * as productQuery from "./db/statements/product.js";
const app = express();
const port = 3000;
// Sử dụng bodyParser với tùy chọn extended: true
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
const pool = poolConnectDB();

// --------------- bài 1 ---------------
app.get("/", (req, res) => {
  var today = new Date();
  const currentDay = today.getDay();
  let day = "";
  switch (currentDay) {
    case 0:
      day = "Chủ nhật";
      break;
    case 1:
      day = "Thứ hai";
      break;
    case 2:
      day = "Thứ ba";
      break;
    case 3:
      day = "Thứ tư";
      break;
    case 4:
      day = "Thứ năm";
      break;
    case 5:
      day = "Thứ sáu";
      break;
    case 6:
      day = "Thứ bảy";
      break;
    default:
      console.log(`Error: ${currentDay}`);
  }
  // Get the current time in Hanoi (GMT+7)
  const currentTimeInHanoi = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh", // Hanoi timezone (GMT+7)
  });
  // Extract the formatted time from the current time
  const options = { hour: "numeric", minute: "numeric", second: "numeric" };
  const timeFormat = new Intl.DateTimeFormat("en-US", options);
  const formattedTime = timeFormat.format(new Date(currentTimeInHanoi));
  res.render("home", { kindOfDay: `${day}, ${formattedTime}` }); // home, shop
});

app.listen(port, () => {
  console.log(`Ứng dụng đang lắng nghe trên cổng: http://localhost/${port}`);
});
app.get("/", (req, res) => {
  res.render("home");
});
//  ---------------- bài 2 -----------------------
//data
var listProduct = [
  {
    id: "A01",
    title: "Apple Book",
    price: 3000,
    description:
      "A very interesting book about so many even more interesting things!",
    imageURL:
      "https://gingersauce.co/wp-content/uploads/2020/10/applecover-1-1024x999.jpg",
  },
  {
    id: "M01",
    title: "Microsoft Book",
    price: 2000,
    description:
      "A very interesting book about so many even more interesting things!",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkr20G9irjCfZoTUFhgcts8REMfwFO-FJNnw&usqp=CAU",
  },
  {
    id: "V01",
    title: "VFast Book",
    price: 1000,
    description:
      "A very interesting book about so many even more interesting things!",
    imageURL:
      "https://m.media-amazon.com/images/I/71p4p0OIf3L._AC_UF1000,1000_QL80_.jpg",
  },
];

// app.get("/shop", (req, res) => {
//   res.render("shop", {products: listProduct }); // products: listProduct, newProduct: listProductNew
// });
app.get("/shop",(req,res)=>{
  res.render('shop',{products:listProduct, newProducts:listProductNew});
  })
// app.get("/test", (req, res) => {
//   const sql = productQuery.getAll();
//   pool.query(sql, (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });
// ------ bài 3 ----------

app.get("/addnew", (req, res) => {
  res.render("add-product");
});

// Sử dụng Multer để xử lý file upload
const storage = multer.memoryStorage(); // Lưu trữ file trong bộ nhớ
const upload = multer({ storage: storage });

// Danh sách sản phẩm thêm mới
const listProductNew = [];

app.post("/addnew", upload.single("addProductImage"), (req, res) => {
  // Lấy thông tin từ form và file upload
  const productName = req.body.addProductName;
  const productPrice = req.body.addProductPrice;
  const productDescription = req.body.addProductDescription;
  const productImage = req.body.addProductImage;

  // Tạo một sản phẩm mới
  const newProduct = {
    id: generateRandomId(),
    title: productName,
    price: parseInt(productPrice),
    description: productDescription,
    imageURL: productImage,
  };
  function generateRandomId() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    // Generate random letters
    const randomLetters = Array.from(
      { length: 2 },
      () => letters[Math.floor(Math.random() * letters.length)]
    );

    // Generate random numbers
    const randomNumbers = Array.from(
      { length: 2 },
      () => numbers[Math.floor(Math.random() * numbers.length)]
    );

    // Concatenate letters and numbers
    const randomId = randomLetters.join("") + randomNumbers.join("");

    return randomId;
  }
  // Thêm sản phẩm vào danh sách
  listProductNew.push(newProduct);

  //chuyển về trang sản phẩm
  res.redirect("/shop");
});
// app.post("/addnew",(req, res) => {
//   //lấy dữ liệu từ form sau khi upload anh
//   const file = req.file;
//   let title = req.body.addProductName;
//   let price = req.body.addProductPrice;
//   let description = req.body.addProductDescription;
//   // let nameImage = "./uploads/" + file.filename;
//   let nameImage = req.body.addProductImage;
//   //Thêm vào mảng json 1 cuối sách mới
//   // listProduct.push({
//   //   id: listProduct.length + 1,
//   //   title: title,
//   //   price: price,
//   //   description: description,
//   //   imageURL: nameImage,
//   // });
//   // Add the new product to the list
//   const newProduct = {
//     id: generateRandomId(),
//     title: title,
//     price: price,
//     description: description,
//     imageURL: nameImage,
//   };
//   function generateRandomId() {
//     const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     const numbers = '0123456789';

//     // Generate random letters
//     const randomLetters = Array.from({ length: 2 }, () => letters[Math.floor(Math.random() * letters.length)]);

//     // Generate random numbers
//     const randomNumbers = Array.from({ length: 2 }, () => numbers[Math.floor(Math.random() * numbers.length)]);

//     // Concatenate letters and numbers
//     const randomId = randomLetters.join('') + randomNumbers.join('');

//     return randomId;
//   }
//   listProduct.push(newProduct);
//   //chuyển về trang sản phẩm
//   res.redirect("/shop");
//   // res.json(file)
// });

// const checkFileUpload = () => {
//   if (!file.originalname.match(/\.(jpg|png|gif|jpeg)$/)) {
//     cb(new Error("Bạn chỉ được uplaod file ảnh!"));
//   } else {
//     cb(null, true);
//   }
// };
// app.get("/testdb", (req, res) => {
//   const sql = `SELECT * FROM loai`;
//   pool.query(sql, (err, results) => {
//     if (err) {
//       res.json({
//         err: err,
//         status: 500,
//         message: "The server is error",
//       });
//     }
//     res.status(200).json(results);
//   });
// });
