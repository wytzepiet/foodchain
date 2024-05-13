import createRecord from "~/lib/utilities/database/record";

function createProduct(id?: number) {
  const product = createRecord("products", id);

  return {
    ...product,

    setPrice(price: number) {
      this.setValue("price", price);
    },
  };
}

const test = createProduct();

// export default class Product extends DatabaseRecord<typeof table> {
//   constructor(id: string) {
//     super(id, table);
//   }

//   setprice(price: number) {
//     this.setValue("price", price);
//     this.value("price");
//   }
// }

// const product = new Product("1");
// product.injectData({
//   id: 1,
//   code: "123",
// });
