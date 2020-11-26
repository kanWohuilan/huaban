
// const appData = require('./src/card.json')
// const pins = appData.pins


// module.exports = {
//   devServer: {
//     before(app) {
//       app.get('api/card',(req,res) => {
//         res.json({
//           error: 0,
//           data: pins
//         })
//       })
//     }
//   }
// }

const appData = require('./src/card.json')
const pins = appData.pins

module.exports={
  devServer: {
    port:4000,
    before(app){
      app.get('/api/card',(req,res,next)=>{
        res.json(pins);
      })
    }
  }
}



  