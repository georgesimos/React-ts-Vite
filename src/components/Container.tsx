import React from 'react';
import { cn } from '../utils';

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('container m-auto px-6', className)}
      {...props}
    />
  );
});

export default Container;
