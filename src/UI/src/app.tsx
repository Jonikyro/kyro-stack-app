import { Button } from '@/components/button/button';
import { Calendar } from '@/components/calendar/calendar';
import { Test } from '@/components/form/test';
import { Icon } from '@/components/icon';
import { Example } from '@/components/popover/test';
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
	//useProfile();

	// if (isLoading) return <h1>Tarkistetaan, että olethan autentikoitunut...</h1>

	return (
		<>
			<Header />

			<Main>
				<h1>Tervetuloa sovellukseen</h1>
				<div className='flex flex-col ml-32 gap-10 items-center'>
					<a href='#invoices'>Kissa</a>
					<a href='#kil'>Kissa</a>
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
						<Box className='bg-surface-container-highest'>
							bg-surface-container-highest
						</Box>
					</div>
					<Test />

					<br />
					<section className='flex gap-2'>
						<Button variant='primary'>Primary</Button>
						<Button icon='gear'>Default</Button>
						<Button variant='destructive'>Destructive</Button>
					</section>
					<br />

					<section>
						<Calendar maxValue={today(getLocalTimeZone())} />
					</section>

					<section className='max-w-full'>
						<TableWrapper>
							<div
								role='presentation'
								className='blur-sm absolute inset-0 rotate-[-3deg] scale-x-[1.02] rounded-lg bg-primary-container'
							></div>
							<div
								role='presentation'
								className='blur-sm absolute inset-0 rotate-[3deg] rounded-lg scale-x-[1.02] bg-primary-container'
							></div>
							<div
								role='presentation'
								className='blur-sm absolute inset-0 rounded-lg scale-x-[1.01] bg-primary'
							></div>
							<TableContainer>
								<TableScrollContainer>
									<Table>
										<TableCaption>
											<Title id='invoices' as='span' linkable>
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
												<TableCell className='text-right py-0'>
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
												<TableCell className='text-right py-0'>
													<Button variant='unstyled' className='p-2'>
														<Icon icon='dots-horizontal' />
													</Button>
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
												<TableCell className='text-right py-0'>
													<Example />
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
				<Box className='bg-primary'>bg-primary</Box>
				<Box className='bg-primary-container'>bg-primary-container</Box>
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
			className={`aspect-square h-32 grid place-content-center text-center p-4 ${className}`}
		>
			{children}
		</div>
	);
}

export default App;
