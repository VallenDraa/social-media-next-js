import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('Page', () => {
  it('renders a heading', () => {
    render(<Home />);

    const headings = screen.getAllByRole('heading', { level: 2 });

    for (const heading of headings) {
      expect(heading).toBeInTheDocument();
    }
  });
});
