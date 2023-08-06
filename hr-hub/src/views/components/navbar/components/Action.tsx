import { Flex } from '@chakra-ui/react';
import React from 'react';

export default function Action({ children }: { children: React.ReactNode }) {
	return <Flex gap='20px'>{children}</Flex>;
}
