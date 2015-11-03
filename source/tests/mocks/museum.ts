export function GetMuseumServiceMock ($q)   {

   var mock = {
     find: () => {
       var deferred = $q.defer();
       deferred.resolve({ "name" : "nmsg", "description": "blabla"});
       return deferred.promise;
     }
   }

  return mock;
};
