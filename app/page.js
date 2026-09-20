/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col items-center h-[50vh] gap-5">
        <div className="font-bold flex gap-2 items-center text-5xl text-[#44210d]">Buy Me A Coffee<span><img src="/hot-coffee.gif" alt="" className="w-20" /></span></div>
        <p className="text-lg">
        GetMeACoffee connects coffee lovers with the baristas and shops that make their mornings better — one cup, one tip, one thank-you at a time.
        </p>
        <div className="flex gap-2">
          <button className="text-[#44210d] text-lg bg-[#b5907b] p-2 rounded-2xl hover:bg-[#9e7761] hover:cursor-pointer">
            Support →
          </button>
          <button className="text-[#44210d] text-lg  p-2 rounded-2xl hover:underline hover:cursor-pointer">
            Read More!!
          </button>
        </div>
      </div>
      <div className="bg-[#bea6a0] h-1 opacity-50"></div>
      <div className="p-10 container mx-auto py-16">
        <h1 className="text-2xl font-bold text-center my-2 mb-10">Fuel the Hands Behind Your Favorite Cup</h1>
        <div className="flex gap-5 justify-around">
          <div className=" flex flex-col item space-y-3 items-center justify-center" >
            <Image className="item p-2 m-2 bg-[#bea6a0] rounded-full" src="/original-07b777e02c236203e56930a3a58faf9f-ezgif.com-remove-background.gif" alt="" width={150} height={150} />
            <p className="font-bold">Fund Your Favorite Spot</p>
            <p className="text-sm ">Support the shops you love and help them grow.</p>
          </div>
          <div className=" flex flex-col item space-y-3 items-center" >
            <Image className="item p-2 m-2 bg-[#bea6a0] rounded-full" src="/03-30-33-674_512.gif" alt="" width={120} height={120} />
            <p className="font-bold">Every Cent Counts</p>
            <p className="text-sm ">Every coin adds up to real support.</p>
            
          </div>
          <div className=" flex flex-col item space-y-3 items-center" >
            <img className="item p-2 m-2 bg-[#bea6a0] rounded-full" src="/476761.png" alt="" width={120} />
            <p className="font-bold">A Community That&apos;s Got Your Back</p>
            <p className="text-sm ">A community ready to back your passion.</p>         
          </div>
        </div>
      </div>

      <div className="bg-[#bea6a0] h-1 opacity-50"></div>

      <div className="p-10 container mx-auto py-16 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center my-2 mb-10">Learn More About Us</h1>
        <iframe width="570" height="329" className="rounded-2xl" src="https://www.youtube.com/embed/UTf8FtmdfW4" title="Is Patreon Worth It For Creators?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </>
  );
}
