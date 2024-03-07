import { render } from '../utils/test-utils';
import { describe, it, expect } from 'vitest';
import Container from './Container';

describe('Container', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Container>
        <div>Test Children</div>
      </Container>,
    );
    expect(getByText('Test Children')).toBeInTheDocument();
  });

  it('renders additional className correctly', () => {
    const { container } = render(<Container className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
