describe('App', () => {
  it('displays data correctly', () => {
    cy.visit('/');
    cy.contains('ALPHA').should('be.visible');
    cy.contains('BETA').should('be.visible');
  });

  it('displays error message correctly', () => {
    cy.intercept('GET', 'data/sampleData.json', {
      statusCode: 500,
      body: 'Failed to fetch data',
    });
    cy.visit('/');
    cy.contains('Error: Failed to fetch data').should('be.visible');
  });

  it('displays no data message correctly', () => {
    cy.intercept('GET', 'data/sampleData.json', {
      statusCode: 200,
      body: null,
    });
    cy.visit('/');
    cy.contains('No data available').should('be.visible');
  });
});

describe('Sorting', () => {
  it('sorts data by ticker', () => {
    cy.fixture('data.json').then((data) => {
      cy.intercept('GET', 'data/sampleData.json', {
        statusCode: 200,
        body: data,
      }).as('getData');
    });
    cy.visit('/');
    cy.wait('@getData');
    cy.get('th').contains('TICKER').click();
    cy.get('tr').eq(1).find('td').eq(0).should('contain', 'ZETA');
  });

  it('sorts data by price', () => {
    cy.fixture('data.json').then((data) => {
      cy.intercept('GET', 'data/sampleData.json', {
        statusCode: 200,
        body: data,
      }).as('getData');
    });
    cy.visit('/');
    cy.wait('@getData');
    cy.get('th').contains('PRICE').click();
    cy.get('tr').eq(1).find('td').eq(1).should('contain', '-2997.78');
  });

  it('sorts data by asset class', () => {
    cy.fixture('data.json').then((data) => {
      cy.intercept('GET', 'data/sampleData.json', {
        statusCode: 200,
        body: data,
      }).as('getData');
    });
    cy.visit('/');
    cy.wait('@getData');
    cy.get('th').contains('ASSET CLASS').click();
    cy.get('tr').eq(1).find('td').eq(2).should('contain', 'Equities');
  });
});
