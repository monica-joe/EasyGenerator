 import PracticePageElements from "../pages/PracticePageElements";

describe("User can open practice page and fill the elements", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.viewport(1920, 1080);
    cy.openLocalhost();
  });

  it("Verify that user can select option2 from dropdown", () => {
    PracticePageElements.elements.dropDownList().should("be.visible");
    PracticePageElements.selectOption2FromDropDown();
  });

  it("Verify that user can upload image", () => {
    PracticePageElements.elements.uploadImageButton().should("be.visible");
    PracticePageElements.uploadImage();
  });

  it("Verify that user can open new tab", () => {
    PracticePageElements.elements.openTabButton().should("be.visible");
    PracticePageElements.openNewTab();  
  });

  it("Verify that user can Invoke an alert", () => {
    PracticePageElements.elements.enterNameTextBox().should("be.visible");
    PracticePageElements.elements.alertButton().should("be.visible");
    PracticePageElements.invokeAlert();  
  });

  it("Verify that user can Invoke a confirmation modal", () => {
    PracticePageElements.elements.enterNameTextBox().should("be.visible");
    PracticePageElements.elements.confirmButton().should("be.visible");
    PracticePageElements.invokeConfirmationModal_withConfirm();  
    PracticePageElements.invokeConfirmationModal_withCancel();
  });

  it("Verify that user hide and show text", () => {
    PracticePageElements.elements.hideShowExample().should("be.visible");
    // hide the example
    PracticePageElements.hideTheInput();
    // show the example
    PracticePageElements.showTheInput();
  });

  it("Verify that user can do mouse hover on button", () => {
    PracticePageElements.elements.mouseHoverButton().should("be.visible");
    PracticePageElements.mouseHover();  
  });

  it("Verify that user can find start free trial button in iframe", () => {
    PracticePageElements.elements.iframeLocator().should("be.visible").should('not.be.empty')
    PracticePageElements.HandlingIframe(); 
  });
  
});
