export function Singleton() {
  return function _signleton<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class __ extends constructor {
      private static inst: __;

      constructor(...args: any[]) {
        console.log('hi');
        super(...args);

        if (!__.inst) {
          __.inst = this;
        }
        return __.inst;
      }
    };
  };
}
