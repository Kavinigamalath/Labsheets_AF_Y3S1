
//1. Write to file 
 
const fs = require('fs'); 
fs.writeFile('file.txt', 'Hello World!', function (err) { 
  if (err) throw err; 
  console.log('File saved!'); 
}); 

//2. Read file

fs.readFile('file.txt', 'utf8', function (err, data) { 
if (err) throw err; 
console.log(data); 
}); 

 
//3. Creating a web server: 

const http = require('http'); 
http.createServer(function (req, res) { 
  res.writeHead(200, {'Content-Type': 'text/html'}); 
  res.write('Hello World!'); 
  res.end(); 
}).listen(8080); 
 
//4. Making an HTTP request: 

const https = require('https'); 
https.get('https://jsonplaceholder.typicode.com/posts/2', (resp) => { 
  let data = ''; 
 
  resp.on('data', (chunk) => { 
    data += chunk; 
  }); 

  resp.on('end', () => { 
    console.log(JSON.parse(data)); 
  }); 
}).on('error', (err) => { 
  console.log("Error: " + err.message); 
}); 

//5. Using a module 

const myModule = require('./my-module.js'); 
console.log(myModule.myFunction()); 
 
//6. Promises 
let condition = true;

const myPromise = new Promise((resolve, reject) => { 
  if (condition) { 
    resolve('Success!'); 
  } else { 
    reject('Failure!'); 
  } 
}); 
 
myPromise.then((result) => { 
  console.log(result); 
}).catch((error) => { 
  console.log(error); 
}); 
 
//7. Async/Await 

async function myFunction() { 
  try { 
    const result = await myPromise; 
    console.log(result); 
  } catch (error) { 
    console.log(error); 
  } 
} 
 
myFunction();

