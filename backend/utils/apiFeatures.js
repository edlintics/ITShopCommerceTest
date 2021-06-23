class APIFeatures {
  // sample
  //// Get all products   => /api/v1/products?keywords=apple
  /// where keywords=apple is our query

  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword // extract the keyword from the api
      ? {
          // if the word is present, extract it
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", // case insensitive
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this; // thus in this case refer to the objecr within the function
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // Removing fileds from the query that does not use for filter operation
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    // Advance filter for price, ratings etc
    let queryStr = JSON.stringify(queryCopy); // convet object to JSON value
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    // gt => greater than, gte =? greater than or equal to, lt => less than, lte => less than or equal to
    //The parameter after add '$' sign in the front, able to perform mongo search
    // we need to add the dollar sign before the word to perform the query search in mongo

    this.query = this.query.find(JSON.parse(queryStr)); // convert back to Object

    return this;
  }

  pagination(resPerPage) {
    // set in the parameter the dersied number \of products to display
    const currentPage = Number(this.queryStr.page) || 1; //from the extrated api, will take the number of query /query=[number]
    const skip = resPerPage * (currentPage - 1); // skip the amount of product correpsponding twith current number of products

    this.query = this.query.limit(resPerPage).skip(skip);
    // this.query.limit(resPerPage) => Set teh limited amount products can display per paramenter
    //skip => Skip the necessary amount of products
    return this;
  }
}

module.exports = APIFeatures;
