import Home from '@/app/page';
import { render, screen } from '@testing-library/react';
import axios from 'axios';

describe('Page', () => {
  it('renders a heading', async () => {
    const { data } = await axios.get<{ hello: string }>('/resource');
    console.log('🚀 ~ it ~ data:', data);

    render(<Home />);

    const headings = screen.getAllByRole('heading', { level: 2 });

    for (const heading of headings) {
      expect(heading).toBeInTheDocument();
    }
  });
});
