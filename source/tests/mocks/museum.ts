var MuseumServiceMock = function ($q)   {
  return {
    find: () => {
      var deferred = $q.defer();
      deferred.resolve({ "name" : "nmsg", "description": "blabla"});
      return deferred.promise;
    }
  }
};
