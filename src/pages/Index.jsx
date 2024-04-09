import React, { useState } from "react";
import { Box, Heading, Text, VStack, Textarea, Button, useToast, Image } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const examples = ["Explain quantum computing in simple terms", "Got any creative ideas for a 10 year old's birthday?", "How do I make an HTTP request in Javascript?"];

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputText }),
    });
    const data = await response.json();
    setOutputText(data.output);
    setLoading(false);
  };

  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <VStack spacing={8} align="stretch" maxW="2xl" mx="auto">
        <Heading as="h1" size="2xl" textAlign="center">
          GPTEngineer
        </Heading>
        <Text fontSize="xl" textAlign="center">
          Your AI assistant for coding and beyond
        </Text>
        <Box>
          <Textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Ask me anything..." size="lg" />
          <Button mt={4} colorScheme="blue" size="lg" rightIcon={<FaPaperPlane />} loadingText="Generating..." onClick={handleSubmit} isLoading={loading}>
            Generate response
          </Button>
        </Box>
        {outputText && (
          <Box bg="white" p={4} rounded="md" shadow="md">
            <Text>{outputText}</Text>
          </Box>
        )}
        <VStack spacing={2} pt={8} align="start">
          <Heading size="lg">GPTEngineer can help with:</Heading>
          {examples.map((example, index) => (
            <Text key={index} cursor="pointer" onClick={() => setInputText(example)}>
              "{example}"
            </Text>
          ))}
        </VStack>
        <Image src="https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwcm9ib3R8ZW58MHx8fHwxNzEyNjQ5MTc1fDA&ixlib=rb-4.0.3&q=80&w=1080" />
      </VStack>
    </Box>
  );
};

export default Index;
