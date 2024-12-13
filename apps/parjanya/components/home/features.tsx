'use client';

import React from 'react';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';

import { ImagePlaceholder, Carousel, CarouselContent, CarouselItem } from '@suras/ui';

const data = [
	{
		id: 0,
		img: '/images/feature-1.png',
		heading: 'Upcoming Vaccinations',
		subHeading: "Safeguarding every Pet's Well-being with Timely Vaccinations",
	},
	{
		id: 1,
		img: '/images/feature-2.png',
		heading: 'Upcoming Appointments',
		subHeading: 'Seamlessly Organizing Your Schedule for Hassle-free Clinic Visits.',
	},
];

export const Features = () => {
	return (
		<div id="features" className="px-16 container relative overflow-hidden py-54">
			<h2 className="text-[36px] leading-[44px] font-medium text-center my-24">
				Bring Your clinic to one Mobile App
			</h2>
			<Carousel
				plugins={[
					Autoplay({
						delay: 3000,
					}),
				]}
			>
				<CarouselContent>
					{data?.map((feature) => {
						return (
							<CarouselItem key={feature.id}>
								<div className="grid lg:grid-cols-2 gap-54">
									<ImagePlaceholder
										containerClasses="w-full h-[280px] lg:h-[480px] col-span-1"
										src={feature.img}
										imageClasses="object-contain"
									/>
									<div className="col-span-1 flex flex-col justify-center">
										<h4 className="font-medium text-24 leading-[44px] text-center lg:text-left">
											{feature.heading}
										</h4>
										<p className="text-16 leading-20 mt-12 text-center lg:text-left">
											{feature.subHeading}
										</p>
										<div className="flex gap-12 lg:gap-30 mt-24">
											<Link
												href="https://play.google.com/store/apps/details?id=com.pemilyy.android"
												className="grid grid-cols-3 justify-items-center items-center max-w-[220px] w-full lg:w-[220px] bg-black-bg2 h-[65px] lg:h-[78px] px-20 py-12 border border-white rounded-[12px]"
												target="_blank"
											>
												<ImagePlaceholder
													containerClasses="h-[24px] w-[24px] lg:h-[32px] lg:w-[32px] col-span-1"
													src="/icons/play-store.svg"
													imageClasses="object-contain"
												/>
												<p className="col-span-2 text-white">
													<span className="block text-12 leading-15">
														Get it on
													</span>
													<span className="text-16 lg:text-20 lg:leading-25">
														Google Play
													</span>
												</p>
											</Link>
											<Link
												href="https://apps.apple.com/us/app/pemilyy/id6474898482"
												className="grid grid-cols-3 max-w-[220px] justify-items-center items-center w-full lg:w-[220px] bg-black-bg2 h-[65px] lg:h-[78px] px-20 py-12 border border-white rounded-[12px]"
												target="_blank"
											>
												<ImagePlaceholder
													containerClasses="h-[24px] w-[24px] lg:h-[32px] lg:w-[32px] col-span-1"
													src="/icons/app-store.svg"
													imageClasses="object-contain"
												/>
												<p className="col-span-2 text-white">
													<span className="block text-12 leading-15">
														Get it on
													</span>
													<span className="text-16 lg:text-20 lg:leading-25">
														App Store
													</span>
												</p>
											</Link>
										</div>
									</div>
								</div>
							</CarouselItem>
						);
					})}
				</CarouselContent>
			</Carousel>
		</div>
	);
};

export default Features;
