import { describe, it, expect } from 'vitest';
import { render, screen } from '../utils/test-utils';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';

describe('Table', () => {
  it('renders children correctly', () => {
    render(
      <TableContainer className="my-5 max-h-screen">
        <Table>
          <TableCaption className="my-4">
            Description
            <p className="mt-1 text-sm font-normal text-gray-400">
              A single page application that represents a table of financial
              instruments.
            </p>
          </TableCaption>
          <TableHead>
            <TableRow>
              <TableHeader>Header 1</TableHeader>
              <TableHeader>Header 2</TableHeader>
              <TableHeader>Header 3</TableHeader>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>Row 1 - Cell 1</TableCell>
              <TableCell>Row 1 - Cell 2</TableCell>
              <TableCell>Row 1 - Cell 3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Row 2 - Cell 1</TableCell>
              <TableCell>Row 2 - Cell 2</TableCell>
              <TableCell>Row 2 - Cell 3</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>,
    );

    expect(screen.getByText('Description')).toBeInTheDocument();

    expect(screen.getByText('Header 1')).toBeInTheDocument();

    expect(screen.getByText('Row 1 - Cell 1')).toBeInTheDocument();
  });

  it('renders additional className correctly', () => {
    const { container } = render(<Table className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
