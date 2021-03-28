import '@testing-library/jest-dom/extend-expect';

const { render, screen } = require("@testing-library/react");
const { MemoryRouter } = require("react-router");
const { default: CardPais } = require("./CardPais");

describe('Card pais', () => {
    test('Debe tener una imagen, el link de colombia', () => {
        render(<MemoryRouter>
            <CardPais id="COL" nombre="Colombia" continente="South America" bandera="https://restcountries.eu/data/col.svg" />
        </MemoryRouter>);
        const logo = screen.getByRole('img');
        expect(logo).toHaveAttribute('src', 'https://restcountries.eu/data/col.svg');       
        
    });
    test('Debe tener el nombre del pais', () => {
        render(<MemoryRouter>
            <CardPais id="COL" nombre="Colombia" continente="South America" bandera="https://restcountries.eu/data/col.svg" />
        </MemoryRouter>);
        screen.getByText("Colombia (COL)"); 
    });
    test('Debe tener el nombre del continente', () => {
        render(<MemoryRouter>
            <CardPais id="COL" nombre="Colombia" continente="South America" bandera="https://restcountries.eu/data/col.svg" />
        </MemoryRouter>);
        screen.getByText("South America"); 
    });
  });