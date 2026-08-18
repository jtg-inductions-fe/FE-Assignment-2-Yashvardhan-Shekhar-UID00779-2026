import mockUsers from '@data/mockUsers.json';

const mockDataSetup = (): void => {
    if (!localStorage.getItem('allUsers')) {
        localStorage.setItem('allUsers', JSON.stringify(mockUsers));
    }
};

export { mockDataSetup };
