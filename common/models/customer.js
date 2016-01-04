module.exports = function(Customer) {

// Removes (POST) /products
Customer.disableRemoteMethod('create', true);
 // Removes (PUT) /products
Customer.disableRemoteMethod('upsert', true);
// Removes (DELETE) /products/:id
Customer.disableRemoteMethod('deleteById', true);
// Removes (POST) /products/update
Customer.disableRemoteMethod('updateAll', true);
// Removes (PUT) /products/:id
Customer.disableRemoteMethod('updateAttributes', false);
 // removes (GET|POST) /products/change-stream
Customer.disableRemoteMethod('createChangeStream', true);
};
