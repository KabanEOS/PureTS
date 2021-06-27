declare namespace Cypress {
  interface Chainable<Subject = any> {
    loginAsStandardUser1(): Chainable<void>;
    loginAsInternalMod1(): Chainable<void>;
  }
}

//TODO: Add type to store
interface Window {
  store: any;
}