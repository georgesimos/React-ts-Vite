import React from 'react';
import { cn } from '../utils/utils';

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

Container.displayName = 'Container';

export default Container;
