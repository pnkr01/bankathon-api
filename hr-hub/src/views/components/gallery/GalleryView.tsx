import { Box } from '@chakra-ui/react';
import React from 'react';

type Props = {
	data: string[];
};

export default function GalleryView({ data }: Props) {
	console.log(data);

	return (
		<Box>
			<h1>Gallery View</h1>
		</Box>
	);
}
