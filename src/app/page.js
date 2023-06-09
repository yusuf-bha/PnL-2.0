
export default function Home() {
  return (
    <>
      <form className="w-full flex justify-center mt-[10%] gap-2.5">
        <input className="border-blue-300 border rounded" type="text" placeholder="Wallet"></input>
        <input className="border-blue-300 border rounded" type="text" placeholder="Token"></input>
        <input className="bg-blue-300 border-2 rounded" type="submit" value="Search"></input>
      </form>
    </>
  )
}
