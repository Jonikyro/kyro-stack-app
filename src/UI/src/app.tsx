import { Button } from '@/components/button/button';
import { Calendar } from '@/components/calendar/calendar';
import * as DropdownMenu from '@/components/dropdown-menu/dropdown-menu';
import { Test } from '@/components/form/test';
import { Icon } from '@/components/icon';
import * as Popover from '@/components/popover/popover';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableContainer,
	TableHead,
	TableHeader,
	TableRow,
	TableScrollContainer,
	TableWrapper
} from '@/components/table/table-ui';
import { Title } from '@/components/title/title';
import { hoi, registerUser } from '@/data/kissa-api';
import { Header } from '@/layout/header/header';
import { Main } from '@/layout/main/main';
import { ScrollToHash } from '@/utils/scroll-to-hash';
import { getLocalTimeZone, today } from '@internationalized/date';
import { Link, Outlet, Route, Routes } from 'react-router-dom';

function Home() {
	//useProfile();

	return (
		<div>
			<pre>{JSON.stringify({})}</pre>
			<Outlet />
		</div>
	);
}

function App() {
	//useSuspenseProfile();

	return (
		<>
			<Header />
			<ScrollToHash />
			<Main>
				<h1>Tervetuloa sovellukseen</h1>
				<div className='ml-32 flex flex-col items-center gap-10'>
					<Link to='#table'>Go to table</Link>
					<Link to='#calendar'>Go to calendar</Link>

					<div className='flex'>
						<Box className='bg-primary'>bg-primary</Box>
						<Box className='bg-primary-container'>bg-primary-container</Box>
					</div>
					<div className='flex'>
						<Box className='bg-surface-bright'>bg-surface-bright</Box>
						<Box className='bg-surface'>bg-surface</Box>
						<Box className='bg-surface-dim'>bg-surface-dim</Box>
					</div>

					<div className='flex'>
						<Box className='bg-surface-container-lowest'>
							bg-surface-container-lowest
						</Box>
						<Box className='bg-surface-container-low'>
							bg-surface-container-low
						</Box>

						<Box className='bg-surface-container'>bg-surface-container</Box>
						<Box className='bg-surface-container-high'>
							bg-surface-container-high
						</Box>
						<Box className='bg-surface-container-highest '>
							bg-surface-container-highest
						</Box>
					</div>
					<Test />

					<br />
					<section className='flex gap-2'>
						<Button variant='primary'>Primary</Button>
						<Button startIcon='gear' endIcon='chevron-right'>
							Default
						</Button>
						<Button variant='destructive'>Destructive</Button>
					</section>
					<br />

					<section>
						<Calendar id='calendar' maxValue={today(getLocalTimeZone())} />
					</section>

					<section className='max-w-full'>
						<TableWrapper>
							<div
								role='presentation'
								className='absolute inset-0 rotate-[-3deg] scale-x-[1.02] rounded-lg bg-primary-container blur-sm'
							></div>
							<div
								role='presentation'
								className='absolute inset-0 rotate-[3deg] scale-x-[1.02] rounded-lg bg-primary-container blur-sm'
							></div>
							<div
								role='presentation'
								className='absolute inset-0 scale-x-[1.01] rounded-lg bg-primary blur-sm'
							></div>
							<TableContainer>
								<TableScrollContainer>
									<Table>
										<TableCaption>
											<Title id='table' as='span' linkable>
												A list of your recent invoices.
											</Title>
										</TableCaption>
										<TableHeader>
											<TableRow>
												<TableHead className='w-[100px]'>Invoice</TableHead>
												<TableHead>Description</TableHead>
												<TableHead>
													<Button variant='unstyled'>
														<span>Status</span>
														<Icon icon='caret-sort' size='font' />
													</Button>
												</TableHead>
												<TableHead>
													<Button variant='unstyled'>
														<span>Method</span>
														<Icon icon='chevron-down' size='font' />
													</Button>
												</TableHead>
												<TableHead className='text-right'>Amount</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											<TableRow>
												<TableCell className='font-medium'>INV001</TableCell>
												<TableCell className='whitespace-nowrap'>
													Try to calculate the EXE feed, maybe it will index the
													multi-byte pixel!
												</TableCell>
												<TableCell>Paid</TableCell>
												<TableCell>Credit Card</TableCell>
												<TableCell>$250.00</TableCell>
												<TableCell className='py-0 text-right'>
													<Button variant='unstyled' className='p-2'>
														<Icon icon='dots-horizontal' />
													</Button>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell className='font-medium'>INV002</TableCell>
												<TableCell>
													Try to calculate the EXE feed, maybe it will index the
													multi-byte pixel!
												</TableCell>
												<TableCell>Unpaid</TableCell>
												<TableCell>Master Card</TableCell>
												<TableCell>$1200.00</TableCell>
												<TableCell className='py-0 text-right'>
													<Popover.Root>
														<Popover.Trigger variant='unstyled' className='p-3'>
															<Icon icon='dots-horizontal' />
														</Popover.Trigger>
														<Popover.Content>
															<Calendar maxValue={today(getLocalTimeZone())} />
														</Popover.Content>
													</Popover.Root>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell className='font-medium'>INV003</TableCell>
												<TableCell>
													Try to calculate the EXE feed, maybe it will index the
													multi-byte pixel!
												</TableCell>
												<TableCell>Pending</TableCell>
												<TableCell>Paypal</TableCell>
												<TableCell>$96.00</TableCell>
												<TableCell className='py-0 text-right'>
													<DropdownMenu.Root>
														<DropdownMenu.Trigger
															variant='unstyled'
															className='p-3'
															startIcon='dots-horizontal'
														/>
														<DropdownMenu.Content align='end'>
															<DropdownMenu.Label>
																Primary stuff
															</DropdownMenu.Label>
															<DropdownMenu.Item
																onSelect={() => alert('item 1')}
															>
																Item 1
															</DropdownMenu.Item>
															<DropdownMenu.Sub>
																<DropdownMenu.SubTrigger>
																	Item 2
																</DropdownMenu.SubTrigger>
																<DropdownMenu.SubContent>
																	<DropdownMenu.Item>
																		Item 2.1
																	</DropdownMenu.Item>
																	<DropdownMenu.Item>
																		Item 2.2
																	</DropdownMenu.Item>
																</DropdownMenu.SubContent>
															</DropdownMenu.Sub>
															<DropdownMenu.Item>Item 3</DropdownMenu.Item>
															<DropdownMenu.Item>Item 4</DropdownMenu.Item>

															<DropdownMenu.Separator />

															<DropdownMenu.Label>
																Some other stuff
															</DropdownMenu.Label>
															<DropdownMenu.Item>Item 5</DropdownMenu.Item>
															<DropdownMenu.Item>Item 6</DropdownMenu.Item>
															<DropdownMenu.Item>Item 7</DropdownMenu.Item>
														</DropdownMenu.Content>
													</DropdownMenu.Root>
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableScrollContainer>
							</TableContainer>
						</TableWrapper>
					</section>
				</div>
				<br />
				<Title as='h1'>Hello world!!!!!!!!!!!!!!!!!!!!</Title>
				<button className='text-muted' onClick={registerUser}>
					Register
				</button>
				<button onClick={hoi}>hoi</button>
				<Icon icon='arrow' />
				<Routes>
					<Route index element={<Link to='home'>Go to home</Link>} />
					<Route path='home' element={<Home />}>
						<Route
							path='messages'
							element={<Link to='../tasks'>Messages -- Go to tasks</Link>}
						/>
						<Route
							path='tasks'
							element={<Link to='/home'>Tasks -- Go to home</Link>}
						/>
					</Route>
					<Route path='about' element={<div>About</div>} />
				</Routes>
			</Main>
		</>
	);
}

function Box({
	className,
	children
}: {
	className?: string;
	children?: React.ReactNode;
}) {
	return (
		<div
			className={`grid aspect-square h-32 place-content-center p-4 text-center ${className}`}
		>
			{children}
		</div>
	);
}

export default App;
