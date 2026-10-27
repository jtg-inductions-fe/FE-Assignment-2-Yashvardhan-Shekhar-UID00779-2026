import { Coupon } from '@types';

export type CouponDialogProps = {
    isOpen: boolean;
    handleClose: () => void;
    restaurantId: string;
    openEditMenuOfCoupon: (coupon: Coupon) => void;
};
