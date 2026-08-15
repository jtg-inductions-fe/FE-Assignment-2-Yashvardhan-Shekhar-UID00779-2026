import { User } from '../types'; // Adjust path as needed

const MOCK_SIGNUP_USERS: (User & { password: string })[] = [
    {
        id: 'usr_101',
        email: 'alex.morgan@example.com',
        name: 'Alex Morgan',
        role: 'owner',
        password: '123456',
    },
    {
        id: 'usr_102',
        email: 'sarah.chen@example.com',
        name: 'Sarah Chen',
        role: 'customer',
        password: '123456',
    },
    {
        id: 'usr_103',
        email: 'marcus.vance@example.com',
        name: 'Marcus Vance',
        role: 'customer',
        password: '123456',
    },
    {
        id: 'usr_104',
        email: 'elena.rostova@example.com',
        name: 'Elena Rostov',
        role: 'owner',
        password: '123456',
    },
    {
        id: 'usr_105',
        email: 'david.kim@example.com',
        name: 'David Kim',
        role: 'owner',
        password: '123456',
    },
    {
        id: 'usr_106',
        email: 'priya.sharma@example.com',
        name: 'Priya Sharma',
        role: 'owner',
        password: '123456',
    },
    {
        id: 'usr_107',
        email: 'james.wilson@example.com',
        name: 'James Wilson',
        role: 'customer',
        password: '123456',
    },
    {
        id: 'usr_108',
        email: 'chloe.dubois@example.com',
        name: 'Chloe Dubois',
        role: 'owner',
        password: '123456',
    },
    {
        id: 'usr_109',
        email: 'tariq.almansoor@example.com',
        name: 'Sharma ji',
        role: 'customer',
        password: '123456',
    },
    {
        id: 'usr_110',
        email: 'emily.watson@example.com',
        name: 'Emily Watson',
        role: 'customer',
        password: '123456',
    },
];

const mockDataSetup = () => {
    if (!localStorage.getItem('allUsers'))
        localStorage.setItem('allUsers', JSON.stringify(MOCK_SIGNUP_USERS));
};

export default mockDataSetup;
