import '@testing-library/jest-dom/extend-expect';
import NavBar from "./NavBar"
const { render, screen } = require("@testing-library/react");
const { MemoryRouter } = require("react-router");


describe('NavBar', () => {
    test('Titulo', () => {
        render(<MemoryRouter>
            <NavBar/>
        </MemoryRouter>);
        screen.getByText("Paises"); 
    });
    test('Debe tener un home', () => {
        render(<MemoryRouter>
            <NavBar/>
        </MemoryRouter>);
        screen.getByText("Home"); 
    });
    test('Debe tener una nueva actividad', () => {
        render(<MemoryRouter>
            <NavBar/>
        </MemoryRouter>);
        screen.getByText("Nueva actividad"); 
    });
  });