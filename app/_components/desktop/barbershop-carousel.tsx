import { Barbershop } from "@prisma/client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import BarbershopItem from "./barbershop-item"

interface BarbershopCarouselProps {
  title: string
  barbershops: Barbershop[]
}

const BarbershopCarousel = ({
  title,
  barbershops,
}: BarbershopCarouselProps) => {
  return (
    <>
      <h2 className="mb-5 text-sm font-bold uppercase text-gray-400">
        {title}
      </h2>
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="gap-3">
              <CarouselItem className="md:basis-full lg:basis-1/2 xl:basis-1/3">
                <BarbershopItem barbershop={barbershop} />
              </CarouselItem>
            </div>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  )
}

export default BarbershopCarousel
