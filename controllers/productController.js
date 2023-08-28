const createProducts = async(req,res)=>{
    res.send('create product');
}

const getAllProducts = async(req,res)=>{
    res.send('get all products');
}

const updateProduct = async(req,res)=>{
    res.send(' update product');
}

const getSingleProduct = async(req,res)=>{
    res.send(' get single product');
}

const deleteProduct = async(req,res)=>{
    res.send('delete product');
}

const uploadImage = async(req,res)=>{
    res.send('upload image');
}


module.exports ={
    createProducts,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,
    uploadImage

}