import { render, fireEvent, screen } from '@testing-library/react';
import Navbar from './index';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

describe('Navbar', () => {
    it('should open and close the mobile menu', () => {
        render(<Navbar />);

        const menuButton = screen.getByRole('button', { name: 'open menu' });
        fireEvent.click(menuButton);

        const closeButton = screen.getByRole('button', { name: 'close menu' });
        expect(closeButton).toBeInTheDocument();

        fireEvent.click(closeButton);

        expect(screen.queryByRole('button', { name: 'close menu' })).not.toBeInTheDocument();
    });
});
