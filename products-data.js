const mongoose = require('mongoose');
require("dotenv/config");

const Product = require('./models/Product.model')

const products = [
        {
        imagePath: 'https://images.squarespace-cdn.com/content/v1/54ac7b74e4b0e845494f6319/1521405246236-SUTZH87RG9SCVDPBXK3Q/IMG_2158.jpg?format=1500w',
        title:"Antisana",
        description: "volcano",
        price: "Free"

        },
        
        {
          imagePath: 'https://images.squarespace-cdn.com/content/v1/54ac7b74e4b0e845494f6319/1521405246236-SUTZH87RG9SCVDPBXK3Q/IMG_2158.jpg?format=1500w',
          title:"Antisana",
          description: "volcano",
          price: "Free"
  
          },

          {
            imagePath: 'https://images.squarespace-cdn.com/content/v1/54ac7b74e4b0e845494f6319/1521405246236-SUTZH87RG9SCVDPBXK3Q/IMG_2158.jpg?format=1500w',
            title:"Antisana",
            description: "volcano",
            price: "Free"
    
            },

            {
              imagePath: 'https://images.squarespace-cdn.com/content/v1/54ac7b74e4b0e845494f6319/1521405246236-SUTZH87RG9SCVDPBXK3Q/IMG_2158.jpg?format=1500w',
              title:"Antisana",
              description: "volcano",
              price: "Free"
      
              },
              {
                imagePath: 'https://images.squarespace-cdn.com/content/v1/54ac7b74e4b0e845494f6319/1521405246236-SUTZH87RG9SCVDPBXK3Q/IMG_2158.jpg?format=1500w',
                title:"Antisana",
                description: "volcano",
                price: "Free"
        
                },
                {
                  imagePath: 'https://images.squarespace-cdn.com/content/v1/54ac7b74e4b0e845494f6319/1521405246236-SUTZH87RG9SCVDPBXK3Q/IMG_2158.jpg?format=1500w',
                  title:"Antisana",
                  description: "volcano",
                  price: "Free"
          
                  },
  ];

Product.create(products)
.then(function(results){
    console.log("Product Saved", results)
    mongoose.connection.close()
})
.catch (function(error){
    console.log("Something went wrong", error.message)
    mongoose.connection.close()
})


mongoose
  .connect(process.env.MONGODB_URI)
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));