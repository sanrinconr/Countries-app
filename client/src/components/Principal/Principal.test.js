import { fireEvent, getByText, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Principal from "./Principal"
describe('Principal', () => {
    test('Existe boton empezar', () => {
        //https://reactrouter.com/web/guides/testing
        render(<MemoryRouter>
            <Principal />
        </MemoryRouter>);
        screen.getByText("¡Empezar!")
        // expect().toBeInTheDocument()

    });
  });
