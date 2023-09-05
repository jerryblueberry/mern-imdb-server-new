const Product = require('../modal/Product');
const router = require("express").Router();
// const products = require('../config/products.json')

// Seed the initial movie data (uncomment this code if you want to insert movies to the database)
// const insertProducts = async () => {
//   try {
//     const docs = await Product.insertMany(products);
//     return Promise.resolve(docs);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };

// insertProducts()
//   .then((docs) => console.log(docs))
//   .catch((err) => console.log(err));



// To add Products
router.post('/add', async (req, res) => {
    const product = req.body;
    const newProduct = new Product(product);
    console.log(product);
    try {
      await newProduct.save();
      res.status(200).json({ newProduct });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  });

// To get Products
router.get("/options",async(req,res) =>  {
    // try {
    //     const products = await Product.find();
    //     res.status(200).json(products);
        
    // } catch (error) {
    //     res.status(401).json({message:error.message});
        
    // }
    //  new code


    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 9;
      const search = req.query.search || "";
      let sort = req.query.sort || "rating";
      let genre = req.query.genre || "All";
  
      const genreOptions = [
        "Action",
        "Romance",
        "Fantasy",
        "Drama",
        "Crime",
        "Adventure",
        "Thriller",
        "Sci-fi",
        "Music",
        "Family",
        "Comedy"
      ];
  
      genre === "All" ? (genre = [...genreOptions]) : (genre = req.query.genre);
      req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
  
      let sortBy = {};
      if (sort[1]) {
        sortBy[sort[0]] = sort[1];
      } else {
        sortBy[sort[0]] = "asc";
      }
  
      const movies = await Product.find({ name: { $regex: search, $options: "i" } })
        .where("genre")
        .in([...genre])
        .sort(sortBy)
        .skip(page * limit)
        .limit(limit);
  
      const total = await Product.countDocuments({
        genre: { $in: [...genre] },
        name: { $regex: search, $options: "i" },
      });
  
      const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        genres: genreOptions,
        movies,
      };
  
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
 
  

   
  
});


//  to get product by id

router.get("/:id",async(req,res) =>  {
  try {
    const product  = await Product.findById(req.params.id);
    res.status(200).json(product)
    
  } catch (error) {
    res.status(401).json({message:error.message});

    
  }

})

//  for the slug 
router.get("/products/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//  for the sections based on categories /genre

router.get('/genre/:genre',async (req,res) => {
  try {
    let sort = req.query.sort || "rating";

    req.query.sort ? (sort = req.query.sort.split(",")) :(sort= [sort]);

    let sortBy  = {};

    if(sort[1]){
      sortBy[sort[0]] = sort[1];
    }else{
      sortBy[sort[0]] = "asc";
    }
    const genre = await Product.find({genre :req.params.genre})
      .sort(sortBy)
    ;
    if(!genre){
      return res.status(404).json({message:"Genre Not Found"});
    }
    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
});


//  to view all products 


module.exports  = router;
