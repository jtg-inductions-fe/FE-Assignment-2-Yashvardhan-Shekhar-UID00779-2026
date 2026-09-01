/** Represents restaurant details.  */
export type Restaurant = {
    /** unique id of the restaurant */
    id: string;
    /** name of the restaurant */
    name: string;
    /** description of the restaurant */
    description: string;
    /** opening time of the restaurant */
    openingTime: string;
    /** closing time of the restaurant */
    closingTime: string;
    /** whether the restaurant is vegetarian */
    isVeg: boolean;
    /** image of the restaurant */
    image: string;
    /** owner of the restaurant */
    owner: string;
};

/**
 * fields in the menuItem
 * @type {
 *     id: string;
 *     name: string;
 *     description: string;
 *     price: number;
 *     stock: number;
 *     image: string;
 * };
 */
export type MenuItem = {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
};

/**
 * all details of the restaurant
 * @type Restaurant & {
 *     menu: MenuItem[];
 * };
 */
export type RestaurantDetails = Restaurant & {
    menu: MenuItem[];
};
