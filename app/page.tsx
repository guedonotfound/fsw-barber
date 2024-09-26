import DesktopHomePage from "./desktop/page"
import MobileHomePage from "./mobile/page "

const Page = async () => {
  return (
    <div>
      <div className="block 2md:hidden">
        <MobileHomePage />
      </div>
      <div className="hidden 2md:block">
        <DesktopHomePage />
      </div>
    </div>
  )
}

export default Page
