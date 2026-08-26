import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem } from '@types';

interface MenuState {
    menuItems: MenuItem[];
}

const initialState: MenuState = {
    menuItems: [],
};

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        // Populates the store with initial menu item data
        setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
            state.menuItems = action.payload;
        },
        // Appends a new item to the store
        addMenuItem: (state, action: PayloadAction<MenuItem>) => {
            state.menuItems.push(action.payload);
        },
        // Replaces an existing item by ID
        updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
            const index = state.menuItems.findIndex(
                (item) => item.id === action.payload.id,
            );
            if (index !== -1) {
                state.menuItems[index] = action.payload;
            }
        },
        // Filters out an item by ID
        removeMenuItem: (state, action: PayloadAction<string>) => {
            state.menuItems = state.menuItems.filter(
                (item) => item.id !== action.payload,
            );
        },
    },
});

export const { setMenuItems, addMenuItem, updateMenuItem, removeMenuItem } =
    menuSlice.actions;

export default menuSlice.reducer;
