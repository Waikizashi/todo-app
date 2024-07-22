import express from 'express'
import todoRoutes from './routes/TodoRoutes.js'
import cors from 'cors'

const app = express();
const PORT = 5443;

app.use(cors());
app.use(express.json());
app.use('/api/todo', todoRoutes);

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
