const imageName = "image.jpg";

class PracticePageElements {
  
  elements = {
    dropDownList: () => cy.get("#dropdown-class-example"),
    uploadImageButton: ()=>  cy.get('input[type="file"]'),
    uploadedImage: ()=> cy.get('.image-upload-wrapper'),
    openTabButton: ()=> cy.get("#opentab"),
    enterNameTextBox: ()=> cy.get('#name'),
    alertButton: ()=> cy.get('#alertbtn'),
    confirmButton: ()=> cy.get('#confirmbtn'),
    hideButton: ()=> cy.get("#hide-textbox"),
    showButton: ()=> cy.get("#show-textbox"),
    hideShowExample: ()=> cy.get("#displayed-text"),
    mouseHoverButton: ()=> cy.get('.hover-container .hover-btn'),
    mouseHover_TopOption: ()=> cy.contains('a', 'Top'),
    mouseHover_ReloadOption: ()=> cy.contains('a', 'Reload'),
    iframeLocator: ()=> cy.get("#courses-iframe"),
  };

  selectOption2FromDropDown() {
    this.elements.dropDownList().select('option2');
    this.elements.dropDownList().should('have.value', 'option2');
  }

  uploadImage(){
    this.elements.uploadImageButton().attachFile(imageName);
   }

  openNewTab(){
    cy.window().then((win) => {
      cy.stub(win, "open")
        .callsFake((url) => {
          return win.open.wrappedMethod.call(win, url, "_self");
        })
        .as("open");
    });
    this.elements.openTabButton().click({timeout:1000})
    cy.get("@open").should(
      "have.been.calledWithMatch",
      "https://easygenerator.com"
    );
  }

  invokeAlert(){
    this.elements.enterNameTextBox().type("Monica");
    this.elements.alertButton().click({timeout:1000});
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Hello Monica, share this practice page and share your knowledge');
    });
  };
  
  invokeConfirmationModal_withConfirm(){
    this.elements.enterNameTextBox().type("Monica");
    this.elements.confirmButton().click({timeout:1000});
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Hello Monica, Are you sure you want to confirm?');
      return true; 
    });
  };

  invokeConfirmationModal_withCancel(){
    this.elements.enterNameTextBox().type("Monica");
    this.elements.confirmButton().click({timeout:1000});
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Hello Monica, Are you sure you want to confirm?');
      return false;
    });
  };

  hideTheInput(){
    this.elements.hideButton().click({timeout:1000});
    this.elements.hideShowExample().should("not.be.visible");
   }

   showTheInput(){
    this.elements.showButton().click({timeout:1000});
    this.elements.hideShowExample().should("be.visible");
   }

   mouseHover(){
    this.elements.mouseHoverButton().trigger('mouseover');
    this.elements.mouseHover_TopOption().should('be.visible');
    this.elements.mouseHover_ReloadOption().should('be.visible');
   }

   HandlingIframe(){
    // Intercept request to the iframe and mock the responce 
    cy.intercept('GET', 'https://www.easygenerator.com/', {
      statusCode: 200,
      body: '<html><body><input placeholder="Enter your business email"</div></body></html>',
    }).as('iframeRequest')
    // visit the page contains the iframe
    cy.visit('https://www.easygenerator.com/'), () => {
    // Select the iframe and type email inside the textbox
    cy.iframe('#courses-iframe').then(iframe => {
      iframe.find('placeholder="Enter your business email"').type("monica@gmail.com")
      iframe.find('placeholder="Enter your business email"').should('have.value', 'monica@gmail.com')
    })}
   }

}


module.exports = new PracticePageElements();
