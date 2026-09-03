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
