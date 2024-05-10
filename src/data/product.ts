import DatabaseRecord from "~/lib/utilities/database/record";

class Product extends DatabaseRecord<"products"> {
  constructor(id: string) {
    super(id, "products");
  }

  setprice(price: number) {
    this.setValue("price", price);
  }
}

const product = new Product("1");
product.injectData({
  id: 1,
  code: "123",
});
