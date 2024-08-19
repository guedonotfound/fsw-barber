import Link from "next/link"
import { Button } from "./ui/button"
import { quickSearchOptions } from "../_constants/search"
import Image from "next/image"

const QuickSearch = () => {
  return (
    <div className="mt-1 flex gap-1 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      {quickSearchOptions.map((option) => (
        <Button
          key={option.title}
          variant="secondary"
          className="flex gap-2"
          asChild
        >
          <Link href={`/barbershops?service=${option.title}`}>
            <Image
              alt={option.title}
              src={option.imageUrl}
              width={24}
              height={24}
            />
            {option.title}
          </Link>
        </Button>
      ))}
    </div>
  )
}

export default QuickSearch
