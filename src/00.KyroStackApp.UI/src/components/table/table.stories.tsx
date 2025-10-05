import type { Story } from '@ladle/react';
import {
	Table,
	TableBody,
	TableBodyRow,
	TableCaption,
	TableHead,
	TableHeadRow,
	Td,
	Th
} from './table';

export const Basic: Story = () => {
	return (
		<Table>
			<TableCaption>Table Caption</TableCaption>
			<TableHead>
				<TableHeadRow>
					<Th>Name</Th>
					<Th>Age</Th>
					<Th>Location</Th>
				</TableHeadRow>
			</TableHead>
			<TableBody>
				<TableBodyRow>
					<Td>John Doe</Td>
					<Td>30</Td>
					<Td>New York</Td>
				</TableBodyRow>
				<TableBodyRow>
					<Td>Jane Smith</Td>
					<Td>25</Td>
					<Td>San Francisco</Td>
				</TableBodyRow>
			</TableBody>
		</Table>
	);
};

export const WithContainer: Story = () => {
	return (
		<div>
			<Table.Container>
				<Table>
					<TableHead>
						<TableHeadRow>
							<Th>Name</Th>
							<Th>Age</Th>
							<Th>Location</Th>
						</TableHeadRow>
					</TableHead>
					<TableBody>
						<TableBodyRow>
							<Td>John Doe</Td>
							<Td>30</Td>
							<Td>New York</Td>
						</TableBodyRow>
						<TableBodyRow>
							<Td>Jane Smith</Td>
							<Td>25</Td>
							<Td>San Francisco</Td>
						</TableBodyRow>
					</TableBody>
				</Table>
			</Table.Container>

			<Table.Container className='mt-5 max-w-[300px]'>
				<Table>
					<TableCaption>Table Caption</TableCaption>
					<TableHead>
						<TableHeadRow>
							<Th>Name</Th>
							<Th>Age</Th>
							<Th>Location</Th>
						</TableHeadRow>
					</TableHead>
					<TableBody>
						<TableBodyRow>
							<Td>John Doe</Td>
							<Td>30</Td>
							<Td>New York</Td>
						</TableBodyRow>
						<TableBodyRow>
							<Td>Jane Smith</Td>
							<Td>25</Td>
							<Td className='whitespace-nowrap'>San Francisco</Td>
						</TableBodyRow>
					</TableBody>
				</Table>
			</Table.Container>
		</div>
	);
};

export const Striped: Story = () => {
	return (
		<Table striped>
			<TableHead>
				<TableHeadRow>
					<Th>Name</Th>
					<Th>Age</Th>
					<Th>Location</Th>
				</TableHeadRow>
			</TableHead>
			<TableBody>
				<TableBodyRow>
					<Td>John Doe</Td>
					<Td>30</Td>
					<Td>New York</Td>
				</TableBodyRow>
				<TableBodyRow>
					<Td>Jane Smith</Td>
					<Td>25</Td>
					<Td>San Francisco</Td>
				</TableBodyRow>
			</TableBody>
		</Table>
	);
};

Striped.storyName = 'Props--striped';

export const GridLines: Story = () => {
	return (
		<Table gridLines>
			<TableHead>
				<TableHeadRow>
					<Th>Name</Th>
					<Th>Age</Th>
					<Th>Location</Th>
				</TableHeadRow>
			</TableHead>
			<TableBody>
				<TableBodyRow>
					<Td>John Doe</Td>
					<Td>30</Td>
					<Td>New York</Td>
				</TableBodyRow>
				<TableBodyRow>
					<Td>Jane Smith</Td>
					<Td>25</Td>
					<Td>San Francisco</Td>
				</TableBodyRow>
			</TableBody>
		</Table>
	);
};

GridLines.storyName = 'Props--grid-lines';
