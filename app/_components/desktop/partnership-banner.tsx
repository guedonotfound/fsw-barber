import Image from "next/image"

const PartnershipBanner = () => {
  return (
    <>
      <div className="flex items-center justify-between py-5">
        <p className="text-sm">Em parceria com</p>
        <div className="relative h-[22px] w-[37.58%]">
          <Image
            src="/logo.png"
            alt="FSW Barber"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </>
  )
}

export default PartnershipBanner
