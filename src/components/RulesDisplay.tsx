import { Rule } from "../types.ts";
import { Card, CardBody, useColorMode } from "@chakra-ui/react";


type RulesDisplayProps = {
    key: number;
    item: Rule;
}

const RulesDisplay = ({item}: RulesDisplayProps) => {

    const {colorMode} = useColorMode();



    return (
        <Card
            background={colorMode === 'dark' ? 'brand.700' : 'brand.100'}
            color={colorMode === 'dark' ? '#efefef' : '#000000'}
            marginBottom={4}
        >
            <CardBody>
                <p>If the displayed number is divisible by {item.divisor}, then enter '{item.text}' in the field.</p>
            </CardBody>
        </Card>
    );
};

export default RulesDisplay;