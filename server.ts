const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  // Check if the required parameters are missing
  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  // Check if the input values are of the correct type
  if (!Array.isArray(daily_exercises) || typeof target !== 'number') {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  // Perform the necessary calculations for the response
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter(d => d > 0).length;
  const average = daily_exercises.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  let rating = 0;
  let ratingDescription = '';
  if (average >= target + 0.5) {
    rating = 3;
    ratingDescription = 'good';
  } else if (average >= target) {
    rating = 2;
    ratingDescription = 'not too bad';
  } else {
    rating = 1;
    ratingDescription = 'bad';
  }

  // Return the response
  res.json({
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
