import { Logo } from '~/components/svgs/logo'

function FullPageLogo() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Logo className="h-10 animate-bounce" />
    </div>
  )
}

export default FullPageLogo
