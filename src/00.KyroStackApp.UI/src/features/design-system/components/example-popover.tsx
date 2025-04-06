import { Calendar } from '@/components/calendar/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/popover/popover';

export function ExamplePopover() {
	return (
		<Popover>
			<PopoverTrigger>Open popover</PopoverTrigger>

			<PopoverContent anchor='top'>
				<Calendar />
			</PopoverContent>
		</Popover>
	);
}
