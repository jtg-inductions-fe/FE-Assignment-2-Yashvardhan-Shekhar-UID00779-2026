import { Coupon } from '@types';

export type CouponDialogFormProps = {
    restaurantId: string;
    coupon: Coupon;
    isOpen: boolean;
    isProcessing: boolean;
    handleClose: () => void;
};

export type CouponReq = Omit<Coupon, 'is_active'> & {
    state: string;
};
