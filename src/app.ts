import express       from 'express'
import router from './router/getChat';
import webhook from './router/webhook';


const app = express().use(express.json());

app.use(webhook);
app.use('/api', router);



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

