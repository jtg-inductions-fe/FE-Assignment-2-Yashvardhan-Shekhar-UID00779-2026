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
    /** owner if present */
    owner?: string;
};

/**fields in the menuItem */
export type MenuItem = {
    /**unique id of the menuItem */
    id: string;
    /**name of the menuItem */
    name: string;
    /**description of the menuItem */
    description: string;
    /**listed price of the menuItem */
    price: number;
    /**total quantity of the menu present */
    stock: number;
    /**url link of the menuItem */
    image: string;
};

/** all details of the restaurant */
export type RestaurantDetails = Restaurant & {
    /**menu list */
    menu: MenuItem[];
};

export type Coupon = {
    code: string,
    id: string,
    percentage: number,
    is_active: boolean,
}
