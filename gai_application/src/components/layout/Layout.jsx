export default async function Layout({title="", children, className=""}) {
  return <>
    <div className={`min-h-screen max-w-3xl m-auto pt-24 pb-16 px-3 ${className}`}>
      <div className="w-full">
        <div className="text-xl font-semibold">{title}</div>
        <hr className="my-4" />
        {children}
      </div>
    </div>
  </>
}