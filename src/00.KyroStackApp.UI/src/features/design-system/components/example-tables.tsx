import {
	Table,
	TableBody,
	TableBodyRow,
	TableCaption,
	TableContainer,
	TableFoot,
	TableHead,
	TableHeadRow,
	Td,
	Th
} from '@/components/table/table';

export function ExampleTables() {
	return (
		<div className='p-4'>
			<TableContainer>
				<Table>
					<TableCaption>Basic Table (striped, grid-lines)</TableCaption>

					<TableHead>
						<TableHeadRow>
							<Th>Name</Th>
							<Th>Date of birth</Th>
							<Th>Email</Th>
							<Th>Role</Th>
						</TableHeadRow>
					</TableHead>

					<TableBody>
						<TableBodyRow>
							<Td>John Doe</Td>
							<Td>1990-01-01</Td>
							<Td>john.doe@example.com</Td>
							<Td>User</Td>
						</TableBodyRow>
						<TableBodyRow>
							<Td>Jane Smith</Td>
							<Td>1985-05-15</Td>
							<Td>jane.smith@example.com</Td>
							<Td>Admin</Td>
						</TableBodyRow>
						<TableBodyRow>
							<Td>Emily Johnson</Td>
							<Td className='whitespace-nowrap'>1992-07-20</Td>
							<Td>emily.johnson@example.com</Td>
							<Td>Moderator</Td>
						</TableBodyRow>
						<TableBodyRow>
							<Td>Michael Brown</Td>
							<Td>1988-11-30</Td>
							<Td>michael.brown@example.com</Td>
							<Td>Guest</Td>
						</TableBodyRow>
					</TableBody>
					<TableFoot>
						<TableBodyRow>
							<Td colSpan={4} className='text-center'>
								Total: 4 users
							</Td>
						</TableBodyRow>
					</TableFoot>
				</Table>
			</TableContainer>
		</div>
	);
}
