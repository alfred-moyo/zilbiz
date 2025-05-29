class Business {
    constructor(db) {
      this.collection = db.collection('businesses');
    }
  
    async createBusiness(businessData) {
      return await this.collection.insertOne(businessData);
    }
  
    async findBusinessByName(name) {
      return await this.collection.findOne({ name });
    }

    async getAllBusinesses() {
      try {
        const businesses = await this.collection.aggregate([
          {
            $lookup: {
              from: 'reviews',
              localField: '_id',
              foreignField: 'businessId',
              as: 'reviews'
            }
          },
          {
            $addFields: {
              averageRating: { $avg: '$reviews.rating' }
            }
          },
          {
            $project: {
              name: 1,
              businessType: 1,
              description: 1,
              reviews: 1,
              averageRating: 1,
              createdAt: 1
            }
          },
          { $sort: { createdAt: -1 } }
        ]).toArray();
        
        return businesses;
      } catch (error) {
        console.error('Error fetching businesses:', error);
        throw error;
      }
    }
  }
  
  module.exports = Business;