import Saplings from "../models/saplingModel.js";
import Seeds from "../models/seedModel.js";
import Products from "../models/productModel.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try{
    const savedProducts= await Products.find();
    
    res.status(200).json(savedProducts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCategory = async (req, res) => {
  const { category } = req.query;
  try {
    const products= await Products.find({category});
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  const { id: id } = req.params;
  const content = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no product with that id")

  const products = await Products.findById(id)
  products.comments.push(content)
  const updatedProducts = await Products.findByIdAndUpdate(id, products, {
    new: true,
  });
  res.status(201).json(updatedProducts);
  }  

export const refreshProducts = async (req, res) => {
    try {
      const seeds = await Seeds.find();
      const saplings = await Saplings.find();
      let products = []
      saplings.forEach((item) => {
        products.push({ _id: item._id, price: item.price, type:"saplings", category:item.category, name: item.name, description: item.description, selectedFile: item.selectedFile, type: item.type, stock: item.stock })
      })
      seeds.forEach((item1) => {
          products.push({ _id: item1._id, price: item1.price, type:"seeds", sub_category:item1.sub_category, name: item1.name, description: item1.description, selectedFile: item1.selectedFile, type: item1.type, stock: item1.stock, comments:[] })
      })
      let newProduct
      let updatedProduct
      
      products.forEach(async (product)=>{
        const name = new RegExp(product.name, "i");
        if(!await Products.findOne({name}))
        {
          newProduct= new Products(product)
          await newProduct.save();}
          else {
            if(product.type==="sapling")
            {
              const upSapling = await Saplings.findOne({name})
              console.log(upSapling)
              updatedProduct = await Products.findOneAndUpdate({name},{category:upSapling.category, price: upSapling.price,sub_category:upSapling.sub_category,stock:upSapling.stock,selectedFile:upSapling.selectedFile,description:upSapling.description},{new:true})
            }
            console.log(updatedProduct)
          }
      })
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };  