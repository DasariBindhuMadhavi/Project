function searchRecipes() {
  const query = document.getElementById('searchInput').value.trim();
  const resultsDiv = document.getElementById('results');

  if (!query) {
    resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
    return;
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      if (!data.meals) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
      }

      resultsDiv.innerHTML = '';
      data.meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal';
        mealDiv.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <h3>${meal.strMeal}</h3>
          <p><strong>Category:</strong> ${meal.strCategory}</p>
        `;
        resultsDiv.appendChild(mealDiv);
      });
    })
    .catch(() => {
      resultsDiv.innerHTML = '<p>Something went wrong. Try again later.</p>';
    });
}
