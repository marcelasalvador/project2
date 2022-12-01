const User = require('../models/Products.model');
const { exists } = require('../models/User.model');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


var products = [
    new Products ({
        imagePath: '',
        title:"",
        description: "",
        price: "Free"
    }),
    new Products ({
            imagePath: '',
            title:"",
            description: "",
            price: "Free"
        })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products [i].save(function(err,result) {
        done++;
        if (done == products.lenght) {
            exit()
        }
    })
}
function exit() {
    mongoose.disconnect();
}