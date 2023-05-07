class CategoryController {

    createCategory = (req, res, next) => {

        res.json({
            result: null,
            status: true,
            msg: "you are creating a category ",
            meta: null
        })

    }

    listCategories = (req, res, next) => {

    }
    getCategoryDetail = (req, res, next) => {

    }
    upadteCategory = (req, res, next) => {

    }

    deleteCategory = (req, res, next) => {

    }
}
const categoryController = new CategoryController;

module.exports = categoryController;