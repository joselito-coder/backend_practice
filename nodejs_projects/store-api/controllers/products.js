const Product = require('../models/product')


const getAllProductsStatic = async (req, res) => {
    const search = '';
    const products = await Product.find({
        name: { $regex: search, $options: 'i' }
    })
    .sort('name')
    .select('name price')

    res.status(200).json({ products, nBHits: products.length })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort,fields } = req.query
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }

    // sort
    let result = Product.find(queryObject);
    if (sort) {
        // console.log(sort)
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList);
    }
    else {
        result = result.sort('createdAt')
    }


    if(fields){
        const fieldList = fields.split(',').join(' ');
        result = result.select(fieldList);
    }

    const page = Number(req.query.page) || 1
    const limit= Number(req.query.limit) || 10
    const skip = (page -1 ) * limit

    result = result.skip(skip).limit(limit);


    const products = await result;
    res.status(200).json({ products, nBHits: products.length })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}