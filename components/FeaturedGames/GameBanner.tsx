/* eslint-disable @next/next/no-img-element */
"use client";

import {
    Carousel,
    CarouselMainContainer,
    SliderMainItem,
} from "@/components/ui/Carousel"
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import { Button } from "../ui/button";



type Game = {
    id: number;
    title: string;
    thumbnail: string;
    description: string;
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
                                {/* Main image */}
                                <Image
                                    src={game.thumbnail}
                                    alt={game.title}
                                    layout="fill"
                                    objectFit="cover"
                                    quality={100}
                                    className="rounded-xl w-full h-full object-cover"
                                />

                                {/* Blurred background */}
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-md"
                                    style={{
                                        backgroundImage: `url(${game.thumbnail})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        filter: 'blur(20px)',
                                        opacity: 0.5,
                                    }}
                                />

                                {/* Content overlay */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black to-transparent">
                                    <h3 className="text-white text-3xl font-bold mb-2 truncate">{game.title}</h3>
                                    <h2 className="text-white text-lg line-clamp-2 mb-4">{game.description}</h2>
                                    <Button className="self-start font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
                                        Buy Now
                                    </Button>
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
