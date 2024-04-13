import * as React from "react";
import renderer from "react-test-renderer";
import { MonoText } from "@/components/StyledText";

it('has correct style', () => {
    const styledText = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();

    expect(styledText).toMatchSnapshot();
});
