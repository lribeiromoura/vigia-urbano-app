import { Button, IButtonProps, Text } from "native-base";

type ButtonComponentProps = IButtonProps & {
    title: string;
    contrast?: boolean;
}

export function ButtonComponent({ title , contrast ,...props }: ButtonComponentProps) {
    const lightColor = '#FDFDFD';
    const darkColor = '#3E63DD';
    
    return (
        <Button 
            w="full"
            h={16}
            bg={contrast ? lightColor : darkColor}
            _pressed={{
                bgColor: contrast ? lightColor : darkColor,
                opacity: 0.9
            }}
            borderColor={darkColor}
            borderWidth="1"
            {...props} >
                <Text 
                    color={contrast ? darkColor : lightColor} 
                    fontSize="md">
                    { title }
                </Text>
        </Button>
    )
}
