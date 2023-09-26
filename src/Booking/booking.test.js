import { fireEvent, render, screen, act, findByText, getByRole, waitFor, getByTestId, getByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Booking from './booking';
import '@testing-library/jest-dom/extend-expect';
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

afterEach(() => {
    jest.restoreAllMocks();
});

test('renders the landing page', async () => {
    render(<Booking />);

    expect(screen.getByTestId("name"));
    expect(screen.getByTestId("email"));
    expect(screen.getByTestId("country"));
    expect(screen.getByTestId("no.of travellers"));
    expect(screen.getByTestId("amount"));

    //Name
    const Name = screen.getByLabelText(/name/i)
    userEvent.type(Name, 'agent1')
    expect(Name).toHaveValue('agent1');

    //Email
    const Email = screen.getByLabelText(/email/i)
    userEvent.type(Email, 'agent1@gmail.com')
    expect(Email).toHaveValue('agent1@gmail.com');

    //Country
    userEvent.click(getByRole(screen.getByTestId("country"), "button"));
    await waitFor(() => userEvent.click(screen.getByText(/India/i)));
    expect(screen.getByTestId("country")).toHaveTextContent(/India/i);

    //Number of Travellers
    const NumberOfTravellers  = screen.getByTestId('no.of travellers').querySelector('input')
    expect(NumberOfTravellers ).toBeInTheDocument()

    fireEvent.change(NumberOfTravellers , {target: { value: 2}});
    expect(NumberOfTravellers.value).toBe('2');

    //amount
    const Amount  = screen.getByTestId('amount').querySelector('input')
    expect(Amount ).toBeInTheDocument()
    expect(Amount.value).toBe("200");

    //Booking Details Save
    expect(screen.getByTestId("booking-save"));
    act(() => {
    userEvent.click(screen.getByTestId("booking-save"));
    });
});
test('Booking Validation', async () => {
    render(<Booking />);

    expect(screen.getByTestId("name"));
    expect(screen.getByTestId("email"));
    expect(screen.getByTestId("country"));
    expect(screen.getByTestId("no.of travellers"));
    expect(screen.getByTestId("amount"));

    //Name
    const Name = screen.getByLabelText(/name/i)
    userEvent.type(Name, '')
    expect(Name).toHaveValue('');

    //Email
    const Email = screen.getByLabelText(/email/i)
    userEvent.type(Email, '')
    expect(Email).toHaveValue('');

    //Number of Travellers
    const NumberOfTravellers  = screen.getByTestId('no.of travellers').querySelector('input')
    expect(NumberOfTravellers ).toBeInTheDocument()

    fireEvent.change(NumberOfTravellers , {target: { value: ''}});
    expect(NumberOfTravellers.value).toBe('');

    //amount
    const Amount  = screen.getByTestId('amount').querySelector('input')
    expect(Amount).toBeInTheDocument()
    expect(Amount.value).toBe("0");

    // //Booking Details Save button
    expect(screen.getByTestId("booking-save"));
    act(() => {
    userEvent.click(screen.getByTestId("booking-save"));
    });

});