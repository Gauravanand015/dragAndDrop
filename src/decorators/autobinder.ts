// namespace App {
//   //! auto_bind decorators

//   export function auto_bind(
//     _: any,
//     _2: string,
//     descriptor: PropertyDescriptor
//   ) {
//     const originalDescriptor = descriptor.value;
//     const adjustedDescriptor: PropertyDescriptor = {
//       configurable: true,
//       get() {
//         let boundFxn = originalDescriptor.bind(this);
//         return boundFxn;
//       },
//     };

//     return adjustedDescriptor;
//   }
// }

// ? Import and Export using ES6 syntax

//! auto_bind decorators
export function auto_bind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalDescriptor = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      let boundFxn = originalDescriptor.bind(this);
      return boundFxn;
    },
  };

  return adjustedDescriptor;
}
