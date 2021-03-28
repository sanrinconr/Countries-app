import { render, screen } from "@testing-library/react";
import App from "./App"
describe('true is truthy and false is falsy', () => {
    test('true is truthy', () => {
        render(<App />);
        //screen.debug();
    });
  });
