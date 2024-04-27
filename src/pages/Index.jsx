// Complete the Index page component here
// Use chakra-ui
import { Box, Input, VStack, Button, List, ListItem, Text } from '@chakra-ui/react';
import { FaPlus } from "react-icons/fa"; // example - use react-icons/fa for icons
import { getClient } from "lib/supabase";

import { useState, useEffect } from "react";

const Index = () => {
  const client = getClient('testproject');
  const key = 'testkey';

  // state mgmt
  const [objects, setObjects] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [domains, setDomains] = useState([]);
  const [newDomain, setNewDomain] = useState('');
  
  const handleAddDomain = async () => {
    const { error } = await client.from('domains').insert([{ name: newDomain }]);
    if (error) {
      console.error('Error adding domain:', error);
    } else {
      setDomains([...domains, newDomain]);
      setNewDomain('');
    }
  };

  // effect
  useEffect(() => {
    // fetch data
    const fetchData = async () => {
      const { data, error } = await client.from('domains').select('*');
      if (error) {
        console.error("error", error);
      } else {
        console.log("data", data);
      }
      setDomains(data);
    };  
    fetchData();
  }, []);

  // TODO: Create the website here!
  return (
    <VStack spacing={4}>
      <Input
        placeholder="Add new domain"
        value={newDomain}
        onChange={(e) => setNewDomain(e.target.value)}
      />
      <Button onClick={handleAddDomain} leftIcon={<FaPlus />}>
        Add Domain
      </Button>
      <List spacing={3}>
        {domains.map((domain, index) => (
          <ListItem key={index}>
            <Text>{domain}</Text>
          </ListItem>
        ))}
      </List>
    </VStack>
  ); // example
};

export default Index;
