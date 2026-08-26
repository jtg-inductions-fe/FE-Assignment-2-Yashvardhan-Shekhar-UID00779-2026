import mockUsers from '@data/Users.json';

export const mockDataSetup = () => {
    if (!localStorage.getItem('allUsers')) {
        localStorage.setItem('allUsers', JSON.stringify(mockUsers));
    }
};
