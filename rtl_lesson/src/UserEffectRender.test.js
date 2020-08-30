import React from "react";
import { render, screen } from "@testing-library/react";
import UserEffectRender from "./UseEffectRender";

describe("useEffect rendering", () => {
    it("Should render only after async function resolved", async () => {
        render(<UserEffectRender />);
        expect(screen.queryByText(/I am/)).toBeNull();
        expect(await screen.findByText(/I am/)).toBeInTheDocument();
    }
    )
})