import mockUsers from '@data/mockUsers.json';

export const mockDataSetup = () => {
    if (!localStorage.getItem('allUsers')) {
        localStorage.setItem('allUsers', JSON.stringify(mockUsers));
    }
};
