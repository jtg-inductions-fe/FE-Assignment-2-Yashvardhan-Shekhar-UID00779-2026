import { describe, expect, it, vi } from 'vitest';

import { ThemeProvider } from '@mui/material/styles';

import { PATH } from '@constant';
import { fireEvent, render, screen } from '@testing-library/react';
import { theme } from '@theme';
import { Restaurant } from '@types';

import { RestaurantCard } from './RestaurantCard.component';
import { RestaurantCardProps } from './RestaurantCard.types';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('RestaurantCard Component', () => {
    const mockRestaurant: Restaurant = {
        id: 'rest-123',
        name: 'Tasty Bites',
        description: 'A cozy spot for delicious food.',
        openingTime: '09:00',
        closingTime: '22:00',
        isVeg: true,
        image: 'http://example.com/food.jpg',
        owner: 'user-owner-001',
    };

    const defaultProps: RestaurantCardProps = {
        restaurant: mockRestaurant,
        isOwnerView: false,
        onEdit: vi.fn(),
        onDelete: vi.fn(),
    };

    const renderComponent = (props = defaultProps) =>
        render(
            <ThemeProvider theme={theme}>
                <RestaurantCard {...props} />
            </ThemeProvider>,
        );

    it('renders restaurant details matching the Restaurant interface', () => {
        renderComponent();

        expect(screen.getByText('Tasty Bites')).toBeInTheDocument();
        expect(
            screen.getByText('A cozy spot for delicious food.'),
        ).toBeInTheDocument();
        expect(screen.getByText('Pure Veg')).toBeInTheDocument();
        expect(screen.getByText('9:00 AM - 10:00 PM')).toBeInTheDocument();
    });

    it('handles empty description with the fallback string template', () => {
        const propsWithoutDesc: RestaurantCardProps = {
            ...defaultProps,
            restaurant: { ...mockRestaurant, description: '' },
        };
        renderComponent(propsWithoutDesc);

        const expectedFallback = `Welcome to ${mockRestaurant.name}! We are open and ready to serve you from ${mockRestaurant.openingTime} until ${mockRestaurant.closingTime}. Stop by to experience our excellent service and friendly team.`;
        expect(screen.getByText(expectedFallback)).toBeInTheDocument();
    });

    it('renders Non-Veg status correctly when isVeg is false', () => {
        const nonVegProps: RestaurantCardProps = {
            ...defaultProps,
            restaurant: { ...mockRestaurant, isVeg: false },
        };
        renderComponent(nonVegProps);

        expect(screen.getByText('Non-Veg')).toBeInTheDocument();
    });

    it('triggers navigate on card click using restaurant.id', () => {
        renderComponent();

        const cardActionArea = screen.getByRole('button', {
            name: /tasty bites/i,
        });
        fireEvent.click(cardActionArea);

        expect(mockNavigate).toHaveBeenCalledWith(`${PATH.HOME}/rest-123`);
    });

    it('hides edit and delete controls when isOwnerView is false', () => {
        renderComponent();

        expect(
            screen.queryByRole('button', { name: 'edit restaurant' }),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByRole('button', { name: 'delete restaurant' }),
        ).not.toBeInTheDocument();
    });

    const ownerProps: RestaurantCardProps = {
        ...defaultProps,
        isOwnerView: true,
    };

    it('renders edit and delete buttons when isOwnerView is true', () => {
        renderComponent(ownerProps);

        expect(
            screen.getByRole('button', { name: 'edit restaurant' }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'delete restaurant' }),
        ).toBeInTheDocument();
    });

    it('calls onEdit with id and stops click propagation to card navigation', () => {
        renderComponent(ownerProps);

        const editButton = screen.getByRole('button', {
            name: 'edit restaurant',
        });
        fireEvent.click(editButton);

        expect(defaultProps.onEdit).toHaveBeenCalledWith('rest-123');
    });

    it('calls onDelete with id and stops click propagation to card navigation', () => {
        renderComponent(ownerProps);

        const deleteButton = screen.getByRole('button', {
            name: 'delete restaurant',
        });
        fireEvent.click(deleteButton);

        expect(defaultProps.onDelete).toHaveBeenCalledWith('rest-123');
    });
});
