const calculateExercise = (dailyExercises: Array<number>, target: number): any => {
    const periodLength = dailyExercises.length;
    const trainingDays = dailyExercises.filter(val => val !== 0).length;
    const average = dailyExercises.reduce((a, b) => a + b) / periodLength;
    const success = average >= target;
  
    let rating = 0;
    let ratingDescription = '';
    if (average / target >= 2) {
      rating = 3;
      ratingDescription = 'good';
    } else if (average / target >= 1) {
      rating = 2;
      ratingDescription = 'not too bad';
    } else {
      rating = 1;
      ratingDescription = 'bad';
    }
  
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average
    };
  };
  
  export default calculateExercise;
  