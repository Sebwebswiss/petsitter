declare global {
    namespace NodeJS {
      interface Global {
        mongoose: {
          conn: any,
          promise: Promise<any> | null,
        };
      }
    }
  }

  declare const Calendly: any;
  
  // To make TypeScript treat this file as a module
  export {};
  