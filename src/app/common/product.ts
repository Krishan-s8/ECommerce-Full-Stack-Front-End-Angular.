export class Product {

  constructor(public sku: string,
              public name: string,
              public unitprice: string,
              public description: string,
              public imageUrl: string,

              public active: string,
              public unitsInStock: string,
              public dateCreated: string,
              public dateUpdated: string) {
  }
}
