import { OrderStatus, User } from '@types';

export type AccessTokenResponse = {
    access_token: string;
    token_type: string;
};

export type UserDetailsResponse = User & {
    address: string | null;
    city: string | null;
    state: string | null;
    contact_number: string | null;
};

export type SignupType = {
    name: string;
    email: string;
    password: string;
    role: 'owner' | 'customer';
    address?: string | null;
    city?: string | null;
    state?: string | null;
    contact_number?: string | null;
};

export type LoginType = {
    email: string;
    password: string;
};

export type MenuItemApiResponse = {
    id: string;
    dish_name: string;
    description: string | null;
    price: string;
    stock: number;
    is_veg: boolean;
    image_url: string | null;
    category: string;
    is_available: boolean;
};

export type RestaurantDetailsApiResponse = {
    id: string;
    name: string;
    description: string;
    address: string | null;
    city: string | null;
    state: string | null;
    is_veg: boolean;
    opening_time: string;
    closing_time: string;
    image: string | null;
    menu: MenuItemApiResponse[];
};

export type OrderApiResponse = {
    id: string;
    user_id: string;
    restaurant_id: string;
    booking_fee: string;
    coupon_applied_id: string | null;
    status: OrderStatus;
    created_at: string;
    subtotal: string;
    discount: string;
    grand_total: string;
    items: {
        id: string;
        menu_item_id: string;
        dish_name: string;
        quantity: number;
        price: string;
        line_total: string;
    }[];
};

export type OrderListApiResponse = {
    items: OrderApiResponse[];
    total: number;
    current_page: string | null;
    current_page_backwards: string | null;
    previous_page: string | null;
    next_page: string | null;
};

export type CheckoutPreviewResponse = {
    restaurant_id: string;
    items: OrderApiResponse[];
    subtotal: number;
    booking_fee: number;
    discount: number;
    grand_total: number;
};
