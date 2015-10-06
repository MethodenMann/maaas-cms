module maaas {
  export function Inject(injectable) {
    return function(prototype, method, argumentPosition) {
      prototype.$inject = prototype.$inject || [];
      prototype.$inject[argumentPosition] = injectable;
    };
  }
}
