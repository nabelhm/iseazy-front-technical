import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CitySelector } from '../../src/components/CitySelector';
import { CityProvider } from '../../src/context/CityProvider';

// Mock de react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const renderWithProvider = (component: React.ReactElement) => {
  return render(<CityProvider>{component}</CityProvider>);
};

describe('CitySelector Component', () => {
  it('should render all three city buttons', () => {
    renderWithProvider(<CitySelector />);
    
    const londonButton = screen.getByText('london');
    const torontoButton = screen.getByText('toronto');
    const singaporeButton = screen.getByText('singapore');
    
    expect(londonButton).toBeDefined();
    expect(torontoButton).toBeDefined();
    expect(singaporeButton).toBeDefined();
  });

  it('should render the select city label', () => {
    renderWithProvider(<CitySelector />);
    
    const label = screen.getByText('selectCity');
    expect(label).toBeDefined();
  });

  it('should allow clicking on city buttons without errors', () => {
    renderWithProvider(<CitySelector />);
    
    const torontoButton = screen.getByText('toronto').closest('button');
    
    expect(torontoButton).toBeDefined();
    
    expect(() => {
      if (torontoButton) {
        fireEvent.click(torontoButton);
      }
    }).not.toThrow();
  });

  it('should keep buttons in document after clicking', () => {
    renderWithProvider(<CitySelector />);
    
    const singaporeButton = screen.getByText('singapore').closest('button');
    
    if (singaporeButton) {
      fireEvent.click(singaporeButton);
    }
    
    expect(screen.getByText('london')).toBeDefined();
    expect(screen.getByText('toronto')).toBeDefined();
    expect(screen.getByText('singapore')).toBeDefined();
  });
});