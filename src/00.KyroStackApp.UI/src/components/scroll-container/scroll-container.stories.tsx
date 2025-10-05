import type { Story } from '@ladle/react';
import { ScrollContainer } from './scroll-container';

export const Basic: Story = () => {
	return (
		<div>
			<ScrollContainer axis='y' className='max-h-[10rem]'>
				Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus
				ex sapien vitae pellentesque sem placerat. In id cursus mi pretium
				tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
				Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis
				massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper
				vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra
				inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing
				elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
				cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
				urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
				egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
				hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
				per conubia nostra inceptos himenaeos.
			</ScrollContainer>
			<ScrollContainer axis='x' className='mt-5 max-w-[50ch] whitespace-nowrap'>
				Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus
				ex sapien vitae pellentesque sem placerat. In id cursus mi pretium
				tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
				Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis
				massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper
				vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra
				inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing
				elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
				cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
				urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
				egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
				hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
				per conubia nostra inceptos himenaeos.
			</ScrollContainer>
		</div>
	);
};
