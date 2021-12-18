// const fs = require("fs");
// const path = require("path");
// import Cors from 'cors';
// const cors = Cors({
//   methods: ['GET', 'HEAD'],
// })

// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result)
//       }

//       return resolve(result)
//     })
//   })
// }

// export default async function usersAPI(req, res) {
//   await runMiddleware(req, res, cors)
//   console.log('teste');
//   if (req.method === "GET") {
    
//   } else if (req.method === "POST") {
//     console.log(req.body);
   
//   }
// }
