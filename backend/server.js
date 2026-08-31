const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Файл для хранения данных
const DATA_FILE = path.join(__dirname, 'surveys.json');

// Функция для чтения данных
function readSurveys() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Ошибка чтения файла:', error);
    }
    return [];
}

// Функция для записи данных
function writeSurveys(surveys) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(surveys, null, 2));
}

// API для сохранения результатов опроса
app.post('/api/surveys', (req, res) => {
    const survey = req.body;
    
    // Читаем существующие опросы
    const surveys = readSurveys();
    
    // Добавляем новый опрос
    surveys.push(survey);
    
    // Сохраняем
    writeSurveys(surveys);
    
    res.json({ success: true, message: 'Опрос сохранен' });
});

// API для получения всех результатов
app.get('/api/surveys', (req, res) => {
    const surveys = readSurveys();
    res.json(surveys);
});

// API для получения статистики
app.get('/api/statistics', (req, res) => {
    const surveys = readSurveys();
    
    const statistics = {
        totalSurveys: surveys.length,
        averageScore: 0,
        factorsAverage: {},
        dangerZones: []
    };
    
    if (surveys.length > 0) {
        const totalScores = surveys.map(s => parseFloat(s.averageScore));
        statistics.averageScore = (totalScores.reduce((a, b) => a + b, 0) / surveys.length).toFixed(1);
    }
    
    res.json(statistics);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});