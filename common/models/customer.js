module.exports = function(Customer) {

Customer.disableRemoteMethod('create', true);                // Removes (POST) /products
Customer.disableRemoteMethod('upsert', true);                // Removes (PUT) /products
Customer.disableRemoteMethod('deleteById', true);            // Removes (DELETE) /products/:id
Customer.disableRemoteMethod('updateAll', true);               // Removes (POST) /products/update
Customer.disableRemoteMethod('updateAttributes', false);       // Removes (PUT) /products/:id
Customer.disableRemoteMethod('createChangeStream', true);    // removes (GET|POST) /products/change-stream

};
