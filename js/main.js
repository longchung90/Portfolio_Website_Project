// =======================
// Contact Form Demo Script
// =======================

// Prevent page reload and show a confirmation alert
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Thank you! Your message has been sent.");
        });
    }

    // Initialize hobby interactions
    initHobbyInteractions();
});

// =======================
// Hobby Section Interactions
// =======================

function initHobbyInteractions() {
    // Plant click events
    document.querySelectorAll('.plant-item').forEach(item => {
        item.addEventListener('click', showPlantInfo);
    });

    // Recipe click events
    document.querySelectorAll('.recipe-item').forEach(item => {
        item.addEventListener('click', showRecipeInfo);
    });

    // Travel click events
    document.querySelectorAll('.travel-item').forEach(item => {
        item.addEventListener('click', showTravelInfo);
    });
}

function showPlantInfo(event) {
    const plantName = event.currentTarget.dataset.plant;
    const plantInfo = event.currentTarget.dataset.info;

    alert(`🌱 ${plantName}\n\n${plantInfo}\n\nClick OK to continue exploring!`);
}

function showRecipeInfo(event) {
    const recipeName = event.currentTarget.dataset.recipe;
    const recipes = {
        'Vietnamese Spring Rolls': 'Fresh spring rolls with prawns, herbs, and rice noodles wrapped in rice paper. Served with peanut dipping sauce.',
        'Traditional Vietnamese Dish': 'A traditional Vietnamese delicacy with rich flavors and aromatic herbs.',
        'Fresh Rice Paper Rolls': 'Light and healthy rolls filled with fresh vegetables, herbs, and your choice of protein.'
    };

    const recipe = recipes[recipeName] || 'A delicious Vietnamese dish made with love and traditional techniques.';
    alert(`🍳 ${recipeName}\n\n${recipe}\n\nWould you like to try making this?`);
}

function showTravelInfo(event) {
    const location = event.currentTarget.dataset.location;
    const description = event.currentTarget.dataset.description;

    alert(`🚗 ${location}\n\n${description}\n\nWhat an amazing adventure!`);
}

// Plant Quiz Game
function startPlantQuiz() {
    const plants = [
        { name: 'Rose', hint: 'Symbol of love with thorny stems' },
        { name: 'Lavender', hint: 'Purple flowers with calming fragrance' },
        { name: 'Iris', hint: 'Named after the rainbow goddess' },
        { name: 'Passionfruit', hint: 'Tropical vine with exotic fruits' }
    ];

    const randomPlant = plants[Math.floor(Math.random() * plants.length)];
    const userAnswer = prompt(`🌱 Plant Quiz Time!\n\nHint: ${randomPlant.hint}\n\nWhat plant am I thinking of?`);

    if (userAnswer && userAnswer.toLowerCase() === randomPlant.name.toLowerCase()) {
        alert(`🎉 Correct! It's a ${randomPlant.name}!\n\nYou have a green thumb! 🌿`);
    } else {
        alert(`🤔 Close, but it was a ${randomPlant.name}!\n\nKeep exploring the garden to learn more! 🌻`);
    }
}

// Modal functionality
function openModal(imageSrc, caption) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');

    modal.style.display = 'block';
    modalImg.src = imageSrc;
    modalCaption.innerHTML = caption;
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Close modal when clicking outside the image
window.onclick = function (event) {
    const modal = document.getElementById('imageModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST endpoint for contact form
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    // Set up your email transporter (using Gmail example)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youremail@gmail.com',
            pass: 'your-app-password-here'
        }
    });

    const mailOptions = {
        from: email,
        to: 'youremail@gmail.com',
        subject: `Portfolio Contact Form: Message from ${name}`,
        text: `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to send message' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});