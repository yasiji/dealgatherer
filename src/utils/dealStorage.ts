interface Deal {
  id: string;
  name: string;
  price: number;
  retailer: string;
  link: string;
}

const STORAGE_KEY = 'deals';

export const dealStorage = {
  getDeals: (): Deal[] => {
    const deals = localStorage.getItem(STORAGE_KEY);
    return deals ? JSON.parse(deals) : [];
  },

  saveDeal: (deal: Omit<Deal, "id">): Deal => {
    const deals = dealStorage.getDeals();
    const newDeal = {
      ...deal,
      id: Math.random().toString(36).substr(2, 9),
    };
    deals.push(newDeal);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
    return newDeal;
  },

  updateDeal: (id: string, updatedDeal: Omit<Deal, "id">): Deal => {
    const deals = dealStorage.getDeals();
    const index = deals.findIndex((deal) => deal.id === id);
    if (index === -1) throw new Error('Deal not found');
    
    const newDeal = { ...updatedDeal, id };
    deals[index] = newDeal;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
    return newDeal;
  },

  deleteDeal: (id: string): void => {
    const deals = dealStorage.getDeals();
    const filteredDeals = deals.filter((deal) => deal.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredDeals));
  },
};