import { Badge } from '@/components/badge/badge';
import { ScrollContainer } from '@/components/scroll-container/scroll-container';
import {
	Table,
	TableBody,
	TableBodyRow,
	TableCaption,
	TableFoot,
	TableHead,
	TableHeadRow,
	Td,
	Th
} from '@/components/table/table';

export function ExampleTables() {
	return (
		<div className='flex flex-col gap-2 p-4'>
			<div>
				<ExampleTable caption='Basic Table' />
			</div>

			<div className='w-[40ch]'>
				<ExampleTable
					caption='Basic Table (striped, grid-lines)'
					striped
					gridLines
				/>
			</div>
		</div>
	);
}

interface ExampleTableProps {
	caption?: string;
	gridLines?: boolean;
	striped?: boolean;
}

function ExampleTable({ caption, gridLines, striped }: ExampleTableProps) {
	return (
		<Table.Container>
			<ScrollContainer axis='x'>
				<Table striped={striped} gridLines={gridLines}>
					<TableCaption>{caption}</TableCaption>

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
							<Td className='whitespace-nowrap'>John Doe</Td>
							<Td className='whitespace-nowrap'>1990-01-01</Td>
							<Td className='whitespace-nowrap'>john.doe@example.com</Td>
							<Td className='whitespace-nowrap'>
								<div className='flex gap-1'>
									<Badge color='green'>User</Badge>
								</div>
							</Td>
						</TableBodyRow>
						<TableBodyRow>
							<Td className='whitespace-nowrap'>Jane Smith</Td>
							<Td className='whitespace-nowrap'>1985-05-15</Td>
							<Td className='whitespace-nowrap'>jane.smith@example.com</Td>
							<Td className='whitespace-nowrap'>
								<div className='flex gap-1'>
									<Badge color='yellow'>Admin</Badge>
								</div>
							</Td>
						</TableBodyRow>
						<TableBodyRow>
							<Td className='whitespace-nowrap'>Emily Johnson</Td>
							<Td className='whitespace-nowrap'>1992-07-20</Td>
							<Td className='whitespace-nowrap'>emily.johnson@example.com</Td>
							<Td className='whitespace-nowrap'>
								<div className='flex gap-1'>
									<Badge color='blue'>Moderator</Badge>
								</div>
							</Td>
						</TableBodyRow>
						<TableBodyRow>
							<Td className='whitespace-nowrap'>Michael Brown</Td>
							<Td className='whitespace-nowrap'>1988-11-30</Td>
							<Td className='whitespace-nowrap'>michael.brown@example.com</Td>
							<Td className='whitespace-nowrap'>
								<div className='flex gap-1'>
									<Badge color='red'>Guest</Badge>
								</div>
							</Td>
						</TableBodyRow>
					</TableBody>
					<TableFoot>
						<TableBodyRow>
							<Td colSpan={4} className='px-0 text-center'>
								<div className='sticky left-0 w-[100cqw]'>Total: 4 users</div>
							</Td>
						</TableBodyRow>
					</TableFoot>
				</Table>
			</ScrollContainer>
		</Table.Container>
	);
}
