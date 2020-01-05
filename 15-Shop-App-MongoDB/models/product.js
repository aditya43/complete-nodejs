
class Product {
    constructor (title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save () {
        const db = getDbInstance();
    }
}

module.exports = Product;
