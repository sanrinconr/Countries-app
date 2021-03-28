import { fireEvent, getByText, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import FormNuevaActividad from "./FormNuevaActividad"
describe('Nueva actividad', () => {
    test('Campos de formulario', () => {
        render(<MemoryRouter>
            <FormNuevaActividad />
        </MemoryRouter>);
        screen.getByText("Dificultad:")
        screen.getByText("Temporada:")
        screen.getByText("Paises")
    });
    test("Boton enviar", ()=>{
        render(<MemoryRouter>
            <FormNuevaActividad />
        </MemoryRouter>);
        screen.getByLabelText("boton-nueva-actividad")
    })
  });
