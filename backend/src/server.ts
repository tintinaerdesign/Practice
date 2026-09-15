import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {

    res.json({ message: 'POS Backend is running', });

    });
app.post('/orders', (req, res) => {
    const order = req.body;

    console.log('Receive order:', order);

    res.json({ message: 'Order received', order, });

    });

const PORT = 3000;

app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });