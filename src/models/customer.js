class Customer {
    constructor(db) {
      this.collection = db.collection('customers');
    }
  
    async createCustomer(customerData) {
      return await this.collection.insertOne(customerData);
    }
  
    async findCustomerByEmail(email) {
      return await this.collection.findOne({ email });
    }
  }
  
  module.exports = Customer;