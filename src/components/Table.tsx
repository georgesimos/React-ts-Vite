import React from 'react';
import { cn } from '../utils/utils';
import ChevronUpDownIcon from '../assets/chevron-up-down.svg';

const TableContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('relative w-full overflow-auto', className)}
      {...props}
    />
  );
});

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => {
  return (
    <table
      ref={ref}
      className={cn(
        'w-full table-auto border-collapse overflow-auto border text-sm',
        className,
      )}
      {...props}
    />
  );
});

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('text-muted-foreground mt-4 text-sm', className)}
    {...props}
  />
));

const TableHead = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ ...props }, ref) => <thead ref={ref} {...props} />);

const TableHeader = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, children, ...props }, ref) => (
  <th
    ref={ref}
    scope="col"
    className={cn(
      'sticky top-0 cursor-pointer bg-white p-4 uppercase transition-colors hover:bg-slate-100',
      className,
    )}
    {...props}
  >
    <div className="flex items-center gap-2">
      {children}
      <img src={ChevronUpDownIcon} alt="sort icon" />
    </div>
  </th>
));

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ ...props }, ref) => <tbody ref={ref} {...props} />);

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ ...props }, ref) => <tr ref={ref} {...props} />);

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('whitespace-nowrap px-6 py-4', className)}
    {...props}
  />
));

TableContainer.displayName = 'TableContainer';
Table.displayName = 'Table';
TableCaption.displayName = 'TableCaption';
TableHead.displayName = 'TableHead';
TableHeader.displayName = 'TableHeader';
TableBody.displayName = 'TableBody';
TableRow.displayName = 'TableRow';
TableCell.displayName = 'TableCell';

export {
  TableContainer,
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
};
