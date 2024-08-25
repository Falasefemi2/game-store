/* eslint-disable @next/next/no-img-element */
"use client";

import {
    Carousel,
    CarouselMainContainer,
    SliderMainItem,
} from "@/components/ui/Carousel"
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";


type Game = {
    id: number;
    title: string;
    thumbnail: string;
};

type GameBannerProps = {
    gamesbanner: Game[];
};



function GameBanner({ gamesbanner }: GameBannerProps) {
    return (
        <>
            <Carousel
                plugins={[
                    AutoScroll({
                        speed: 1,
                    }),
                ]}
                carouselOptions={{
                    loop: true,
                }}
            >
                <CarouselMainContainer className="h-60 md:h-80 lg:h-96">
                    {gamesbanner.map((game) => (
                        <SliderMainItem key={game.id} className="bg-transparent">
                            <div className="relative w-full h-full flex items-center justify-center rounded-xl overflow-hidden">
                                <Image
                                    src={game.thumbnail}
                                    alt={game.title}
                                    layout="fill"
                                    objectFit="cover"
                                    quality={100}
                                    className="rounded-xl w-full h-full object-cover"
                                />
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-white text-3xl font-bold">{game.title}</h3>
                                </div>
                            </div>
                        </SliderMainItem>
                    ))}
                </CarouselMainContainer>
            </Carousel>

        </>
    )
}

export default GameBanner
