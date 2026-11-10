const express = require("express");
const cors = require('cors');
const app = express();
const router = express.Router();
const bp = require("body-parser");
const dotenv = require("dotenv");

const port = process.env.BACKEND_PORT || 5000;



app.use("/", router);
var jsonParser = bp.json();
dotenv.config();
router.use(cors());
app.use(cors());
app.use(express.json());
app.use(cors({ origin: '*' }));

//connect to database
const mysql = require("mysql2");
var connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

/*Connect to DB*/
connection.connect(function (err) {
  if (err) throw err;
  console.log(`Connected DB: ${process.env.MYSQL_DATABASE}`);
});



//This is for Product search page

// Testing search a product
// Test case 1(return 2 products)
// method: post
// URL: http://localhost:5000/search
// body: raw JSON
//{
//  "name": "iPhone 13"
//}

//Test case 2(return 1 product)
// method: post
// URL: http://localhost:5000/search
// body: raw JSON
//{
//  "type": "iPad",
//  "rating": "85% New"
//}
app.post('/search', jsonParser, async (req, res) => {
  const { name, type, rating } = req.body;
  let query = "SELECT * FROM product ";
  const conditions = [];
  //use name to search
  if (name) {
    conditions.push(`p_name LIKE '%${name}%'`);
  }
  //use type to search
  if (type) {
    conditions.push(`p_type='${type}'`);
  }
  //use rating to search
  if (rating) {
    conditions.push(`rating = '${rating}'`);
  }
  //use name and type to search
  if (name && type) {
    conditions.push(`p_name LIKE '%${name}%' AND p_type='${type}'`);
  }
  //use name and rating to search
  if (name && rating) {
    conditions.push(`p_name LIKE '%${name}%' AND rating = '${rating}'`);
  }
  //use type and rating to search
  if (type && rating) {
    conditions.push(`p_type='${type}' AND rating = '${rating}'`);
  }
  //use name, type and rating to search
  if (name && type && rating) {
    conditions.push(`p_name LIKE '%${name}%' AND p_type='${type}' AND rating = '${rating}'`);
  }
  //add conditions to query
  if (conditions.length > 0) {
    query += "WHERE " + conditions.join(" AND ");
  }
  try {
    connection.query(query, (err, results, fields) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/*
This is for Product management page
Insert

Testing Insert a product  
Test case 1 (return "New product has been created successfully.")
method: post
URL: http://localhost:5000//api/product
body: raw JSON
{
    "p_id": "100006",
    "p_name": "iPhone 14 Pro",
    "p_des": "Best choice for you",
    "rating": "85% New",
    "p_type": "iPhone",
    "p_color": "Black",
    "p_inches": "6.06 inches",
    "p_memory": "64 GB",
    "p_internet": "4G",
    "p_price": "27500.00",
    "p_reportid": "11"
}
*/

/* 
Test case 2 (return "Error: read ECONNRESET")
method: post
URL: http://localhost:5000//api/product
body: raw JSON
{
    "p_id": "300003",
    "p_name": "Apple Watch Series 6",
    "p_des": "Almost New Watch",
    "rating": "99% New",
    "p_type": "Apple Watch",
    "p_color": "Black",
    "p_inches": "45 mm",
    "p_memory": "32 GB",
    "p_internet": "GPS",
    "p_price": "7800.00",
    "p_reportid": "10"
}
 */
app.post('/api/product', function (req, res) {
  let product = req.body;
  if (!product) {
    return res.status(400).send({ error: true, message: 'Please provide complete product information' });
  }

  // Insert report
  connection.query("INSERT INTO report (rep_id) VALUES (?)", product.p_reportid, function (error, reportResults) {
    if (error) {
      console.error("Error inserting report:", error);
      throw error;
    }
    // Insert product
    connection.query("INSERT INTO product SET ? ", product, function (error, productResults) {
      if (error) throw error;
      return res.send({ error: false, data: productResults.insertId, message: 'New product has been created successfully.' });
    });
  });
});

/* This is for Product management page
Update product

Testing update a product  
Test case 1 (return "Product has been updated successfully.")
method: PUT
URL: localhost:5000/api/product/200002
body: raw JSON
{
    "p_name": "iPad Air 4",
    "p_des": "Almost New iPad",
    "rating": "99% New",
    "p_type": "iPad",
    "p_color": "Black",
    "p_inches": "10.86 inches",
    "p_memory": "32 GB",
    "p_internet": "WiFi",
    "p_price": "11900.00",
    "p_reportid": "7"
}
 */
/* 
Test case 2 (return "Product and associated report have been deleted successfully.")
method: PUT
URL: localhost:5000/api/product/200001
body: raw JSON
{
    "p_name": "iPad 6",
    "p_des": "Not Good",
    "rating": "80% New",
    "p_type": "iPad",
    "p_color": "Black",
    "p_inches": "10.86 inches",
    "p_memory": "128 GB",
    "p_internet": "WiFi"
}
 */

app.put('/api/product/:id', function (req, res) {
  let productId = req.params.id;
  let product = req.body;
  if (!productId) {
    return res.status(400).send({ error: true, message: 'Please provide product_id' });
  }
  if (!product) {
    return res.status(400).send({ error: true, message: 'Please provide product information' });
  }
  connection.query('UPDATE product SET ? WHERE p_id = ?', [product, productId], function (error, results) {
    if (error) throw error;

    return res.send({ error: false, data: results.affectedRows, message: 'Product has been updated successfully.' });
  });
});

/* This is for Product management page
Delete product

Testing delete a product  
Test case 1 (return "Product and associated report have been deleted successfully.")
method: DELETE
URL: localhost:5000/api/product/100005
body: raw JSON
{
    "p_id": "100005"
}
 */
/* 
Test case 2 (return "Product and associated report have been deleted successfully.")
method: DELETE
URL: localhost:5000/api/product/100004
body: raw JSON
{
    "p_id": "100004"
}
 */
app.delete('/api/product/:id', function (req, res) {
  let productId = req.params.id;
  if (!productId) {
    return res.status(400).send({ error: true, message: 'Please provide product_id' });
  }

  // Get p_reportid for the product
  connection.query('SELECT p_reportid FROM product WHERE p_id = ?', [productId], function (error, reportIdResults) {
    if (error) throw error;
    if (reportIdResults.length === 0) {
      return res.status(404).send({ error: true, message: 'Product not found' });
    }
    const reportId = reportIdResults[0].p_reportid;

    // Delete product
    connection.query('DELETE FROM product WHERE p_id = ?', [productId], function (error, productResults) {
      if (error) throw error;

      // Delete report
      connection.query('DELETE FROM report WHERE rep_id = ?', [reportId], function (error, reportResults) {
        if (error) throw error;

        // Send response
        return res.send({
          error: false,
          data: {
            productRowsAffected: productResults.affectedRows,
            reportRowsAffected: reportResults.affectedRows,
          },
          message: 'Product and associated report have been deleted successfully.',
        });
      });
    });
  });
});


//This is for product detail page
app.get('/api/productdetail/:id', function (req, res) {
  let productId = req.params.id;
  if (!productId) {
    return res.status(400).send({ error: true, message: 'Please provide product_id' });
  }

  connection.query('SELECT * FROM product WHERE p_id = ?', [productId], function (error, results) {
    if (error) throw error;
    if (results.length === 0) {
      return res.status(404).send({ error: true, message: 'Product not found' });
    }
    return res.send({ error: false, data: results[0], message: 'Product details fetched successfully.' });
  });
});

/* Search for Administrator list/*
/* Testing search POST url:  http://localhost:3031/searchAdmi */
/*
 Test case 1(return 1 adm):
 {
        "condition": {
            "uid": "a0001",
            "first_name": "",
            "last_namme": "", 
            "age": "", 
            "gender": "",
            "phone": "",
            "email": ""

        }
   }
 Test case 2(return 4 adms):
 {
        "condition": {
            "uid": "",
            "first_name": "",
            "last_namme": "", 
            "age": "", 
            "gender": "M",
            "phone": "",
            "email": ""

        }
   }
 Test case 3(return 3 adms):
 {
        "condition": {
            "uid": "",
            "first_name": "i",
            "last_namme": "", 
            "age": "", 
            "gender": "M",
            "phone": "",
            "email": ""

        }
   }
*/

app.post('/searchAdmi', jsonParser, function (req, res) {

  console.log(req.body.condition);

  let adm_id = (req.body.condition.uid ? " AND (uid = '" + req.body.condition.uid + "')" : "");
  let adm_fname = "%" + (req.body.condition.first_name || "").toLowerCase() + "%"; // ignore the case
  let adm_lname = "%" + (req.body.condition.last_name || "").toLowerCase() + "%";
  let adm_age = (req.body.condition.age ? " AND (age = " + parseInt(req.body.condition.age) + ")" : "");
  let adm_gen = (req.body.condition.gender ? " AND (gender = '" + req.body.condition.gender + "')" : "");
  let adm_phone = (req.body.condition.phone ? " AND (phone = '" + req.body.condition.phone + "')" : "");
  let adm_email = (req.body.condition.email ? " AND (email = '" + req.body.condition.email + "')" : "");

  let qur = "SELECT uid, first_name, last_name, age, gender, phone, email"
    + " FROM adm_information"
    + " WHERE (LOWER(first_name) LIKE ?)"
    + " AND (LOWER(last_name) LIKE ?)"
    + adm_id + adm_age + adm_gen + adm_phone + adm_email // Add additional filters 
    + " ORDER BY uid ASC";
  connection.query(qur, [adm_fname, adm_lname], function (error, results) {
    if (error) throw error;
    return res.status(200).json(results)
  });
});

// view all Admi
// Test the select all admi, using GET url: http://localhost:5000/admis
app.get("/admis", jsonParser, function (req, res) {
  connection.query('SELECT * FROM adm_information Order by uid ASC', function (error, results) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Admi List'
    })
  })
})

//Add(Insert) user
//Testing Insert user, using POST url:  http://localhost:5000/admi
// Test case1:
// {
// {
//  "Adminfo": {
//              "uid": "a456789",
//              "first_name": "Linrui",
//              "last_name": "Dong",
//              "age": "22",
//              "gender": "M",
//              "phone": "95787875",
//              "email": "lingrui@gmail.com"
// },
// "Loginfo": {
//              "login_id": "a456789",
//              "pass": "12345678",
//               "login_role": "Tester"
// }
//   }
// }
// Test case2:
//"Adminfo": {
//              "uid": "a4567839",
//              "first_name": "Linrui",
//              "last_name": "Dong",
//              "age": "22",
//              "gender": "M",
//              "phone": "95787875",
//              "email": "lingrui@gmail.com"
// },
// "Loginfo": {
//              "login_id": "a4567839",
//              "pass": "12345678",
//               "login_role": "Tester"
// }
//   }
// }
app.post('/admi', jsonParser, function (req, res) {
  let adminfo = req.body.Adminfo;
  let loginfo = req.body.Loginfo;
  console.log(adminfo, loginfo);

  // Test input
  if (!adminfo || !adminfo.first_name || !adminfo.last_name || !adminfo.age || !adminfo.gender || !adminfo.phone || !adminfo.email) {
    return res.status(400).send({ error: true, message: 'Please provide complete administrator information' });
  }
  if (!loginfo || !loginfo.login_id || !loginfo.pass || !loginfo.login_role) {
    return res.status(400).send({ error: true, message: 'Please provide complete administrator login information' });
  }

  connection.query("INSERT INTO adm_information SET ?", adminfo, function (error, results) {
    if (error) {
      console.error("Error inserting data:", error);
      return res.status(500).send({ error: true, message: 'Error occurred while creating a new administrator' });
    }

    connection.query("INSERT INTO adm_login SET ?", loginfo, function (error, results) {
      if (error) {
        console.error("Error inserting data:", error);
        return res.status(500).send({ error: true, message: 'Error occurred while creating a new administrator login infor' });
      }
      return res.send({ error: false, message: 'New administrator has been created!' });
    });
  });
});

//update the admi
//Testing Update user, using PUT url:  http://localhost:5000/admi/:id
// Test case1:
// {
// {
//  "Adminfo": {
//              "uid": "a456789",
//              "first_name": "Lin",
//              "last_name": "Don",
//              "age": "22",
//              "gender": "M",
//              "phone": "95787875",
//              "email": "lingrui@gmail.com"
// },
// "Loginfo": {
//              "login_id": "a456789",
//              "pass": "123456",
//               "login_role": "Tester"
// }
//   }
// }
// Test case2:
//"Adminfo": {
//              "uid": "a4567839",
//              "first_name": "rui",
//              "last_name": "Don",
//              "age": "24",
//              "gender": "M",
//              "phone": "95787875",
//              "email": "lingrui@gmail.com"
// },
// "Loginfo": {
//              "login_id": "a4567839",
//              "pass": "a123456",
//               "login_role": "Tester"
// }
//   }
// }
app.put('/admi/:id', jsonParser, function (req, res) {
  let adminfo = req.body.Adminfo;
  let loginfo = req.body.Loginfo;
  let a_uid = req.params.id;
  console.log(adminfo, loginfo, a_uid);
  console.log('Request body:', req.body);
  console.log('Request params:', req.params);
  if (!adminfo || !adminfo.first_name || !adminfo.last_name || !adminfo.age || !adminfo.gender || !adminfo.phone || !adminfo.email) {
    return res.status(400).send({ error: true, message: 'Please provide complete administrator information' });
  }
  if (!loginfo || !loginfo.login_id || !loginfo.pass || !loginfo.login_role) {
    return res.status(400).send({ error: true, message: 'Please provide complete administrator login information' });
  }

  connection.query("UPDATE adm_information SET ? WHERE uid = ?", [adminfo, a_uid], function (error, results) {
    if (error) {
      console.error("Error inserting data:", error);
      return res.status(500).send({ error: true, message: 'Error occurred while update administrator' });
    }

    connection.query("UPDATE adm_login SET ? WHERE login_id = ?", [loginfo, a_uid], function (error, results) {
      if (error) {
        console.error("Error inserting data:", error);
        return res.status(500).send({ error: true, message: 'Error occurred while update administrator login infor' });
      }
      return res.send({ error: false, message: 'Adm information has been updated!' });
    });
  });
});

// Delete user
// Testing Delete the admi DELETE url:http://localhost:5000/admi/:id
// Case 1{
// "a_uid": "a456789"
// }
//Case 2{
// "a_uid": "a4567"
// }
app.delete("/admi/:id", jsonParser, function (req, res) {
  const admiID = req.params.id;

  if (!admiID) {
    return res.status(400).send({ error: true, message: 'Please provide admiID' });
  }

  connection.query("DELETE FROM adm_login WHERE login_id = ?", admiID, function (error, results) {
    if (error) {
      console.error("Error deleting data:", error);
      return res.status(500).send({ error: true, message: 'Error occurred while deleting administrator login: ' + error.message });
    }

    connection.query("DELETE FROM adm_information WHERE uid = ?", admiID, function (error, results) {
      if (error) {
        console.error("Error deleting data:", error);
        return res.status(500).send({ error: true, message: 'Error occurred while deleting administrator: ' + error.message });
      }
      return res.send({ error: false, message: 'Administrator information has been deleted!' });
    });
  });
});
//login
// Test login
// Testing login POST url:http://localhost:5000/login
// Case 1
/* {
  "error": false,
  "message": "Login successful",
  "data": {
      "login_id": "a0001",
      "pass": "123456",
      "login_role": "Boss"
  }
*/
app.post('/login', jsonParser, (req, res) => {
  const loginId = req.body.loginId;
  const password = req.body.password;

  console.log("Trying to log in with:", loginId, password);
  connection.query('SELECT * FROM adm_login WHERE login_id = ? AND pass = ?', [loginId, password], (error, results) => {
    if (error) {
      console.error("Error while querying:", error);
      return res.status(500).send({ error: true, message: 'Error occurred while checking login information' });
    }
    if (results.length > 0) {
      res.send({ error: false, message: 'Login successful', data: results[0] });
    } else {
      res.status(400).send({ error: true, message: 'Invalid login credentials' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


