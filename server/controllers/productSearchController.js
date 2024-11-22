const algoliasearch = require("algoliasearch");
const client = algoliasearch("FCW6D3LK4W", "8ade48fef80aecbfacfea2b94183c2cc");
const index = client.initIndex("mean");

const productSearchController = {
  productSearch: async (req, res, next) => {
    const { page, name, minPrice, maxPrice, categories, brands } = req.query;
    let filters = [];

    if (minPrice && maxPrice) {
      filters.push(`price >= ${minPrice} AND price <= ${maxPrice}`);
    } else {
      filters.push(`price < 500`);
    }

    if (categories) {
      const categoryFilters = categories
        .split(",")
        .map((cat) => `category.name:"${cat}"`);
      filters.push(`(${categoryFilters.join(" OR ")})`);
    }

    if (brands) {
      const brandFilters = brands
        .split(",")
        .map((brand) => `brand.name:"${brand}"`);
      filters.push(`(${brandFilters.join(" OR ")})`);
    }

    const filterString = filters.join(" AND ");
    console.error(filterString);

    try {
      const content = await index.search(name || "", {
        filters: filterString,
        page: page ? parseInt(page) : 0,
      });

      return res.json({
        success: true,
        message: "Here is your search",
        status: 200,
        content: content,
        search_result: req.query.query,
      });
    } catch (err) {
      return res.json({
        success: false,
        message: "fail",
        status: 500,
        content: err,
        search_result: req.query.query,
      });
    }
  },
};

module.exports = productSearchController;
