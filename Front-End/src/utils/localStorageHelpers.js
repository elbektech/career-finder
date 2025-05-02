const FAVORITES_KEY = 'favoriteCareers';

export const getFavorites = () => {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveFavorite = (career) => {
  const current = getFavorites();
  if (!current.find(c => c.id === career.id)) {
    current.push(career);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(current));
  }
};

export const removeFavorite = (id) => {
  const current = getFavorites().filter(c => c.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(current));
};

export const isFavorite = (id) => {
  return getFavorites().some(c => c.id === id);
};
