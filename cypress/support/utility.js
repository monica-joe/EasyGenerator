export class Utility {
  
    getBaseUrl() {
      const envi = Cypress.env("ENV");
      if (envi === "localhost") return "http://localhost:8080/";
    }
  }
  