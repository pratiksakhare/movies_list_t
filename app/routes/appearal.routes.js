module.exports = function(app) {

    var appearal = require('../controllers/appearal.controller.js');

    // Create a new Note
    app.post('/appearals', appearal.create);

    // Retrieve all Notes
    app.get('/appearal', appearal.findAll);

    // Retrieve a single Note with noteId
    app.get('/appearal/:size/:quality', appearal.find);

    // Retrieve a single Note with noteId
    app.get('/appearal/cheap/:size/:quality', appearal.findCheap);

    // Update a Note with noteId
    app.put('/appearal/:code/:size', appearal.update);

    // Update a Note with noteId
    app.put('/appearal/updateMany', appearal.updateMany);

    // Delete a Note with noteId
    app.delete('/appearal/:appearalId', appearal.delete);
}