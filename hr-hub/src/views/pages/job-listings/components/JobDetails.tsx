import { Box, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { COLORS } from '../../../../config/const';
import { JobDetailsTab } from './tabs';

export default function JobDetails() {
	return (
		<Box>
			<Tabs position='relative' variant='unstyled'>
				<TabList>
					<Tab>Job Details</Tab>
					<Tab>KYC Details</Tab>
				</TabList>
				<TabIndicator mt='-1.5px' height='2px' bg={COLORS.SECONDARY} borderRadius='1px' />
				<Box mt='-1.5px' height='2px' bg='gray.200' borderRadius='1px' width='104%' mx='-2%' />

				<TabPanels>
					<TabPanel>
						<JobDetailsTab />
					</TabPanel>
					<TabPanel>{/* <KYCDetailsTab /> */}</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
}
