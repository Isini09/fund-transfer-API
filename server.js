const app = require('./backend/app');

//Set port from environment or default to 5000
const port = process.env.PORT || 5000;

//Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
        
    })