module.exports = function(Customer) {

  // Removes (POST) /customers
  Customer.disableRemoteMethod('create', true);
   // Removes (PUT) /customers
  Customer.disableRemoteMethod('upsert', true);
  // Removes (DELETE) /customers/:id
  Customer.disableRemoteMethod('deleteById', true);
  // Removes (POST) /customers/update
  Customer.disableRemoteMethod('updateAll', true);
  // Removes (PUT) /customers/:id
  Customer.disableRemoteMethod('updateAttributes', false);
   // removes (GET|POST) /customers/change-stream
  Customer.disableRemoteMethod('createChangeStream', true);
};
