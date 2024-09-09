describe('API Testing with Cypress', () => {
  it('should fetch all tasks', () => {
    cy.request('GET', 'http://localhost:3000/api/task/')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('items');
        expect(response.body.items).to.be.an('array');
      });
  });

  it('should create a new task', () => {
    cy.request('POST', 'http://localhost:3000/api/task/', {
      title: 'New Task',
      description: 'Description of the new task',
      assignedMember: 'John Doe',
      priority:'Critical'
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('_id');
      expect(response.body.title).to.eq('New Task');
    });
  });

  it('should update a task', () => {
    const taskId = '66ddda9c4db999c2a86cf323';
    cy.request('PUT', `http://localhost:3000/api/task/update/${taskId}`, {
      description: 'Hello New Task Updated Task Title',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq('Updated Task Title');
    });
  });
  
  it('should get by id', () => {
    const taskId = '66ddda9c4db999c2a86cf323';
    cy.request('GET', `http://localhost:3000/api/task/${taskId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq('Updated Task Title');
    });
  });
});
