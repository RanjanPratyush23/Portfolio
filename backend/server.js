const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Use the PORT from Render or fallback to 5000 for local development
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://pratyushranjan23:_MwM5.Ga%256_w%23r3@cluster1.cczbwru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define schema and model
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});
const Contact = mongoose.model('Contact', ContactSchema);

// Handle form submission
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const newMessage = new Contact({ name, email, message });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});
// ✅ NEW: Handle GET request to fetch all submissions
app.get('/submissions', async (req, res) => {
    try {
        const submissions = await Contact.find();
        res.status(200).json(submissions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch submissions' });
    }
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
