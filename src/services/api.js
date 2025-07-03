const API_BASE_URL = process.env.REACT_APP_AZURE_FUNCTION_URL;

export const saveScore = async (score) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        score: score.correctAnswers,
        time: score.time,
        date: new Date().toISOString(),
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save score');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving score:', error);
    throw error;
  }
};

export const getTopScores = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/scores`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch scores');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching scores:', error);
    throw error;
  }
}; 