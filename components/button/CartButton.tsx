import React from "react";
import {ShoppingCart} from "lucide-react";
import Link from "next/link";
import {Badge} from "@mantine/core";
import {cn} from "@/lib/tw";
import {useCartCount} from "@/store/cartStore";


export type CartButtonProps = {
  className?: string;
}

const CartButton: React.FC<CartButtonProps> = (props) => {
  const count = useCartCount()

  return (
    <Link className={cn("tw-relative", props.className)} href={'/cart'}>
      {(count > 0) && <Badge
        size="sm" circle
        className="tw-absolute tw-top-[-10px] tw-right-[-12px]">
        {count}
      </Badge>}
      <ShoppingCart/>
    </Link>
  );
}

export default CartButton;
