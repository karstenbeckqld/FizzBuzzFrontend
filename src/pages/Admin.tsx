import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Switch,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorMode,
    useToast
} from '@chakra-ui/react';
import { Rule } from "@/types.ts";
import { withMessageFailureToast, withMessageSuccessToast } from "@/utils/toastTypes.ts";

const Admin = () => {

    const {colorMode} = useColorMode();
    const toast = useToast();

    const [rules, setRules] = useState<Rule[]>([]);
    const [newDivisor, setNewDivisor] = useState('');
    const [newText, setNewText] = useState('');

    // Here we set the colors for the input field of the form.
    const inputFieldBackground = colorMode === 'dark' ? 'brand.600' : 'brand.300';
    const inputFieldText = colorMode === 'dark' ? 'brand.100' : 'brand.900';

    useEffect(() => {
        getRules()
            .then(res => console.log("Fetching rules: ", res));
    }, []);

    const getRules = async () => {
        const response = await axios.get<Rule[]>('http://localhost:5165/api/rules');
        setRules(response.data);
    };

    const addRule = async () => {
        await axios.post('http://localhost:5165/api/rules', {
            divisor: Number(newDivisor),
            text: newText,
            isActive: true
        }).then().catch(error => {
            console.log(error);
            toast(withMessageFailureToast(error.response.data));
        });
        await getRules();
        setNewDivisor('');
        setNewText('');
    };

    const updateRule = async (id: number, updatedRule: Rule) => {
        await axios.put(`http://localhost:5165/api/rules/${id}`, updatedRule);
        await getRules();
    };

    const deleteRule = async (id: number) => {
        await axios.delete(`http://localhost:5165/api/rules/${id}`)
            .then((response)=>{
                console.log(response);
                toast(withMessageSuccessToast("Rule Deleted"))
            })
            .catch((error)=>{
                console.error(error);
                toast(withMessageFailureToast(error.response.data));
            });
        await getRules();


    };

    const updateLocalRule = (id: number, updates: Partial<Rule>) => {
        setRules(rules.map(rule =>
            rule.id === id
                ? {...rule, ...updates}
                : rule))
    }

    return (
        <Box p = {4}>
      <Heading className = 'headingStyle'>Admin Portal</Heading>
      <FormControl marginBottom = {8}>
          <FormLabel
              color = '#d36e6e'
              fontSize = '2xl'
              marginBottom = {8}
          >
              Add New Rule
          </FormLabel>
          <Input
              placeholder = "Divisor"
              value = {newDivisor}
              onChange = {(e) => setNewDivisor(e.target.value)}
              backgroundColor = {inputFieldBackground}
              _placeholder = {{color: inputFieldText}}
              marginBottom = '20px'
          />
          <Input
              placeholder = "Text"
              value = {newText}
              onChange = {(e) => setNewText(e.target.value)}
              backgroundColor = {inputFieldBackground}
              _placeholder = {{color: inputFieldText}}
              marginBottom = '20px'
          />
            <Button
                onClick = {addRule}
            >
                Add
            </Button>
          </FormControl>

      <Heading className = 'table-header'>Edit existing Rules</Heading>

      <Table variant = 'simple' colorScheme = 'cyan'>
        <Thead>
          <Tr>
            <Th>id</Th>
            <Th>Divisor</Th>
            <Th>Text</Th>
            <Th>Active</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rules.map((rule) => (
              <Tr key = {rule.id}>
              <Td>{rule.id}</Td>
              <Td>
                <Input
                    value = {rule.divisor}
                    onChange = {(e) => updateLocalRule(rule.id, {divisor: Number(e.target.value)})}
                    onBlur = {() => updateRule(rule.id, rule)}
                />
              </Td>
              <Td>
                <Input
                    value = {rule.text}
                    onChange = {(e) => updateLocalRule(rule.id, {text: e.target.value})}
                    onBlur = {() => updateRule(rule.id, rule)}
                />
              </Td>
              <Td>
                <Switch
                    colorScheme = 'green'
                    isChecked = {rule.isActive}
                    onChange = {(e) => updateRule(rule.id, {...rule, isActive: e.target.checked})}
                />
              </Td>
              <Td>
                <Button onClick = {() => deleteRule(rule.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
    );
};

export default Admin;