import DatabaseRecord from "~/lib/utilities/database/record";

const table = "products";

export default class Product extends DatabaseRecord<typeof table> {
  constructor(id: string) {
    super(id, table);
  }

  setprice(price: number) {
    this.setValue("price", price);
    this.value("price")
  }
}

const product = new Product("1");
product.injectData({
  id: 1,
  code: "123",
});
