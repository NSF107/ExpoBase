/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */
import {
    Text as DefaultText,
    View as DefaultView,
    TextInput as DefaultTextInput,
    Pressable,
    PressableProps,
    StyleProp,
    ViewStyle,
} from "react-native";

import { useColorScheme } from "@/components/theme/useColorScheme";
import Colors from "@/constants/Colors";

type ThemeProps = {
    lightColor?: string;
    darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type TextInputProps = ThemeProps & DefaultTextInput["props"];
export type ButtonProps = ThemeProps &
    PressableProps & { style?: StyleProp<ViewStyle> };

/**
 * Function to get the theme color based on the color scheme to be used in the components
 * @param props
 * @param colorName
 * @returns
 */
export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
    const theme = useColorScheme() ?? "light";
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return Colors[theme][colorName];
    }
}

/**
 * Function to create a text with theme colors
 * @param props
 * @returns
 */
export function Text(props: TextProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

    return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

/**
 * Function to create a view with theme colors
 * @param props
 * @returns
 */
export function View(props: ViewProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        "background",
    );

    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

/**
 * Function to create a text input with theme colors
 * @param props
 * @returns
 */
export function TextInput(props: TextInputProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

    return <DefaultTextInput style={[{ color }, style]} {...otherProps} />;
}

/**
 * Function to create a button with theme colors and pressable effect
 * @param props
 * @returns
 */
export function Button(props: ButtonProps) {
    const {
        style,
        lightColor,
        darkColor,
        onPressIn,
        onPressOut,
        ...otherProps
    } = props;
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        "background",
    );

    return (
        <Pressable
            style={[{ backgroundColor }, style]}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            {...otherProps}
        />
    );
}
